import { createFileRoute } from "@tanstack/react-router";
import { Plus, Phone, Calendar } from "lucide-react";
import { workers, projects } from "@/lib/mock";
import { fcfa } from "@/lib/format";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/workers")({
  component: WorkersPage,
});

function WorkersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Ouvriers"
        subtitle="Effectif, assignations et paiements."
        action={
          <button className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background">
            <Plus size={14} /> Ajouter ouvrier
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workers.map(w => {
          const project = projects.find(p => p.id === w.projectId);
          const monthly = w.dailyRate * w.daysThisMonth;
          return (
            <div key={w.id} className="card-elevated rounded-xl p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full gold-gradient text-background font-display font-semibold">
                  {w.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold">{w.name}</h3>
                  <p className="text-xs text-gold">{w.role}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><Phone size={11}/> {w.phone}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
                <div><p className="text-[10px] uppercase text-muted-foreground">Taux/jour</p><p className="mt-0.5 text-sm font-semibold">{fcfa(w.dailyRate).replace(" FCFA","")}</p></div>
                <div><p className="text-[10px] uppercase text-muted-foreground">Jours</p><p className="mt-0.5 text-sm font-semibold text-gold">{w.daysThisMonth}</p></div>
                <div><p className="text-[10px] uppercase text-muted-foreground">Ce mois</p><p className="mt-0.5 text-sm font-semibold text-success">{fcfa(monthly).replace(" FCFA","")}</p></div>
              </div>
              <div className="mt-4 rounded-md bg-surface-2 p-3 text-xs">
                <p className="text-muted-foreground">Chantier</p>
                <p className="mt-0.5 font-medium">{project ? project.client : <span className="text-muted-foreground italic">Disponible</span>}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-md border border-border bg-surface py-2 text-xs flex items-center justify-center gap-1.5"><Calendar size={12}/> Présences</button>
                <button className="flex-1 rounded-md gold-gradient py-2 text-xs font-semibold text-background">Payer</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
