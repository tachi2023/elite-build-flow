import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Card, EmptyState } from "@/components/admin/ui";
import { submissions, findVendor } from "@/lib/mock";
import { fcfa, dateTime } from "@/lib/format";
import { MessageCircle, X, Zap } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/immediate")({
  head: () => ({ meta: [{ title: "Demandes d'achat immédiat · VraiDeal Admin" }] }),
  component: ImmediatePage,
});

function ImmediatePage() {
  const list = submissions.filter(s => s.immediatePurchase);
  const [open, setOpen] = useState<typeof list[number] | null>(null);
  const [resale, setResale] = useState<number>(0);
  const [decision, setDecision] = useState<"offer" | "normal" | null>(null);
  const [offer, setOffer] = useState<number>(0);

  const margin = useMemo(() => (open ? resale - offer : 0), [open, resale, offer]);

  return (
    <div>
      <PageHeader title="Demandes d'achat immédiat" breadcrumb="Opérations · Achat immédiat" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">Produit</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Vendeur</th>
                  <th className="px-3 py-3 text-left">Prix min.</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Soumis</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && <tr><td colSpan={5}><EmptyState icon={Zap} title="Aucune demande d'achat immédiat" /></td></tr>}
                {list.map(s => {
                  const v = findVendor(s.vendorId);
                  return (
                    <tr key={s.id} className="hover-row border-b border-border last:border-0">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <img src={s.photos[0]} alt="" className="h-9 w-9 rounded object-cover" />
                          <div>
                            <div className="truncate max-w-[200px]">{s.title}</div>
                            <div className="font-mono text-[10px] text-muted-foreground">{s.ref}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell">{v?.firstName}</td>
                      <td className="px-3 py-3 font-mono">{fcfa(s.minPrice)}</td>
                      <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground font-mono text-[11px]">{dateTime(s.submittedAt)}</td>
                      <td className="px-3 py-3 text-right">
                        <button onClick={() => { setOpen(s); setResale(Math.round(s.minPrice * 1.35)); setOffer(s.minPrice); setDecision(null); }}
                          className="h-8 rounded-md border border-white/10 px-3 text-[11px] hover:border-primary/50 hover:text-primary">Évaluer</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Eval side panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/70" onClick={() => setOpen(null)}>
          <div className="surface-1 h-full w-full max-w-lg overflow-y-auto border-l" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 surface-1 flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold">Évaluation · <span className="font-mono">{open.ref}</span></h3>
              <button onClick={() => setOpen(null)} aria-label="Fermer"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-2">
                {open.photos.map((p, i) => <img key={i} src={p} alt="" className="aspect-square w-full rounded object-cover" />)}
              </div>
              <Card title="Infos produit">
                <dl className="text-xs space-y-1.5">
                  <Row label="Catégorie" value={open.category} />
                  <Row label="État" value={open.declaredCondition} />
                  <Row label="Prix min. vendeur" value={fcfa(open.minPrice)} mono />
                </dl>
                <p className="mt-3 text-xs whitespace-pre-wrap text-foreground/80">{open.description}</p>
              </Card>
              <Card title="Évaluation admin">
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="mb-1.5 block font-medium">Prix de revente estimé</label>
                    <input type="number" value={resale} onChange={e => setResale(Number(e.target.value) || 0)}
                      className="h-10 w-full rounded surface-2 border border-white/5 px-3 font-mono outline-none focus:border-primary/40" />
                  </div>
                  <div className="rounded-md border border-blue/20 bg-blue/[0.04] p-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Marge potentielle</div>
                    <div className={`mt-1 font-mono text-xl font-semibold ${margin > 0 ? "text-teal" : "text-red"}`}>{fcfa(margin)}</div>
                  </div>
                  <div>
                    <label className="mb-1.5 block font-medium">Décision</label>
                    <div className="flex gap-2">
                      <button onClick={() => setDecision("offer")}
                        className={`flex-1 rounded-md border px-3 py-2 text-xs ${decision === "offer" ? "border-primary/40 bg-primary/15 text-primary" : "border-white/10 text-muted-foreground"}`}>Faire une offre</button>
                      <button onClick={() => setDecision("normal")}
                        className={`flex-1 rounded-md border px-3 py-2 text-xs ${decision === "normal" ? "border-purple/40 bg-purple/15 text-[#9b7fff]" : "border-white/10 text-muted-foreground"}`}>Passer en publication normale</button>
                    </div>
                  </div>
                  {decision === "offer" && (
                    <>
                      <div>
                        <label className="mb-1.5 block font-medium">Montant de l'offre</label>
                        <input type="number" value={offer} onChange={e => setOffer(Number(e.target.value) || 0)}
                          className="h-10 w-full rounded surface-2 border border-white/5 px-3 font-mono outline-none focus:border-primary/40" />
                      </div>
                      <div>
                        <label className="mb-1.5 block font-medium">Aperçu message WhatsApp</label>
                        <div className="rounded-lg bg-[#005c4b]/20 border border-teal/20 p-3">
                          <div className="flex items-start gap-2">
                            <MessageCircle size={14} className="text-teal mt-0.5" />
                            <p className="text-xs whitespace-pre-wrap">
                              {`Bonjour ${findVendor(open.vendorId)?.firstName ?? ""}, nous sommes intéressés par votre ${open.title}. Nous vous proposons ${fcfa(offer)} pour un achat immédiat. Payable sous 24h via Mobile Money.\n\nL'équipe VraiDeal`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => { setOpen(null); toast.success("Offre envoyée via WhatsApp."); }}
                        className="h-11 w-full rounded-md bg-teal text-sm font-medium text-[#0F1117] inline-flex items-center justify-center gap-2">
                        <MessageCircle size={16} /> Envoyer l'offre via WhatsApp
                      </button>
                    </>
                  )}
                  {decision === "normal" && (
                    <button onClick={() => { setOpen(null); toast.success("Soumission renvoyée vers le flux normal."); }}
                      className="h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">Continuer en publication normale</button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}</dt><dd className={mono ? "font-mono" : ""}>{value}</dd></div>
  );
}
