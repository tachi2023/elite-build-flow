import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Calendar, Shield, Bell } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { clientProfile } from "@/lib/client-mock";

export const Route = createFileRoute("/client/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Mon profil" subtitle="Vos informations personnelles et préférences de compte." />

      <div className="card-elevated overflow-hidden rounded-2xl">
        <div className="flex flex-col items-center gap-3 border-b border-border p-8 sm:flex-row sm:items-center sm:gap-5">
          <div className="grid h-20 w-20 place-items-center rounded-full gold-gradient text-background font-display text-2xl">
            {clientProfile.initials}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-display text-2xl font-semibold">{clientProfile.name}</h2>
            <p className="text-sm text-muted-foreground">Cliente depuis {clientProfile.memberSince}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-gold">Code parrainage : {clientProfile.referralCode}</p>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2">
          <Field icon={Mail} label="Email" value={clientProfile.email} />
          <Field icon={Phone} label="Téléphone" value={clientProfile.phone} />
          <Field icon={MapPin} label="Ville" value={clientProfile.city} />
          <Field icon={Calendar} label="Membre depuis" value={clientProfile.memberSince} />
        </div>

        <div className="border-t border-border p-6">
          <h3 className="mb-3 font-display text-base font-semibold">Sécurité & préférences</h3>
          <ul className="space-y-2">
            <Row icon={Shield} title="Mot de passe" hint="Modifié il y a 2 mois" cta="Modifier" />
            <Row icon={Phone} title="Authentification à deux facteurs" hint="Désactivée" cta="Activer" />
            <Row icon={Bell} title="Préférences de notifications" hint="In-App, Email, WhatsApp" cta="Gérer" />
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border p-3">
      <div className="grid h-9 w-9 place-items-center rounded-md bg-gold-soft text-gold"><Icon size={14}/></div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function Row({ icon: Icon, title, hint, cta }: { icon: typeof Mail; title: string; hint: string; cta: string }) {
  return (
    <li className="flex items-center justify-between rounded-md border border-border p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-gold-soft text-gold"><Icon size={14}/></div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>
      <button className="rounded-md hairline-gold px-3 py-1.5 text-xs text-gold">{cta}</button>
    </li>
  );
}
