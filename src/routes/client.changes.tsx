import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GitPullRequestArrow, Plus, Check } from "lucide-react";
import { fcfa } from "@/lib/format";
import { SectionHeader } from "@/components/ui-bits";
import { changeRequests, clientProjects } from "@/lib/client-mock";

export const Route = createFileRoute("/client/changes")({ component: ChangesPage });

const flow = [
  { key: "submitted", label: "Demande envoyée" },
  { key: "reviewing", label: "Étude par l'entreprise" },
  { key: "estimated", label: "Coût communiqué" },
  { key: "approved", label: "Approbation client" },
  { key: "executed", label: "Travaux exécutés" },
];

function ChangesPage() {
  const [openForm, setOpenForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Demandes de modification"
        subtitle="Faites évoluer votre projet en cours de chantier : design, matériau, couleur ou ajout."
        action={
          <button onClick={() => setOpenForm(true)} className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background">
            <Plus size={14}/> Nouvelle demande
          </button>
        }
      />

      <ul className="space-y-4">
        {changeRequests.map(c => {
          const proj = clientProjects.find(p => p.id === c.projectId);
          const stepIdx = flow.findIndex(f => f.key === c.status);
          return (
            <li key={c.id} className="card-elevated rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-gold">{c.category} · {proj?.title}</p>
                  <p className="mt-1 font-display text-base font-semibold">{c.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.notes}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Envoyée : {c.submittedAt}</p>
                </div>
                {c.cost !== undefined && <span className="font-display text-lg text-gold">{fcfa(c.cost)}</span>}
              </div>
              <div className="mt-5 flex items-center gap-2 overflow-x-auto">
                {flow.map((f, i) => {
                  const done = i <= stepIdx;
                  return (
                    <div key={f.key} className="flex items-center gap-2">
                      <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[10px] ${
                        done ? "gold-gradient text-background border-transparent" : "bg-surface border-border text-muted-foreground"
                      }`}>{i + 1}</div>
                      <span className={`whitespace-nowrap text-xs ${done ? "text-foreground" : "text-muted-foreground"}`}>{f.label}</span>
                      {i < flow.length - 1 && <span className={`mx-1 h-px w-8 ${done ? "bg-gold/40" : "bg-border"}`} />}
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      {openForm && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-background/80 backdrop-blur sm:place-items-center" onClick={() => setOpenForm(false)}>
          <div className="card-elevated w-full max-w-lg rounded-t-2xl p-6 sm:rounded-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="mb-1 font-display text-lg font-semibold">
              <GitPullRequestArrow className="mr-2 inline text-gold" size={18}/> Nouvelle demande
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">Décrivez la modification souhaitée. Notre équipe vous répondra avec un chiffrage sous 48h.</p>
            {submitted ? (
              <div className="rounded-md bg-success/10 p-5 text-center">
                <Check size={28} className="mx-auto text-success" />
                <p className="mt-2 font-medium">Demande enregistrée</p>
                <button onClick={() => { setSubmitted(false); setOpenForm(false); }} className="mt-3 text-xs text-gold hover:underline">Fermer</button>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <select className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold">
                  {clientProjects.map(p => <option key={p.id}>{p.title}</option>)}
                </select>
                <select className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold">
                  <option>Design</option><option>Matériau</option><option>Couleur</option><option>Ajout</option>
                </select>
                <input placeholder="Titre court" required className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold" />
                <textarea rows={4} placeholder="Décrivez votre demande..." required className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold" />
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient px-4 py-2.5 text-sm font-semibold text-background">Envoyer la demande</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
