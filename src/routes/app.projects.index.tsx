import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { projects, type ProjectStatus } from "@/lib/mock";
import { fcfa } from "@/lib/format";
import { SectionHeader, StatusBadge } from "@/components/ui-bits";

export const Route = createFileRoute("/app/projects/")({
  component: ProjectsList,
});

const tabs: { key: ProjectStatus | "all"; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "active", label: "En cours" },
  { key: "upcoming", label: "À venir" },
  { key: "completed", label: "Terminés" },
  { key: "paused", label: "En pause" },
];

function ProjectsList() {
  const [tab, setTab] = useState<ProjectStatus | "all">("all");
  const [q, setQ] = useState("");
  const filtered = projects.filter(p =>
    (tab === "all" || p.status === tab) &&
    (q === "" || `${p.client} ${p.type} ${p.city}`.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Projets"
        subtitle="Tous vos chantiers en un coup d'œil."
        action={
          <button className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background">
            <Plus size={14} /> Nouveau projet
          </button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher client, type, ville…"
            className="w-full rounded-md border border-input bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-gold" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2.5 text-sm">
          <Filter size={14} /> Filtres
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition whitespace-nowrap ${
              tab === t.key ? "border-gold bg-gold-soft text-gold" : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {t.label} <span className="ml-1 text-[10px] opacity-60">{t.key === "all" ? projects.length : projects.filter(p => p.status === t.key).length}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map(p => {
          const margin = p.amount > 0 ? ((p.amount - p.expenses) / p.amount) * 100 : 0;
          return (
            <Link key={p.id} to="/app/projects/$id" params={{ id: p.id }}
              className="card-elevated rounded-xl p-5 transition hover:-translate-y-0.5 hover:border-gold/40">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{p.id}</p>
                  <h3 className="mt-1 truncate font-display text-lg font-semibold">{p.client}</h3>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.type}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{p.city}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                <div><dt className="text-[10px] uppercase text-muted-foreground">Montant</dt><dd className="mt-0.5 text-sm font-semibold">{fcfa(p.amount).replace(" FCFA","")}</dd></div>
                <div><dt className="text-[10px] uppercase text-muted-foreground">Dépensé</dt><dd className="mt-0.5 text-sm font-semibold text-destructive">{fcfa(p.expenses).replace(" FCFA","")}</dd></div>
                <div><dt className="text-[10px] uppercase text-muted-foreground">Marge</dt><dd className={`mt-0.5 text-sm font-semibold ${margin>=20?"text-success":margin>=5?"text-warning":"text-destructive"}`}>{margin.toFixed(0)}%</dd></div>
              </dl>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
