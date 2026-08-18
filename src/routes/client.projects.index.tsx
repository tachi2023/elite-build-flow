import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { fcfa } from "@/lib/format";
import { SectionHeader } from "@/components/ui-bits";
import { clientProjects, statusLabel } from "@/lib/client-mock";

export const Route = createFileRoute("/client/projects/")({
  component: ProjectsList,
});

function ProjectsList() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Mes projets" subtitle="Suivez l'avancement de chacun de vos chantiers." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {clientProjects.map(p => (
          <Link key={p.id} to="/client/projects/$id" params={{ id: p.id }}
            className="card-elevated group overflow-hidden rounded-xl transition hover:-translate-y-0.5 hover:border-gold/50">
            <div className="relative h-44 overflow-hidden">
              <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-gold backdrop-blur">
                {statusLabel[p.status]}
              </span>
              <span className="absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                {p.progress}%
              </span>
            </div>
            <div className="p-5">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.reference}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} /> {p.address}
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full gold-gradient" style={{ width: `${p.progress}%` }} />
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Montant</p>
                  <p className="font-display text-base">{fcfa(p.amount)}</p>
                </div>
                <ArrowUpRight size={16} className="text-gold" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
