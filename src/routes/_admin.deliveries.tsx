import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { products, findVendor } from "@/lib/mock";
import { relTime } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/deliveries")({
  head: () => ({ meta: [{ title: "Pings disponibilité · VraiDeal Admin" }] }),
  component: Pings,
});

function Pings() {
  const list = products.filter(p => p.status !== "Vendu");
  const stats = {
    active: products.filter(p => p.status === "Publié").length,
    waiting: products.filter(p => p.pingResponse === "En attente").length,
    hiddenAuto: products.filter(p => p.status === "Masqué" && p.daysWithoutResponse >= 7).length,
  };

  return (
    <div>
      <PageHeader title="Pings de disponibilité" breadcrumb="Opérations · Livraisons & pings" />
      <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat label="Produits actifs" value={stats.active} accent="text-teal" />
          <Stat label="En attente de réponse" value={stats.waiting} accent="text-yellow" />
          <Stat label="Masqués auto (ce mois)" value={stats.hiddenAuto} accent="text-red" />
        </div>

        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">Produit</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Vendeur</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Publication</th>
                  <th className="px-3 py-3 text-left">Dernier ping</th>
                  <th className="px-3 py-3 text-left">Réponse</th>
                  <th className="px-3 py-3 text-left">Jours sans rép.</th>
                  <th className="px-3 py-3 text-left">Statut</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {list.map(p => {
                  const v = findVendor(p.vendorId);
                  const rowClass = p.daysWithoutResponse >= 7 ? "bg-red/[0.06]" : p.daysWithoutResponse >= 2 ? "bg-orange/[0.04]" : "";
                  return (
                    <tr key={p.id} className={`hover-row border-b border-border last:border-0 ${rowClass}`}>
                      <td className="px-3 py-3 max-w-[240px] truncate">{p.title}</td>
                      <td className="px-3 py-3 hidden md:table-cell">{v?.firstName}</td>
                      <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{relTime(p.publishedAt)}</td>
                      <td className="px-3 py-3 text-muted-foreground">{p.lastPingAt ? relTime(p.lastPingAt) : "—"}</td>
                      <td className="px-3 py-3">{p.pingResponse ? <StatusBadge status={p.pingResponse} /> : "—"}</td>
                      <td className="px-3 py-3 font-mono">{p.daysWithoutResponse}</td>
                      <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-3 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button onClick={() => toast.success("Ping envoyé via WhatsApp.")}
                            className="h-7 rounded border border-white/10 px-2 text-[11px] hover:border-primary/40 hover:text-primary">Ping</button>
                          <button onClick={() => toast.success("Produit masqué.")}
                            className="h-7 rounded border border-white/10 px-2 text-[11px] hover:border-yellow/40 hover:text-yellow">Masquer</button>
                          <button onClick={() => toast.success("Produit retiré définitivement.")}
                            className="h-7 rounded border border-white/10 px-2 text-[11px] hover:border-red/40 hover:text-red">Retirer</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="surface-1 rounded-lg border p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono text-2xl font-semibold ${accent ?? ""}`}>{value}</div>
    </div>
  );
}
