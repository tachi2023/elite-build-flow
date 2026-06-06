import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, StatusBadge, CountdownTimer } from "@/components/admin/ui";
import { findOrder, findProduct, findVendor } from "@/lib/mock";
import { fcfa, dateTime, breakdown } from "@/lib/format";
import { Banknote, Check, MessageCircle, MapPin, Clock, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/orders/$id")({
  head: () => ({ meta: [{ title: "Commande · VraiDeal Admin" }] }),
  component: OrderDetail,
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Commande introuvable.</div>,
});

const STEPS = ["Commande reçue", "En préparation", "En livraison / Retrait", "Livré", "Réception confirmée", "Paiement libéré"];

function OrderDetail() {
  const { id } = Route.useParams();
  const order = findOrder(id);
  const product = order ? findProduct(order.productId) : undefined;
  const vendor = product ? findVendor(product.vendorId) : undefined;
  const [step, setStep] = useState(() => {
    if (!order) return 0;
    if (order.paymentReleasedAt) return 6;
    if (order.receivedConfirmedAt) return 5;
    if (order.status === "Terminée") return 5;
    if (order.status === "En attente confirmation") return 4;
    if (order.status === "En livraison") return 3;
    if (order.status === "En préparation") return 2;
    return 1;
  });
  const [payOpen, setPayOpen] = useState(false);
  const [txn, setTxn] = useState("");
  const [note, setNote] = useState("");

  if (!order || !product) return null;
  const br = breakdown(product.publicPrice, product.category);
  const canRelease = step >= 5;

  return (
    <div>
      <PageHeader
        title={<>Commande <span className="font-mono">{order.id}</span></>}
        breadcrumb={<><Link to="/orders" className="hover:text-foreground">Commandes</Link> · {order.id}</>}
        actions={<StatusBadge status={order.status} />}
      />

      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left */}
        <div className="space-y-5 min-w-0">
          <Card title="Produit">
            <div className="flex gap-3">
              <img src={product.photos[0]} alt="" className="h-20 w-20 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{product.title}</div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">{product.category} · {product.condition}</div>
                <div className="mt-2 font-mono text-base font-semibold text-primary">{fcfa(product.publicPrice)}</div>
              </div>
            </div>
          </Card>

          <Card title="Acheteur">
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">Prénom</dt><dd>{order.buyerFirstName}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">WhatsApp</dt><dd><a href={`https://wa.me/${order.buyerWhatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-teal hover:underline font-mono inline-flex items-center gap-1"><MessageCircle size={12} />{order.buyerWhatsapp}</a></dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Mode</dt>
                <dd className="inline-flex items-center gap-1.5"><MapPin size={12} className="text-muted-foreground" />{order.delivery}</dd></div>
              {order.address && <div><dt className="text-muted-foreground">Adresse</dt><dd className="mt-1">{order.address}</dd></div>}
            </dl>
          </Card>

          <Card title="Paiement">
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">Montant</dt><dd className="font-mono font-semibold">{fcfa(order.amount)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Méthode</dt><dd>{order.payment.method}{order.payment.operator ? ` · ${order.payment.operator}` : ""}</dd></div>
              {order.payment.txn && <div className="flex justify-between"><dt className="text-muted-foreground">Référence</dt><dd className="font-mono text-[11px]">{order.payment.txn}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd className="font-mono text-[11px]">{dateTime(order.createdAt)}</dd></div>
            </dl>
            <div className="mt-3 rounded-md border border-white/5 surface-2 p-3 text-xs space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Commission VraiDeal</span><span className="font-mono text-blue">{fcfa(br.commission)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Reverser vendeur</span><span className="font-mono text-teal">{fcfa(br.sellerAmount)}</span></div>
            </div>
          </Card>

          <Card title="Notes internes">
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Note opérationnelle…"
              className="w-full rounded surface-2 border border-white/5 p-2.5 text-xs outline-none focus:border-primary/40" />
            <button onClick={() => { setNote(""); toast.success("Note ajoutée au log."); }} className="mt-2 h-8 rounded-md border border-white/10 px-3 text-[11px] hover:border-primary/40">Enregistrer</button>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-5 min-w-0">
          <Card title="Flux de traitement">
            <ol className="space-y-2">
              {STEPS.map((label, i) => {
                const stepNum = i + 1;
                const done = step >= stepNum;
                const current = step === stepNum - 1 || step === stepNum;
                return (
                  <li key={label} className={`rounded-md border p-3 ${done ? "border-teal/30 bg-teal/[0.04]" : current ? "border-primary/30 bg-primary/[0.04]" : "border-white/10 surface-2"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-mono ${done ? "bg-teal text-[#0F1117]" : "bg-white/5 text-muted-foreground"}`}>
                          {done ? <Check size={12} strokeWidth={2} /> : stepNum}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-medium">{label}</div>
                          {done && <div className="font-mono text-[10px] text-muted-foreground">{dateTime(new Date(Date.now() - (STEPS.length - i) * 3600_000))}</div>}
                        </div>
                      </div>
                      {!done && stepNum < 6 && (
                        <button onClick={() => setStep(stepNum)} className="shrink-0 h-7 rounded-md border border-white/10 px-2.5 text-[11px] hover:border-primary/50 hover:text-primary">Avancer →</button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            {order.autoValidateAt && step === 4 && (
              <div className="mt-3 flex items-center gap-2 rounded-md border border-orange/30 bg-orange/[0.05] px-3 py-2 text-xs">
                <Clock size={14} className="text-orange" />
                <span>Validation automatique dans <CountdownTimer until={order.autoValidateAt} className="text-xs" /></span>
              </div>
            )}
          </Card>

          <button
            onClick={() => setPayOpen(true)} disabled={!canRelease}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-teal text-sm font-medium text-[#0F1117] disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            <Banknote size={18} strokeWidth={1.5} /> Libérer le paiement au vendeur ({fcfa(br.sellerAmount)})
          </button>
          {!canRelease && <p className="text-center text-[11px] text-muted-foreground">Disponible une fois la réception confirmée.</p>}

          <Card title="Historique des actions">
            <ol className="space-y-2 relative pl-5 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-px before:bg-white/10">
              {order.history.map((h, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-3.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="font-mono text-[10px] text-muted-foreground">{dateTime(h.ts)} · {h.actor}</div>
                  <div className="text-xs">{h.label}</div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>

      {/* Payment modal */}
      {payOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" onClick={() => setPayOpen(false)}>
          <div className="surface-1 w-full max-w-md rounded-xl border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold">Libérer le paiement vendeur</h3>
              <button onClick={() => setPayOpen(false)} aria-label="Fermer"><X size={18} /></button>
            </div>
            <div className="space-y-4 p-5 text-xs">
              <div className="rounded-md surface-2 border border-white/5 p-3 space-y-1.5">
                <Row label="Vendeur" value={vendor?.firstName ?? "—"} />
                <Row label="WhatsApp" value={vendor?.whatsapp ?? "—"} mono />
                <Row label="Montant" value={fcfa(br.sellerAmount)} mono accent="text-teal" />
              </div>
              <div>
                <label htmlFor="txn" className="mb-1.5 block font-medium">Référence de transaction Mobile Money</label>
                <input id="txn" value={txn} onChange={e => setTxn(e.target.value)} placeholder="Ex : MP260603.0844.X12345"
                  className="h-11 w-full rounded surface-2 border border-white/10 px-3 font-mono outline-none focus:border-primary/40" />
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setPayOpen(false)} className="h-9 rounded-md border border-white/10 px-4 text-xs">Annuler</button>
              <button onClick={() => { if (!txn) return toast.error("Référence requise."); setPayOpen(false); setStep(6); toast.success("Paiement libéré."); }}
                className="h-9 rounded-md bg-teal px-4 text-xs font-medium text-[#0F1117]">Confirmer le paiement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`${mono ? "font-mono " : ""}${accent ?? ""}`}>{value}</span>
    </div>
  );
}
