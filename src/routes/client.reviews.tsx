import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Send, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { reviewCategories, clientProjects } from "@/lib/client-mock";

export const Route = createFileRoute("/client/reviews")({ component: ReviewsPage });

function ReviewsPage() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Avis & évaluations" subtitle="Votre avis nous aide à progresser et inspire de futurs clients." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-6 lg:col-span-2">
          <p className="text-[10px] uppercase tracking-widest text-gold">Projet à évaluer</p>
          <h3 className="mt-1 font-display text-xl font-semibold">{clientProjects[0].title}</h3>
          <p className="text-xs text-muted-foreground">{clientProjects[0].reference}</p>

          {submitted ? (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-md bg-success/10 p-8 text-center">
              <Check size={36} className="text-success" />
              <p className="font-display text-lg">Merci pour votre avis !</p>
              <p className="text-xs text-muted-foreground">Votre témoignage sera publié sur notre site après modération.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-6 space-y-5">
              {reviewCategories.map(c => (
                <div key={c.key}>
                  <p className="text-sm font-medium">{c.label}</p>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <button type="button" key={n} onClick={() => setRatings(r => ({ ...r, [c.key]: n }))}
                        className="p-1">
                        <Star size={28} className={(ratings[c.key] ?? 0) >= n ? "text-gold" : "text-muted-foreground/40"}
                          fill={(ratings[c.key] ?? 0) >= n ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div>
                <label className="text-sm font-medium">Votre témoignage</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4}
                  placeholder="Décrivez votre expérience..."
                  className="mt-2 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold" />
              </div>
              <button className="inline-flex items-center gap-2 rounded-md gold-gradient px-5 py-2.5 text-sm font-semibold text-background">
                <Send size={14}/> Publier mon avis
              </button>
            </form>
          )}
        </div>

        <div className="card-elevated rounded-xl p-6">
          <h3 className="font-display text-lg font-semibold">Pourquoi votre avis compte</h3>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li>• Aide notre équipe à maintenir l'excellence</li>
            <li>• Inspire confiance aux futurs clients</li>
            <li>• Génère un témoignage sur notre site</li>
            <li>• Vous donne droit à des avantages parrainage</li>
          </ul>
          <div className="mt-5 rounded-md bg-gold-soft p-4">
            <p className="font-display text-2xl text-gold">4.9 / 5</p>
            <p className="text-xs text-muted-foreground">Note moyenne — 47 clients évalués</p>
          </div>
        </div>
      </div>
    </div>
  );
}
