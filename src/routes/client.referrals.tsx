import { createFileRoute } from "@tanstack/react-router";
import { Copy, Share2, Gift, Send, CheckCircle2 } from "lucide-react";
import { fcfa } from "@/lib/format";
import { SectionHeader, StatCard } from "@/components/ui-bits";
import { referralStats } from "@/lib/client-mock";

export const Route = createFileRoute("/client/referrals")({ component: ReferralsPage });

const rewards = [
  { title: "5% de remise", desc: "sur votre prochain chantier", icon: Gift },
  { title: "Service bonus", desc: "1 prestation décoration offerte", icon: Gift },
  { title: "Priorité planning", desc: "réservation prioritaire", icon: Gift },
];

function ReferralsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Programme de parrainage" subtitle="Recommandez Élite Placo & Déco et recevez des avantages exclusifs." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Parrainages envoyés" value={referralStats.sent} icon={Send} />
        <StatCard label="Conversions" value={referralStats.converted} icon={CheckCircle2} accent="success" />
        <StatCard label="Récompenses cumulées" value={fcfa(referralStats.rewardsFcfa)} icon={Gift} accent="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-6 lg:col-span-2">
          <p className="text-[10px] uppercase tracking-widest text-gold">Votre code unique</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="font-display text-3xl gold-text">{referralStats.code}</span>
            <button className="inline-flex items-center gap-1 rounded-md hairline-gold px-3 py-1.5 text-xs text-gold"><Copy size={12}/> Copier</button>
            <button className="inline-flex items-center gap-1 rounded-md hairline-gold px-3 py-1.5 text-xs text-gold"><Share2 size={12}/> Partager via WhatsApp</button>
          </div>

          <h3 className="mt-8 mb-3 font-display text-base font-semibold">Historique des parrainages</h3>
          <ul className="divide-y divide-border">
            {referralStats.history.map(h => (
              <li key={h.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.date}</p>
                </div>
                <div className="text-right">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] ${
                    h.status === "converted" ? "bg-success/15 text-success border-success/30" : "bg-warning/15 text-warning border-warning/30"
                  }`}>{h.status === "converted" ? "Converti" : "En attente"}</span>
                  {h.reward > 0 && <p className="mt-1 text-xs text-gold">+{fcfa(h.reward)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated rounded-xl p-6">
          <h3 className="font-display text-lg font-semibold">Récompenses</h3>
          <ul className="mt-3 space-y-3">
            {rewards.map(r => {
              const Icon = r.icon;
              return (
                <li key={r.title} className="flex gap-3 rounded-md border border-border p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-gold-soft text-gold"><Icon size={16}/></div>
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
