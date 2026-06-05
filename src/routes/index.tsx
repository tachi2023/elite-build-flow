import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Ruler, Hammer, Star, ShieldCheck, Phone } from "lucide-react";
import hero from "@/assets/hero-plaster.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Élite Placo & Déco | PRIMA BTP — Plâtrerie & Décoration de luxe à Douala" },
      { name: "description", content: "Plafonds décoratifs, faux plafonds BA13, habillage mural et décoration intérieure haut de gamme à Douala et au Cameroun." },
      { property: "og:title", content: "Élite Placo & Déco | PRIMA BTP" },
      { property: "og:description", content: "L'excellence du plâtre, l'art de la décoration." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Salon décoré avec plafond en plâtre orné, corniches et spots LED dorés" width={1920} height={1080} className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full hairline-gold bg-background/40 px-3 py-1 text-xs uppercase tracking-widest text-gold backdrop-blur">
              <Sparkles size={12} /> Douala · Cameroun
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              L'excellence du plâtre,
              <br />
              <span className="gold-text">l'art de la décoration.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Plafonds décoratifs, faux plafonds BA13, habillage mural et finitions
              intérieures de prestige pour villas, hôtels et bureaux haut de gamme.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md gold-gradient px-5 py-3 text-sm font-semibold text-background shadow-[0_12px_30px_-12px_var(--color-gold)] transition hover:brightness-110">
                Demander un devis gratuit <ArrowRight size={16} />
              </Link>
              <Link to="/realisations" className="inline-flex items-center gap-2 rounded-md hairline-gold px-5 py-3 text-sm font-semibold text-gold backdrop-blur transition hover:bg-gold-soft">
                Voir nos réalisations
              </Link>
            </div>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
              {[
                { v: "12+", l: "années d'expérience" },
                { v: "180+", l: "projets livrés" },
                { v: "98%", l: "clients satisfaits" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg hairline-gold bg-surface/60 p-4 backdrop-blur">
                  <dt className="font-display text-2xl font-semibold text-gold sm:text-3xl">{s.v}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-gold">Nos savoir-faire</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Une exécution irréprochable, du plafond au moindre détail.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { i: Ruler, t: "Plafonds décoratifs", d: "Corniches, rosaces, moulures et bandeaux LED sur-mesure." },
            { i: Hammer, t: "Faux plafonds BA13", d: "Cornière + fourrure ou rails + montants selon votre projet." },
            { i: Star, t: "Décoration intérieure", d: "Habillage mural, finitions et conseil d'aménagement." },
          ].map((s) => (
            <div key={s.t} className="card-elevated rounded-xl p-6 transition hover:-translate-y-1 hover:border-gold/40">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-gold-soft">
                <s.i size={18} className="text-gold" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REALISATIONS */}
      <section className="bg-surface/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold">Réalisations</p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Quelques chantiers signés Élite.</h2>
            </div>
            <Link to="/realisations" className="text-sm font-medium text-gold hover:underline">Voir tout →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { img: p1, t: "Villa Mbeng — Bonapriso", d: "Corniches ornées + spots dorés" },
              { img: p2, t: "Duplex Akwa — LED", d: "Faux plafond BA13 lumineux" },
              { img: p3, t: "Hôtel Akwa Palace", d: "Habillage mural lobby" },
            ].map((r) => (
              <article key={r.t} className="group overflow-hidden rounded-xl card-elevated">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={r.img} alt={r.t} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{r.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="card-elevated grid gap-8 rounded-2xl p-8 md:grid-cols-3 md:p-12">
          {[
            { i: ShieldCheck, t: "Garantie 2 ans", d: "Sur toutes nos finitions plâtrerie." },
            { i: Sparkles, t: "Matériaux premium", d: "BA13 certifiés et profilés galvanisés." },
            { i: Phone, t: "Suivi temps réel", d: "Vous recevez photos et avancements via WhatsApp." },
          ].map((b) => (
            <div key={b.t} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md gold-gradient text-background">
                <b.i size={18} />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold">{b.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl gold-gradient p-10 text-background md:p-14">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Un projet en tête ?</h2>
          <p className="mt-3 max-w-xl text-sm opacity-80 sm:text-base">
            Recevez un devis personnalisé en 24h — devis et conseil gratuits.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface">
            Lancer ma demande <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
