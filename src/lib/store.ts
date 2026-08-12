// In-memory mutable store over the mock dataset.
// Pages call useRevision() to re-render after any action.
import { useSyncExternalStore } from "react";
import {
  submissions, products, orders, refunds, vendors,
  type Condition, type Category, type Order,
} from "./mock";

let revision = 0;
const listeners = new Set<() => void>();

function bump() {
  revision += 1;
  listeners.forEach(l => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

const getSnapshot = () => revision;

/** Subscribe a component to every store mutation. */
export function useRevision() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

const now = () => new Date().toISOString();
const log = (o: Order, label: string) => o.history.push({ ts: now(), actor: "Admin", label });

// ── Submissions ──────────────────────────────────────────────────────────
export function acceptSubmission(id: string) {
  const s = submissions.find(x => x.id === id);
  if (s) { s.status = "Accepté"; bump(); }
}

export function refuseSubmission(id: string, _reasons: string[]) {
  const s = submissions.find(x => x.id === id);
  if (s) { s.status = "Refusé"; bump(); }
}

// ── Catalogue ────────────────────────────────────────────────────────────
export function publishProduct(input: {
  submissionId: string; title: string; description: string; category: Category;
  condition: Condition; publicPrice: number; photos: string[]; vendorId: string;
  urgent: boolean; urgentUntil?: string; certified: boolean;
}) {
  const id = `P${String(products.length + 1).padStart(3, "0")}`;
  products.unshift({
    id,
    submissionId: input.submissionId,
    title: input.title,
    category: input.category,
    condition: input.condition,
    publicPrice: input.publicPrice,
    description: input.description,
    vendorId: input.vendorId,
    photos: input.photos,
    publishedAt: now(),
    status: "Publié",
    urgent: input.urgent,
    urgentUntil: input.urgentUntil,
    certified: input.certified,
    lastPingAt: now(),
    pingResponse: "OUI",
    daysWithoutResponse: 0,
  });
  acceptSubmission(input.submissionId);
  bump();
  return id;
}

export function updateProduct(id: string, patch: Partial<(typeof products)[number]>) {
  const p = products.find(x => x.id === id);
  if (p) { Object.assign(p, patch); bump(); }
}

export function toggleProductVisibility(id: string) {
  const p = products.find(x => x.id === id);
  if (!p || p.status === "Vendu") return;
  p.status = p.status === "Publié" ? "Masqué" : "Publié";
  if (p.status === "Publié") p.daysWithoutResponse = 0;
  bump();
}

export function removeProduct(id: string) {
  const i = products.findIndex(x => x.id === id);
  if (i >= 0) { products.splice(i, 1); bump(); }
}

export function sendPing(id: string) {
  const p = products.find(x => x.id === id);
  if (p) { p.lastPingAt = now(); p.pingResponse = "En attente"; p.daysWithoutResponse = 0; bump(); }
}

export function extendUrgency(id: string, hours = 48) {
  const p = products.find(x => x.id === id);
  if (p) { p.urgentUntil = new Date(Date.now() + hours * 3600_000).toISOString(); p.urgent = true; bump(); }
}

export function clearUrgency(id: string) {
  const p = products.find(x => x.id === id);
  if (p) { p.urgent = false; p.urgentUntil = undefined; bump(); }
}

// ── Orders ───────────────────────────────────────────────────────────────
const STEP_STATUS: Record<number, Order["status"]> = {
  1: "Nouvelle",
  2: "En préparation",
  3: "En livraison",
  4: "En attente confirmation",
  5: "Terminée",
  6: "Terminée",
};

export function setOrderStep(id: string, step: number, label: string) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  o.status = STEP_STATUS[step] ?? o.status;
  if (step >= 5 && !o.receivedConfirmedAt) o.receivedConfirmedAt = now();
  if (step === 4 && !o.autoValidateAt) o.autoValidateAt = new Date(Date.now() + 24 * 3600_000).toISOString();
  log(o, label);
  bump();
}

export function releasePayment(id: string, txn: string) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  o.paymentReleasedAt = now();
  o.status = "Terminée";
  log(o, `Paiement vendeur libéré · réf. ${txn}`);
  const p = products.find(x => x.id === o.productId);
  if (p) p.status = "Vendu";
  bump();
}

export function addOrderNote(id: string, note: string) {
  const o = orders.find(x => x.id === id);
  if (o && note.trim()) { log(o, `Note interne : ${note.trim()}`); bump(); }
}

export function cancelOrder(id: string) {
  const o = orders.find(x => x.id === id);
  if (o) { o.status = "Annulée"; log(o, "Commande annulée"); bump(); }
}

// ── Refunds ──────────────────────────────────────────────────────────────
export function triggerRefund(id: string) {
  const r = refunds.find(x => x.id === id);
  if (!r) return;
  r.status = "En cours";
  r.triggeredAt = now();
  const o = orders.find(x => x.id === r.orderId);
  if (o) { o.status = "Annulée"; log(o, "Remboursement déclenché"); }
  bump();
}

export function confirmRefundPaid(id: string, _txn: string) {
  const r = refunds.find(x => x.id === id);
  if (!r) return;
  r.status = "Remboursée";
  r.paidAt = now();
  r.confirmedAt = now();
  bump();
}

// ── Vendors ──────────────────────────────────────────────────────────────
export function setVendorStatus(id: string, status: (typeof vendors)[number]["status"]) {
  const v = vendors.find(x => x.id === id);
  if (!v) return;
  v.status = status;
  if (status === "Bloqué") {
    products.forEach(p => { if (p.vendorId === id && p.status === "Publié") p.status = "Masqué"; });
  }
  bump();
}

export function addVendorNote(id: string, note: string) {
  const v = vendors.find(x => x.id === id);
  if (v && note.trim()) { v.note = note.trim(); bump(); }
}

export const activeListingsOf = (vendorId: string) =>
  products.filter(p => p.vendorId === vendorId && p.status === "Publié").length;
