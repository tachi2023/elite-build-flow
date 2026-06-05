import { createFileRoute } from "@tanstack/react-router";
import { Shield, Bell, User, Smartphone, Database, CloudOff } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Paramètres" subtitle="Compte, sécurité, équipe et synchronisation." />

      <div className="space-y-4">
        <Section icon={User} title="Profil" desc="Bruno Ngassa · Directeur · bruno@eliteplaco.cm" cta="Modifier" />
        <Section icon={Shield} title="Sécurité — Code PIN" desc="PIN à 4 chiffres · verrouillage après 3 essais · biométrie prête." cta="Changer le PIN" />
        <Section icon={Bell} title="Notifications" desc="Nouvelles demandes, paiements à venir, fin de chantier, paiements ouvriers." cta="Configurer" />
        <Section icon={Smartphone} title="Application mobile" desc="Installer Élite Placo sur votre téléphone (Android / iOS)." cta="Installer PWA" />
        <Section icon={Database} title="Synchronisation" desc="Dernière synchro : il y a 3 minutes — 4 éléments en file d'attente." cta="Synchroniser" />
        <Section icon={CloudOff} title="Mode hors-ligne" desc="Métrés et calculs disponibles sans Internet. Sync automatique au retour." cta="Activé" />

        <div className="card-elevated mt-8 rounded-xl p-5">
          <h2 className="font-display text-lg font-semibold">Rôles (préparés)</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-surface-2 p-3"><span>Directeur</span><span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] text-success">Actif</span></li>
            <li className="flex items-center justify-between rounded-md bg-surface-2 p-3 opacity-70"><span>Comptable</span><span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Bientôt</span></li>
            <li className="flex items-center justify-between rounded-md bg-surface-2 p-3 opacity-70"><span>Chef de chantier</span><span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">Bientôt</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, desc, cta }: { icon: typeof Shield; title: string; desc: string; cta: string }) {
  return (
    <div className="card-elevated flex items-start gap-4 rounded-xl p-5">
      <span className="grid h-11 w-11 place-items-center rounded-md bg-gold-soft text-gold shrink-0"><Icon size={18}/></span>
      <div className="flex-1">
        <h3 className="font-display font-semibold">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
      </div>
      <button className="shrink-0 rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium hover:border-gold/40">{cta}</button>
    </div>
  );
}
