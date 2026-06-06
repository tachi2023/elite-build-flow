import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusBadge, EmptyState } from "@/components/admin/ui";
import { submissions, findVendor } from "@/lib/mock";
import { relTime, fcfa } from "@/lib/format";
import { Inbox, Zap, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/_admin/submissions/")({
  head: () => ({ meta: [{ title: "Soumissions · VraiDeal Admin" }] }),
  component: SubmissionsList,
});

function SubmissionsList() {
  const list = submissions.slice().sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
  return (
    <div>
      <PageHeader
        title={`Soumissions (${list.length})`}
        breadcrumb="Opérations · Soumissions"
        actions={
          <div className="font-mono text-[11px] text-muted-foreground">
            {list.filter(s => s.status === "En attente").length} en attente
          </div>
        }
      />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">Produit</th>
                  <th className="px-3 py-3 text-left">Référence</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Catégorie</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Vendeur</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Prix min.</th>
                  <th className="px-3 py-3 text-left">Statut</th>
                  <th className="px-3 py-3 text-left">Attente</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && (
                  <tr><td colSpan={8}><EmptyState icon={Inbox} title="Aucune soumission" /></td></tr>
                )}
                {list.map(s => {
                  const v = findVendor(s.vendorId);
                  return (
                    <tr key={s.id} className="hover-row border-b border-border last:border-0">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <img src={s.photos[0]} alt="" className="h-10 w-10 rounded object-cover" />
                          <div className="min-w-0 max-w-[220px]">
                            <div className="truncate text-foreground">{s.title}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              {s.urgency && <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-orange"><Zap size={10} />Urgence</span>}
                              {s.immediatePurchase && <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-purple"><ShoppingBag size={10} />Achat immédiat</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-[11px]">{s.ref}</td>
                      <td className="px-3 py-3 hidden md:table-cell text-muted-foreground">{s.category}</td>
                      <td className="px-3 py-3 hidden md:table-cell">{v?.firstName}</td>
                      <td className="px-3 py-3 hidden lg:table-cell font-mono">{fcfa(s.minPrice)}</td>
                      <td className="px-3 py-3"><StatusBadge status={s.status} /></td>
                      <td className="px-3 py-3 text-muted-foreground">{relTime(s.submittedAt)}</td>
                      <td className="px-3 py-3 text-right">
                        <Link to="/submissions/$id" params={{ id: s.id }} className="inline-flex h-8 items-center rounded-md border border-white/10 px-3 text-[11px] hover:border-primary/50 hover:text-primary">Examiner</Link>
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
