import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, StatusBadge } from "@/components/admin/ui";
import { findVendor, submissions, products, orders } from "@/lib/mock";
import { fcfa, dateShort, dateTime, relTime } from "@/lib/format";
import { Ban, Eye, StickyNote, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/vendors/$id")({
  head: () => ({ meta: [{ title: "Vendeur · VraiDeal Admin" }] }),
  component: VendorDetail,
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Vendeur introuvable.</div>,
});

function VendorDetail() {
  const { id } = Route.useParams();
  const v = findVendor(id);
  const [note, setNote] = useState("");
  const [blockOpen, setBlockOpen] = useState(false);
  const [status, setStatus] = useState(v?.status);

  if (!v) return null;
  const subs = submissions.filter(s => s.vendorId === id);
  const prods = products.filter(p => p.vendorId === id);
  const sales = orders.filter(o => prods.some(p => p.id === o.productId));
  const activeListings = prods.filter(p => p.status === "Publié").length;

  return (
    <div>
      <PageHeader
        title={v.firstName}
        breadcrumb={<><Link to="/vendors" className="hover:text-foreground">Vendeurs</Link> · {v.firstName}</>}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status ?? v.status} />
            <a href={`https://wa.me/${v.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-teal/30 px-3 text-xs text-teal hover:bg-teal/10"><MessageCircle size={14} />WhatsApp</a>
            <button onClick={() => { setStatus("Surveillance"); toast.success("Vendeur mis sous surveillance."); }}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-yellow/30 px-3 text-xs text-yellow hover:bg-yellow/10"><Eye size={14} />Surveillance</button>
            <button onClick={() => setBlockOpen(true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-red/30 px-3 text-xs text-red hover:bg-red/10"><Ban size={14} />Bloquer</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-5 min-w-0">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Soumissions" value={v.submissions} />
            <Stat label="Vendus" value={v.sold} />
            <Stat label="Revenus" value={fcfa(v.revenue)} mono />
            <Stat label="Confiance" value={`${v.trust}/100`} mono />
          </div>

          <Card title={`Soumissions (${subs.length})`}>
            {subs.length === 0 ? <p className="text-xs text-muted-foreground">Aucune soumission.</p> : (
              <div className="overflow-x-auto -mx-5 -mb-5">
                <table className="w-full text-xs">
                  <thead className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr><th className="px-3 py-2 text-left">Réf.</th><th className="px-3 py-2 text-left">Produit</th><th className="px-3 py-2 text-left">Date</th><th className="px-3 py-2 text-left">Statut</th></tr>
                  </thead>
                  <tbody>
                    {subs.map(s => (
                      <tr key={s.id} className="border-b border-border last:border-0">
                        <td className="px-3 py-2 font-mono text-[11px]">{s.ref}</td>
                        <td className="px-3 py-2 max-w-[200px] truncate">{s.title}</td>
                        <td className="px-3 py-2 text-muted-foreground">{relTime(s.submittedAt)}</td>
                        <td className="px-3 py-2"><StatusBadge status={s.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card title={`Ventes (${sales.length})`}>
            {sales.length === 0 ? <p className="text-xs text-muted-foreground">Aucune vente.</p> : (
              <div className="overflow-x-auto -mx-5 -mb-5">
                <table className="w-full text-xs">
                  <thead className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr><th className="px-3 py-2 text-left">N°</th><th className="px-3 py-2 text-left">Produit</th><th className="px-3 py-2 text-left">Montant</th><th className="px-3 py-2 text-left">Date</th><th className="px-3 py-2 text-left">Statut</th></tr>
                  </thead>
                  <tbody>
                    {sales.map(o => {
                      const p = prods.find(pp => pp.id === o.productId);
                      return (
                        <tr key={o.id} className="border-b border-border last:border-0">
                          <td className="px-3 py-2 font-mono text-[11px]">{o.id}</td>
                          <td className="px-3 py-2 max-w-[200px] truncate">{p?.title}</td>
                          <td className="px-3 py-2 font-mono">{fcfa(o.amount)}</td>
                          <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{dateTime(o.createdAt)}</td>
                          <td className="px-3 py-2"><StatusBadge status={o.status} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {v.reports > 0 && (
            <Card title={`Signalements (${v.reports})`}>
              <div className="text-xs text-muted-foreground">Aucun détail récent disponible (mock).</div>
            </Card>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-20 self-start">
          <Card title="Profil">
            <dl className="text-xs space-y-2">
              <Row label="ID" value={v.id} mono />
              <Row label="WhatsApp" value={v.whatsapp} mono />
              <Row label="Inscrit" value={dateShort(v.joinedAt)} />
              <Row label="Statut" value={status ?? v.status} />
              {v.note && (
                <div className="pt-2">
                  <dt className="text-muted-foreground">Note interne</dt>
                  <dd className="mt-1 text-foreground/80">{v.note}</dd>
                </div>
              )}
            </dl>
          </Card>

          <Card title="Ajouter une note interne" action={<StickyNote size={14} className="text-muted-foreground" />}>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Note réservée à l'équipe…"
              className="w-full rounded surface-2 border border-white/5 p-2.5 text-xs outline-none focus:border-primary/40" />
            <button onClick={() => { setNote(""); toast.success("Note enregistrée."); }}
              className="mt-2 h-8 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground">Enregistrer</button>
          </Card>
        </div>
      </div>

      {blockOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="surface-1 w-full max-w-md rounded-xl border p-6">
            <h3 className="text-base font-semibold text-red">Bloquer {v.firstName} ?</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Cela retirera immédiatement <span className="font-mono text-red">{activeListings}</span> annonce(s) active(s) de ce vendeur. L'action peut être annulée mais les annonces devront être republiées.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setBlockOpen(false)} className="h-9 rounded-md border border-white/10 px-4 text-xs">Annuler</button>
              <button onClick={() => { setStatus("Bloqué"); setBlockOpen(false); toast.success(`${v.firstName} bloqué.`); }}
                className="h-9 rounded-md bg-red px-4 text-xs font-medium text-white">Confirmer le blocage</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="surface-1 rounded-lg border p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return <div className="flex justify-between gap-3"><dt className="text-muted-foreground">{label}</dt><dd className={mono ? "font-mono" : ""}>{value}</dd></div>;
}
