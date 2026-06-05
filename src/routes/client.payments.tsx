import { createFileRoute } from "@tanstack/react-router";
import { Wallet, CheckCircle2, Clock, Smartphone, Building2, Banknote } from "lucide-react";
import { fcfa } from "@/lib/format";
import { SectionHeader, StatCard } from "@/components/ui-bits";
import { payments, clientProjects, totalsForClient } from "@/lib/client-mock";

export const Route = createFileRoute("/client/payments")({ component: PaymentsPage });

const methods = [
  { name: "MTN Mobile Money", icon: Smartphone, hint: "Paiement instantané" },
  { name: "Orange Money", icon: Smartphone, hint: "Paiement instantané" },
  { name: "Virement bancaire", icon: Building2, hint: "1 à 2 jours ouvrés" },
  { name: "Espèces (sur place)", icon: Banknote, hint: "Bureau Bonapriso" },
];

function PaymentsPage() {
  const t = totalsForClient();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Centre de paiements" subtitle="Visualisez vos contrats, paiements effectués et échéances à venir." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Montant total contrats" value={fcfa(t.total)} icon={Wallet} />
        <StatCard label="Total payé" value={fcfa(t.paid)} icon={CheckCircle2} accent="success" />
        <StatCard label="Solde restant" value={fcfa(t.remaining)} icon={Clock} accent="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">Historique des paiements</h3>
          <ul className="divide-y divide-border">
            {payments.map(p => {
              const proj = clientProjects.find(cp => cp.id === p.projectId);
              return (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-md ${
                    p.status === "paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                  }`}><Wallet size={16}/></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{p.type} <span className="text-xs text-muted-foreground">— {proj?.title}</span></p>
                    <p className="text-xs text-muted-foreground">
                      {p.status === "paid" ? `${p.date} · ${p.method}` : `Échéance ${p.dueDate} · ${p.method}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-display text-base ${p.status === "paid" ? "text-success" : "text-gold"}`}>{fcfa(p.amount)}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {p.status === "paid" ? "Payé" : "À venir"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <h3 className="mb-3 font-display text-lg font-semibold">Moyens de paiement</h3>
          <p className="text-xs text-muted-foreground">Bientôt disponibles depuis votre espace.</p>
          <ul className="mt-4 space-y-2">
            {methods.map(m => {
              const Icon = m.icon;
              return (
                <li key={m.name} className="flex items-center gap-3 rounded-md border border-border p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-gold-soft text-gold"><Icon size={16}/></div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.hint}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 rounded-md bg-gold-soft p-3 text-[11px] text-gold">
            Reçu PDF généré automatiquement après chaque paiement.
          </p>
        </div>
      </div>
    </div>
  );
}
