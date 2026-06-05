import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Nos services — Élite Placo & Déco | PRIMA BTP" },
      { name: "description", content: "Plafonds décoratifs, faux plafonds BA13, habillage mural et finitions intérieures à Douala." },
      { property: "og:title", content: "Services — Élite Placo & Déco" },
      { property: "og:description", content: "Plâtrerie et décoration intérieure haut de gamme." },
    ],
  }),
  component: Services,
});

const items = [
  {
    t: "Plafonds décoratifs", d: "Corniches, rosaces, moulures et bandeaux LED sur-mesure pour villas et résidences.",
    points: ["Corniches sculptées", "Rosaces et moulures", "Bandeaux LED indirects", "Spots encastrés"],
  },
  {
    t: "Faux plafonds BA13", d: "Systèmes Cornière + Fourrure ou Rails + Montants selon les contraintes du chantier.",
    points: ["BA13 standard / hydrofuge", "Joints invisibles", "Isolation acoustique", "Réception garantie"],
  },
  {
    t: "Habillage mural & décoration", d: "Panneaux, niches, têtes de lit et reliefs décoratifs.",
    points: ["Panneaux 3D", "Niches lumineuses", "Têtes de lit décoratives", "Finitions soignées"],
  },
  {
    t: "Plâtrerie traditionnelle", d: "Enduits, lissage et préparation murs pour peinture haut de gamme.",
    points: ["Enduit lissé", "Préparation peinture", "Réparations", "Bandes et joints"],
  },
];

function Services() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-gold">Services</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Un savoir-faire complet pour votre intérieur.</h1>
        <p className="mt-4 text-muted-foreground">De la conception à la finition, nous livrons un travail soigné, mesuré et garanti.</p>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((s) => (
            <div key={s.t} className="card-elevated rounded-xl p-6">
              <h2 className="font-display text-2xl font-semibold">{s.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-gold" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md gold-gradient px-6 py-3 text-sm font-semibold text-background">
            Demander un devis
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
