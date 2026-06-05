import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import hero from "@/assets/hero-plaster.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      { title: "Réalisations — Élite Placo & Déco | PRIMA BTP" },
      { name: "description", content: "Galerie de nos chantiers de plâtrerie et décoration à Douala et au Cameroun." },
      { property: "og:title", content: "Réalisations — Élite Placo & Déco" },
      { property: "og:description", content: "Plafonds, faux plafonds, habillages — quelques projets signés Élite." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Realisations,
});

const items = [
  { img: hero, t: "Salon résidentiel — Bonapriso", d: "Faux plafond avec corniches et marbre noir" },
  { img: p1, t: "Corniches ornées — Villa Eyenga", d: "Moulures classiques, lumière chaude" },
  { img: p2, t: "Duplex moderne — Akwa", d: "BA13 + bandeaux LED indirects" },
  { img: p3, t: "Lobby — Hôtel Akwa Palace", d: "Habillage mural strié, accents dorés" },
  { img: p1, t: "Plafond ouvragé — Bali", d: "Plâtre traditionnel" },
  { img: p2, t: "Bureau direction — Bonanjo", d: "Faux plafond technique" },
];

function Realisations() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-gold">Galerie</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Réalisations récentes.</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Chaque chantier est traité avec la même exigence : précision, propreté, finition.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <figure key={i} className="group overflow-hidden rounded-xl card-elevated">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={r.img} alt={r.t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <figcaption className="p-5">
                <p className="font-display text-lg font-semibold">{r.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
