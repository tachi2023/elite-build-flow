import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Star, Check, Phone } from "lucide-react";

import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { SERVICES, REALISATIONS, STATS, TESTIMONIALS, TEAM } from "@/lib/mock";
import { fcfa } from "@/lib/format";

const TITLE = "Élite Placo & Déco | PRIMA BTP — Plâtrerie & décoration à Douala";
const DESC =
  "Cloisons, faux plafonds décoratifs, staff, peinture et design d'intérieur haut de gamme à Douala. Devis gratuit sous 48 h.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const PROCESS = [
  { n: "01", t: "Prise de contact", d: "Un échange de 15 minutes pour cerner votre besoin, vos délais et votre budget." },
  { n: "02", t: "Visite & métrés", d: "Relevé précis sur site par un chef de chantier, photos et contraintes techniques." },
  { n: "03", t: "Devis détaillé", d: "Chiffrage ligne par ligne, matériaux et main d'œuvre, transmis sous 48 heures." },
  { n: "04", t: "Réalisation", d: "Équipe dédiée, planning affiché, reporting photo hebdomadaire sur votre espace client." },
  { n: "05", t: "Réception", d: "Levée des réserves, nettoyage complet et garantie de 2 ans sur les finitions." },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url(https://picsum.photos/seed/elite-hero-luxe/1920/1080)" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" aria-hidden />
        <div className="container-x relative py-24 md:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold">
            Groupe PRIMA BTP · Douala
          </span>
          <h1 className="mt-7 max-w-3xl font-display text-4xl leading-[1.1] font-semibold md:text-6xl">
            L'art du plâtre et de la <span className="gold-text">décoration d'exception</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Cloisons, faux plafonds, staff décoratif et finitions premium. Depuis 12 ans,
            nous transformons villas, bureaux et espaces commerciaux à Douala.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-md gold-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Demander un devis gratuit <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#realisations" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/70 px-6 py-3 text-sm font-medium transition-colors hover:bg-surface-2">
              Voir nos réalisations
            </a>
          </div>

          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-semibold gold-text">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-x scroll-mt-20 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-gold">Nos services</span>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Un savoir-faire complet, du gros œuvre à la finition</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.id} className="card-elevated group p-6 transition-colors hover:border-gold/50">
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-wider text-gold">{s.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-4 text-sm text-muted-foreground">
                {s.from > 0 ? <>À partir de <span className="font-medium text-foreground">{fcfa(s.from)}</span> / m²</> : "Sur devis"}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Réalisations */}
      <section id="realisations" className="scroll-mt-20 border-y border-border bg-surface/40 py-20 md:py-28">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-gold">Réalisations</span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Nos derniers chantiers livrés</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REALISATIONS.map((r) => (
              <article key={r.id} className="card-elevated overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={r.cover}
                    alt={`${r.title} — ${r.category} à ${r.location}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full border border-gold/40 px-2.5 py-1 text-gold">{r.category}</span>
                    <span className="text-muted-foreground">{r.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                    <span>{r.location}</span>
                    <span>{r.surface} m²</span>
                    <span>{r.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section id="processus" className="container-x scroll-mt-20 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.22em] text-gold">Méthode</span>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Cinq étapes, zéro mauvaise surprise</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {PROCESS.map((p) => (
            <div key={p.n} className="border-t border-gold/40 pt-5">
              <div className="font-display text-2xl font-semibold gold-text">{p.n}</div>
              <h3 className="mt-2 text-base font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages + équipe */}
      <section className="border-y border-border bg-surface/40 py-20 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.22em] text-gold">Ils nous font confiance</span>
            <div className="mt-8 space-y-5">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="card-elevated p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">« {t.text} »</p>
                  <footer className="mt-4 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{t.name}</span> — {t.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-gold">L'équipe</span>
            <div className="mt-8 space-y-3">
              {TEAM.map((m) => (
                <div key={m.name} className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-sm text-gold">
                    {m.initials}
                  </span>
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container-x scroll-mt-20 py-20 md:py-28">
        <div className="card-elevated grid gap-10 p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-gold">Contact</span>
            <h2 className="mt-3 font-display text-3xl font-semibold">Parlons de votre projet</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Décrivez votre besoin : nous vous rappelons sous 24 h et vous transmettons
              un devis détaillé sous 48 h après la visite technique.
            </p>
            <a
              href="tel:+237699412208"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-gold/50 px-5 py-3 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
            >
              <Phone className="h-4 w-4" /> +237 6 99 41 22 08
            </a>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Nom complet</span>
                <input className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" placeholder="Marie Tchoungui" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Téléphone</span>
                <input className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" placeholder="+237 6 …" />
              </label>
            </div>
            <label className="block text-sm">
              <span className="text-muted-foreground">Type de projet</span>
              <select className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold">
                {SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
              </select>
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">Votre message</span>
              <textarea rows={4} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold" placeholder="Surface, localisation, délai souhaité…" />
            </label>
            <button className="w-full rounded-md gold-gradient px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Envoyer ma demande
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
