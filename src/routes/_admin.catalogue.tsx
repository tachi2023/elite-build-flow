import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, StatusBadge, EmptyState, CountdownTimer } from "@/components/admin/ui";
import { products, findVendor, CATEGORIES } from "@/lib/mock";
import { fcfa } from "@/lib/format";
import { Search, Eye, EyeOff, Pencil, Zap, BadgeCheck, Package, X } from "lucide-react";
import { toast } from "sonner";
import { breakdown } from "@/lib/format";

export const Route = createFileRoute("/_admin/catalogue")({
  head: () => ({ meta: [{ title: "Catalogue · VraiDeal Admin" }] }),
  component: Catalogue,
});

function Catalogue() {
  const [cat, setCat] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<typeof products[number] | null>(null);

  const filtered = useMemo(() => products.filter(p =>
    (!cat || p.category === cat) &&
    (!status || (status === "Urgent" ? p.urgent : p.status === status)) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()))
  ), [cat, status, q]);

  const urgentProducts = products.filter(p => p.urgent && p.status === "Publié");

  return (
    <div>
      <PageHeader title={`Catalogue (${products.length})`} breadcrumb="Opérations · Catalogue" />
      <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {urgentProducts.length > 0 && (
          <section className="surface-1 rounded-lg border border-orange/30 bg-orange/[0.04]">
            <div className="flex items-center gap-2 border-b border-orange/20 px-4 py-2.5">
              <Zap size={14} className="text-orange" />
              <h3 className="text-xs font-semibold text-orange uppercase tracking-wider font-mono">Produits urgents ({urgentProducts.length})</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {urgentProducts.map(p => (
                <div key={p.id} className="surface-2 rounded-md border border-white/5 p-3">
                  <div className="flex gap-3">
                    <img src={p.photos[0]} alt="" className="h-14 w-14 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium">{p.title}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{p.category}</div>
                      <div className="mt-1 font-mono text-sm font-semibold text-primary">{fcfa(p.publicPrice)}</div>
                    </div>
                  </div>
                  {p.urgentUntil && (
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Expire dans</span>
                      <CountdownTimer until={p.urgentUntil} />
                    </div>
                  )}
                  <div className="mt-2 flex gap-1">
                    <button className="flex-1 h-7 rounded border border-white/10 text-[10px] hover:border-primary/40">Prolonger</button>
                    <button className="flex-1 h-7 rounded border border-white/10 text-[10px] hover:border-red/40 hover:text-red">Désactiver</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filters */}
        <div className="surface-1 rounded-lg border p-3 flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Recherche…"
              className="h-9 w-full rounded-md surface-2 border border-white/5 pl-8 pr-3 text-xs outline-none focus:border-primary/40" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)} className="h-9 rounded-md surface-2 border border-white/5 px-3 text-xs">
            <option value="">Toutes catégories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)} className="h-9 rounded-md surface-2 border border-white/5 px-3 text-xs">
            <option value="">Tous statuts</option>
            <option value="Publié">Publié</option>
            <option value="Masqué">Masqué</option>
            <option value="Vendu">Vendu</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Table */}
        <div className="surface-1 rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-3 text-left">Produit</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Catégorie</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">État</th>
                  <th className="px-3 py-3 text-left">Prix</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Commission</th>
                  <th className="px-3 py-3 text-left hidden md:table-cell">Vendeur</th>
                  <th className="px-3 py-3 text-left">Statut</th>
                  <th className="px-3 py-3 text-left hidden lg:table-cell">Badges</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={9}><EmptyState icon={Package} title="Aucun produit trouvé" /></td></tr>}
                {filtered.map(p => {
                  const v = findVendor(p.vendorId);
                  const br = breakdown(p.publicPrice, p.category);
                  return (
                    <tr key={p.id} className="hover-row border-b border-border last:border-0">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.photos[0]} alt="" className="h-10 w-10 rounded object-cover" />
                          <div className="min-w-0 max-w-[220px]">
                            <div className="truncate">{p.title}</div>
                            <div className="font-mono text-[10px] text-muted-foreground">{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 hidden md:table-cell text-muted-foreground">{p.category}</td>
                      <td className="px-3 py-3 hidden lg:table-cell">{p.condition}</td>
                      <td className="px-3 py-3 font-mono">{fcfa(p.publicPrice)}</td>
                      <td className="px-3 py-3 hidden lg:table-cell font-mono text-blue">{fcfa(br.commission)}</td>
                      <td className="px-3 py-3 hidden md:table-cell">{v?.firstName}</td>
                      <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-3 py-3 hidden lg:table-cell">
                        <div className="flex gap-1">
                          {p.urgent && <span className="inline-flex items-center gap-0.5 rounded bg-orange/15 px-1.5 py-0.5 text-[10px] text-orange"><Zap size={10} />Urgent</span>}
                          {p.certified && <span className="inline-flex items-center gap-0.5 rounded bg-teal/15 px-1.5 py-0.5 text-[10px] text-teal"><BadgeCheck size={10} />Certifié</span>}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => setEdit(p)} aria-label="Éditer" className="grid h-7 w-7 place-items-center rounded border border-white/10 hover:border-primary/40 hover:text-primary"><Pencil size={12} strokeWidth={1.5} /></button>
                          <button aria-label="Masquer" onClick={() => toast.success("Produit masqué (mock).")} className="grid h-7 w-7 place-items-center rounded border border-white/10 hover:border-yellow/40 hover:text-yellow">{p.status === "Publié" ? <EyeOff size={12} strokeWidth={1.5} /> : <Eye size={12} strokeWidth={1.5} />}</button>
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

      {edit && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/60" onClick={() => setEdit(null)}>
          <div className="surface-1 h-full w-full max-w-md border-l overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 surface-1 flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold">Éditer · <span className="font-mono">{edit.id}</span></h3>
              <button onClick={() => setEdit(null)} aria-label="Fermer"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="mb-1.5 block font-medium">Titre</label>
                <input defaultValue={edit.title} className="h-10 w-full rounded surface-2 border border-white/5 px-3 outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="mb-1.5 block font-medium">Description</label>
                <textarea defaultValue={edit.description} rows={4} className="w-full rounded surface-2 border border-white/5 p-2.5 outline-none focus:border-primary/40" />
              </div>
              <div>
                <label className="mb-1.5 block font-medium">Prix (FCFA)</label>
                <input type="number" defaultValue={edit.publicPrice} className="h-10 w-full rounded surface-2 border border-white/5 px-3 font-mono outline-none focus:border-primary/40" />
              </div>
              <button onClick={() => { setEdit(null); toast.success("Modifications enregistrées (mock)."); }}
                className="h-10 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
