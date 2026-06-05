import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Download, Eye, Share2, Search } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { clientDocuments, clientProjects } from "@/lib/client-mock";

export const Route = createFileRoute("/client/documents")({ component: Documents });

const categories = ["Tous", "Devis", "Contrat", "Facture", "Reçu", "Métrés"] as const;

function Documents() {
  const [cat, setCat] = useState<typeof categories[number]>("Tous");
  const [q, setQ] = useState("");

  const docs = useMemo(() => clientDocuments.filter(d =>
    (cat === "Tous" || d.type === cat) && d.name.toLowerCase().includes(q.toLowerCase())
  ), [cat, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Centre de documents" subtitle="Tous vos devis, contrats, factures et rapports — organisés par projet." />

      <div className="card-elevated rounded-xl p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1.5 overflow-x-auto">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${
                  cat === c ? "bg-gold-soft text-gold border border-gold/30" : "border border-border text-muted-foreground"
                }`}>{c}</button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-md border border-input bg-surface px-3 py-2">
            <Search size={14} className="text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher..." className="w-full bg-transparent text-sm outline-none sm:w-64" />
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {clientProjects.map(p => {
          const list = docs.filter(d => d.projectId === p.id);
          if (!list.length) return null;
          return (
            <div key={p.id} className="card-elevated rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold">{p.title}</h3>
                <span className="text-xs text-muted-foreground">{p.reference}</span>
              </div>
              <ul className="divide-y divide-border">
                {list.map(d => (
                  <li key={d.id} className="flex items-center gap-3 py-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md bg-gold-soft text-gold"><FileText size={16}/></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.type} · {d.date} · {d.size}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="grid h-9 w-9 place-items-center rounded-md border border-border hover:text-gold hover:border-gold/40"><Eye size={14}/></button>
                      <button className="grid h-9 w-9 place-items-center rounded-md border border-border hover:text-gold hover:border-gold/40"><Download size={14}/></button>
                      <button className="grid h-9 w-9 place-items-center rounded-md border border-border hover:text-gold hover:border-gold/40"><Share2 size={14}/></button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
