import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, StatusBadge, EmptyState, CountdownTimer } from "@/components/admin/ui";
import { orders, findProduct } from "@/lib/mock";
import { fcfa, dateTime } from "@/lib/format";
import { FileDown, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/_admin/orders/")({
  head: () => ({ meta: [{ title: "Commandes · VraiDeal Admin" }] }),
  component: OrdersList,
});

const TABS = ["Toutes", "Nouvelles", "En préparation", "En livraison", "En attente confirmation", "Terminées", "Annulées"] as const;

function OrdersList() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Toutes");
  const filtered = useMemo(() => {
    if (tab === "Toutes") return orders;
    const map: Record<string, string> = { "Nouvelles": "Nouvelle", "Terminées": "Terminée", "Annulées": "Annulée" };
    const target = map[tab] ?? tab;
    return orders.filter(o => o.status === target);
  }, [tab]);

  return (
    <div>
      <PageHeader
        title={`Commandes (${orders.length})`}
        breadcrumb="Opérations · Commandes"
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 px-3 text-xs hover:border-primary/40 hover:text-primary">
            <FileDown size={14} strokeWidth={1.5} /> Exporter
          </button>
        }
      />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 -mx-1 flex gap-1 overflow-x-auto pb-1">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-xs whitespace-nowrap border ${tab === t ? "bg-primary/15 border-primary/40 text-primary" : "surface-1 border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">N° commande</th>
                  <th className="px-3 py-3 text-left">Produit</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Acheteur</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Livraison</th>
                  <th className="px-3 py-3 text-left">Montant</th>
                  <th className="px-3 py-3 text-left">Statut</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Date</th>
                  <th className="px-3 py-3 text-left">Timer</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9}><EmptyState icon={ShoppingBag} title="Aucune commande pour ce filtre" /></td></tr>
                )}
                {filtered.map(o => {
                  const p = findProduct(o.productId);
                  return (
                    <tr key={o.id} className="hover-row border-b border-border last:border-0">
                      <td className="px-3 py-3 font-mono text-[11px]">{o.id}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          {p?.photos[0] && <img src={p.photos[0]} alt="" className="h-8 w-8 rounded object-cover" />}
                          <span className="truncate max-w-[200px]">{p?.title ?? "—"}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <div>{o.buyerFirstName}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{o.buyerWhatsapp}</div>
                      </td>
                      <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{o.delivery}</td>
                      <td className="px-3 py-3 font-mono">{fcfa(o.amount)}</td>
                      <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
                      <td className="px-3 py-3 hidden md:table-cell font-mono text-[11px] text-muted-foreground">{dateTime(o.createdAt)}</td>
                      <td className="px-3 py-3">{o.autoValidateAt ? <CountdownTimer until={o.autoValidateAt} /> : <span className="text-muted-foreground">—</span>}</td>
                      <td className="px-3 py-3 text-right">
                        <Link to="/orders/$id" params={{ id: o.id }} className="inline-flex h-8 items-center rounded-md border border-white/10 px-3 text-[11px] hover:border-primary/50 hover:text-primary">Voir détail</Link>
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
