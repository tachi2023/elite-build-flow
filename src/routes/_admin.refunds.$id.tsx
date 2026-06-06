import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, StatusBadge } from "@/components/admin/ui";
import { findRefund, findOrder, findProduct } from "@/lib/mock";
import { fcfa, dateTime } from "@/lib/format";
import { AlertCircle, RefreshCcw, X, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/refunds/$id")({
  head: () => ({ meta: [{ title: "Détail remboursement · VraiDeal Admin" }] }),
  component: RefundDetail,
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Cas introuvable.</div>,
});

function RefundDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const r = findRefund(id);
  const order = r ? findOrder(r.orderId) : undefined;
  const product = order ? findProduct(order.productId) : undefined;
  const [validated, setValidated] = useState<"yes" | "no" | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [confirm1, setConfirm1] = useState(false);
  const [confirm2, setConfirm2] = useState(false);
  const [txn, setTxn] = useState("");
  const [status, setStatus] = useState(r?.status);

  if (!r) return null;

  const trigger = () => {
    setConfirm2(false);
    setStatus("En cours");
    toast.success("Remboursement déclenché. Virement à effectuer.");
  };

  return (
    <div>
      <PageHeader
        title={<>Remboursement <span className="font-mono">{r.id}</span></>}
        breadcrumb={<><Link to="/refunds" className="hover:text-foreground">Remboursements</Link> · {r.id}</>}
        actions={<StatusBadge status={status ?? r.status} />}
      />

      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-5 min-w-0">
          <Card title="Commande concernée">
            <div className="flex gap-3">
              {product?.photos[0] && <img src={product.photos[0]} alt="" className="h-16 w-16 rounded object-cover" />}
              <div className="min-w-0 flex-1 text-xs space-y-1">
                <div className="text-sm">{product?.title}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{r.orderId}</div>
                <div className="font-mono text-base font-semibold text-primary">{fcfa(r.amount)}</div>
              </div>
            </div>
          </Card>

          <Card title="Problème signalé">
            <div className="space-y-3">
              <div className="text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Motif</span>
                <p className="mt-1">{r.reason}</p>
              </div>
              <div className="text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Description acheteur</span>
                <p className="mt-1 whitespace-pre-wrap text-foreground/90">{r.description}</p>
              </div>
              {r.photos.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Photos jointes</span>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {r.photos.map((p, i) => <img key={i} src={p} alt="" className="h-24 w-24 rounded object-cover" />)}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card title="Évaluation admin">
            <div className="space-y-3 text-xs">
              <div>
                <label className="mb-2 block font-medium">Problème validé ?</label>
                <div className="flex gap-2">
                  <button onClick={() => setValidated("yes")}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 ${validated === "yes" ? "border-teal/40 bg-teal/15 text-teal" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>
                    <Check size={12} /> Oui
                  </button>
                  <button onClick={() => setValidated("no")}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 ${validated === "no" ? "border-red/40 bg-red/15 text-red" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>
                    <X size={12} /> Non
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block font-medium">Notes</label>
                <textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} rows={3}
                  className="w-full rounded surface-2 border border-white/5 p-2.5 outline-none focus:border-primary/40" />
              </div>
            </div>
          </Card>

          {(status === "En cours" || status === "Remboursée") && (
            <Card title="Historique remboursement">
              <ol className="space-y-2 relative pl-5 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-px before:bg-white/10">
                <Step ts={r.triggeredAt ?? new Date().toISOString()} label="Déclenchement remboursement" done />
                <Step ts={r.paidAt} label="Virement effectué" done={!!r.paidAt} />
                <Step ts={r.confirmedAt} label="Confirmation acheteur" done={!!r.confirmedAt} />
              </ol>
            </Card>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-20 self-start">
          <div className="rounded-md border border-red/30 bg-red/[0.05] p-4 text-xs">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-red mt-0.5" />
              <div>
                <div className="font-semibold text-red">Action irréversible</div>
                <p className="mt-1 text-foreground/80">Le déclenchement d'un remboursement engage VraiDeal financièrement. Vérifiez deux fois.</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setConfirm1(true)} disabled={status !== "En attente"}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-red text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red/90"
          >
            <RefreshCcw size={18} strokeWidth={1.5} /> Déclencher le remboursement ({fcfa(r.amount)})
          </button>
        </div>
      </div>

      {/* Confirm 1 */}
      {confirm1 && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="surface-1 w-full max-w-md rounded-xl border p-6">
            <h3 className="text-base font-semibold">Êtes-vous certain ?</h3>
            <p className="mt-2 text-xs text-muted-foreground">Cette action est <span className="text-red font-semibold">irréversible</span>. Le montant sera reversé à l'acheteur via Mobile Money.</p>
            <div className="mt-3 rounded surface-2 border border-white/5 p-3 space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Montant</span><span className="font-mono font-semibold">{fcfa(r.amount)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Acheteur</span><span>{r.buyerFirstName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">WhatsApp</span><span className="font-mono">{r.buyerWhatsapp}</span></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirm1(false)} className="h-9 rounded-md border border-white/10 px-4 text-xs">Annuler</button>
              <button onClick={() => { setConfirm1(false); setConfirm2(true); }} className="h-9 rounded-md bg-red px-4 text-xs font-medium text-white">Continuer</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm 2 */}
      {confirm2 && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="surface-1 w-full max-w-md rounded-xl border p-6">
            <h3 className="text-base font-semibold">Référence du virement</h3>
            <p className="mt-2 text-xs text-muted-foreground">Saisissez la référence Mobile Money pour traçabilité.</p>
            <input value={txn} onChange={e => setTxn(e.target.value)} placeholder="Ex : MP260603.1844.REFD12"
              className="mt-3 h-11 w-full rounded surface-2 border border-white/10 px-3 font-mono text-sm outline-none focus:border-primary/40" />
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirm2(false)} className="h-9 rounded-md border border-white/10 px-4 text-xs">Annuler</button>
              <button onClick={trigger} disabled={!txn} className="h-9 rounded-md bg-red px-4 text-xs font-medium text-white disabled:opacity-40">Confirmer le remboursement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ ts, label, done }: { ts?: string; label: string; done?: boolean }) {
  return (
    <li className="relative">
      <span className={`absolute -left-3.5 top-1.5 h-1.5 w-1.5 rounded-full ${done ? "bg-teal" : "bg-white/20"}`} />
      <div className="font-mono text-[10px] text-muted-foreground">{ts ? dateTime(ts) : "En attente"}</div>
      <div className={`text-xs ${done ? "text-foreground" : "text-muted-foreground"}`}>{label}</div>
    </li>
  );
}
