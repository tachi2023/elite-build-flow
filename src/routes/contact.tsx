import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Devis & Contact — Élite Placo & Déco | PRIMA BTP" },
      { name: "description", content: "Demandez un devis personnalisé pour vos travaux de plâtrerie et décoration intérieure à Douala." },
      { property: "og:title", content: "Demander un devis — Élite Placo & Déco" },
      { property: "og:description", content: "Réponse sous 24h. Devis et conseil gratuits." },
    ],
  }),
  component: Contact,
});

const types = ["Plafond décoratif", "Faux plafond BA13", "Habillage mural", "Décoration intérieure", "Plâtrerie complète", "Autre"];

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold">Devis gratuit</p>
            <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">Parlons de votre projet.</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">Remplissez le formulaire, notre équipe revient vers vous sous 24 heures.</p>

            {sent ? (
              <div className="mt-10 card-elevated rounded-xl p-8 text-center">
                <CheckCircle2 className="mx-auto text-success" size={40} />
                <h2 className="mt-4 font-display text-2xl font-semibold">Demande envoyée</h2>
                <p className="mt-2 text-sm text-muted-foreground">Merci. Nous vous contacterons très bientôt.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="mt-10 card-elevated grid gap-4 rounded-xl p-6 sm:grid-cols-2"
              >
                <Field label="Nom complet" required><input required className="input" placeholder="Votre nom" /></Field>
                <Field label="Téléphone" required><input required type="tel" className="input" placeholder="+237 …" /></Field>
                <Field label="Email"><input type="email" className="input" placeholder="vous@email.com" /></Field>
                <Field label="Ville"><input className="input" placeholder="Douala, Yaoundé…" /></Field>
                <Field label="Type de projet" className="sm:col-span-2">
                  <select className="input"><option value="">Sélectionnez…</option>{types.map(t => <option key={t}>{t}</option>)}</select>
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <textarea rows={4} className="input" placeholder="Surface estimée, type de pièces, délais souhaités…" />
                </Field>
                <button className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-md gold-gradient px-5 py-3 text-sm font-semibold text-background transition hover:brightness-110">
                  <Send size={16} /> Envoyer ma demande
                </button>
              </form>
            )}
          </div>
          <aside className="space-y-4">
            <InfoCard icon={Phone} label="Téléphone / WhatsApp" value="+237 6 99 00 00 00" />
            <InfoCard icon={Mail} label="Email" value="contact@eliteplaco.cm" />
            <InfoCard icon={MapPin} label="Adresse" value="Douala, Cameroun" />
            <div className="card-elevated rounded-xl p-5">
              <p className="text-xs uppercase tracking-widest text-gold">Disponibilité</p>
              <p className="mt-2 text-sm text-muted-foreground">Lun — Sam · 8h00 – 18h00</p>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />

      <style>{`.input{width:100%;background:var(--color-background);border:1px solid var(--color-input);border-radius:var(--radius-md);padding:.6rem .8rem;font-size:.875rem;color:var(--color-foreground);outline:none;transition:border-color .15s,box-shadow .15s}.input:focus{border-color:var(--color-gold);box-shadow:0 0 0 3px var(--color-ring)}`}</style>
    </div>
  );
}

function Field({ label, children, required, className = "" }: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-gold"> *</span>}
      </span>
      {children}
    </label>
  );
}
function InfoCard({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="card-elevated flex items-center gap-4 rounded-xl p-5">
      <span className="grid h-10 w-10 place-items-center rounded-md gold-gradient text-background"><Icon size={18} /></span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-medium">{value}</p>
      </div>
    </div>
  );
}
