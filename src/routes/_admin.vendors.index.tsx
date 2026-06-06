import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatusBadge } from "@/components/admin/ui";
import { vendors } from "@/lib/mock";
import { fcfa, dateShort } from "@/lib/format";
import { useState } from "react";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_admin/vendors/")({
  head: () => ({ meta: [{ title: "Vendeurs · VraiDeal Admin" }] }),
  component: VendorsList,
});

function VendorsList() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"sold" | "trust" | "joined">("trust");
  const list = vendors.filter(v => !q || v.firstName.toLowerCase().includes(q.toLowerCase()) || v.whatsapp.includes(q))
    .sort((a, b) => {
      if (sort === "sold") return b.sold - a.sold;
      if (sort === "trust") return b.trust - a.trust;
      return b.joinedAt.localeCompare(a.joinedAt);
    });

  return (
    <div>
      <PageHeader title={`Vendeurs (${vendors.length})`} breadcrumb="Opérations · Vendeurs" />
      <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-4">
        <div className="surface-1 rounded-lg border p-3 flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Recherche par prénom ou n°…"
              className="h-9 w-full rounded-md surface-2 border border-white/5 pl-8 pr-3 text-xs outline-none focus:border-primary/40" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
            className="h-9 rounded-md surface-2 border border-white/5 px-3 text-xs">
            <option value="trust">Trier : Score confiance</option>
            <option value="sold">Trier : Ventes</option>
            <option value="joined">Trier : Inscription</option>
          </select>
        </div>

        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">Vendeur</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">WhatsApp</th>
                  <th className="px-3 py-3 text-left">Soumis</th>
                  <th className="px-3 py-3 text-left">Vendus</th>
                  <th className="px-3 py-3 text-left">Revenus</th>
                  <th className="px-3 py-3 text-left">Confiance</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Signalts</th>
                  <th className="px-3 py-3 text-left">Statut</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {list.map(v => (
                  <tr key={v.id} className="hover-row border-b border-border last:border-0">
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-full surface-2 text-[10px] font-mono">{v.firstName.slice(0, 2).toUpperCase()}</div>
                        <div>
                          <div>{v.firstName}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">depuis {dateShort(v.joinedAt)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 hidden md:table-cell font-mono text-[11px]">{v.whatsapp}</td>
                    <td className="px-3 py-3 font-mono">{v.submissions}</td>
                    <td className="px-3 py-3 font-mono">{v.sold}</td>
                    <td className="px-3 py-3 font-mono">{fcfa(v.revenue)}</td>
                    <td className="px-3 py-3"><TrustBar score={v.trust} /></td>
                    <td className="px-3 py-3 hidden lg:table-cell font-mono">{v.reports}</td>
                    <td className="px-3 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-3 py-3 text-right">
                      <Link to="/vendors/$id" params={{ id: v.id }} className="inline-flex h-8 items-center rounded-md border border-white/10 px-3 text-[11px] hover:border-primary/50 hover:text-primary">Détail</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-teal" : score >= 60 ? "bg-yellow" : "bg-red";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="font-mono text-[11px]">{score}</span>
    </div>
  );
}
