import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, StatusBadge, EmptyState } from "@/components/admin/ui";
import { refunds, findOrder, findProduct } from "@/lib/mock";
import { fcfa, dateTime } from "@/lib/format";
import { RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/_admin/refunds/")({
  head: () => ({ meta: [{ title: "Remboursements · VraiDeal Admin" }] }),
  component: RefundsList,
});

const TABS = ["En attente", "En cours", "Remboursée"] as const;

function RefundsList() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("En attente");
  const filtered = useMemo(() => refunds.filter(r => r.status === tab), [tab]);
  return (
    <div>
      <PageHeader title={`Remboursements`} breadcrumb="Opérations · Remboursements" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-xs border ${tab === t ? "bg-primary/15 border-primary/40 text-primary" : "surface-1 border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"}`}>
              {t} ({refunds.filter(r => r.status === t).length})
            </button>
          ))}
        </div>
        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">Réf.</th>
                  <th className="px-3 py-3 text-left">N° commande</th>
                  <th className="px-3 py-3 text-left">Produit</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Acheteur</th>
                  <th className="px-3 py-3 text-left">Montant</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Motif</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Signalement</th>
                  <th className="px-3 py-3 text-left">Statut</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={9}><EmptyState icon={RefreshCcw} title="Aucun remboursement" /></td></tr>}
                {filtered.map(r => {
                  const o = findOrder(r.orderId);
                  const p = o ? findProduct(o.productId) : undefined;
                  return (
                    <tr key={r.id} className="hover-row border-b border-border last:border-0">
                      <td className="px-3 py-3 font-mono text-[11px]">{r.id}</td>
                      <td className="px-3 py-3 font-mono text-[11px]">{r.orderId}</td>
                      <td className="px-3 py-3 truncate max-w-[200px]">{p?.title ?? "—"}</td>
                      <td className="px-3 py-3 hidden md:table-cell">{r.buyerFirstName}</td>
                      <td className="px-3 py-3 font-mono">{fcfa(r.amount)}</td>
                      <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{r.reason}</td>
                      <td className="px-3 py-3 hidden md:table-cell font-mono text-[11px] text-muted-foreground">{dateTime(r.reportedAt)}</td>
                      <td className="px-3 py-3"><StatusBadge status={r.status} /></td>
                      <td className="px-3 py-3 text-right">
                        <Link to="/refunds/$id" params={{ id: r.id }} className="inline-flex h-8 items-center rounded-md border border-white/10 px-3 text-[11px] hover:border-primary/50 hover:text-primary">Examiner</Link>
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
