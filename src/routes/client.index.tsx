import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, TrendingUp, Wallet, CheckCircle2, ArrowUpRight, Bell, FileText, Calendar, MessageSquare } from "lucide-react";
import { fcfa } from "@/lib/format";
import { StatCard, SectionHeader } from "@/components/ui-bits";
import {
  clientProjects, clientProfile, totalsForClient, payments, notifications,
  messages, appointments, clientDocuments,
} from "@/lib/client-mock";

export const Route = createFileRoute("/client/")({
  component: ClientDashboard,
});

function ClientDashboard() {
  const t = totalsForClient();
  const upcomingPayment = payments.find(p => p.status === "upcoming");
  const nextAppointment = appointments.find(a => a.status !== "completed");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title={`Bonjour, ${clientProfile.name.split(" ")[0]}.`}
        subtitle="Suivi en temps réel de vos projets, paiements et échanges avec Élite Placo & Déco."
        action={
          <Link to="/client/messages" className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background">
            <MessageSquare size={14} /> Contacter mon conseiller
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projets actifs" value={clientProjects.length} icon={Briefcase} hint="Tous chantiers confondus" />
        <StatCard label="Avancement moyen" value={`${Math.round(t.avgProgress)}%`} icon={TrendingUp} accent="success" />
        <StatCard label="Total payé" value={fcfa(t.paid)} icon={CheckCircle2} accent="success" />
        <StatCard label="Solde restant" value={fcfa(t.remaining)} icon={Wallet} accent="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Mes projets en cours</h2>
            <Link to="/client/projects" className="text-xs text-gold hover:underline">Tout voir →</Link>
          </div>
          <ul className="space-y-4">
            {clientProjects.map(p => (
              <li key={p.id}>
                <Link to="/client/projects/$id" params={{ id: p.id }} className="flex gap-4 rounded-lg border border-border p-3 transition hover:border-gold/40">
                  <img src={p.cover} alt="" className="h-20 w-28 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.address}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div className="h-full gold-gradient" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="shrink-0 text-xs text-gold">{p.progress}%</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{p.lastActivity}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="card-elevated rounded-xl p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
              <Wallet size={16} className="text-gold" /> Prochain paiement
            </h3>
            {upcomingPayment ? (
              <>
                <p className="font-display text-2xl text-gold">{fcfa(upcomingPayment.amount)}</p>
                <p className="text-xs text-muted-foreground">{upcomingPayment.type} — échéance {upcomingPayment.dueDate}</p>
                <Link to="/client/payments" className="mt-3 inline-flex w-full items-center justify-center rounded-md hairline-gold px-3 py-2 text-xs text-gold">
                  Voir mes paiements
                </Link>
              </>
            ) : <p className="text-sm text-muted-foreground">Aucun paiement à venir.</p>}
          </div>

          <div className="card-elevated rounded-xl p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold">
              <Calendar size={16} className="text-gold" /> Prochain rendez-vous
            </h3>
            {nextAppointment ? (
              <>
                <p className="font-medium">{nextAppointment.title}</p>
                <p className="text-xs text-muted-foreground">{nextAppointment.date} · {nextAppointment.time}</p>
                <p className="mt-1 text-xs text-muted-foreground">{nextAppointment.location}</p>
              </>
            ) : <p className="text-sm text-muted-foreground">Aucun rendez-vous prévu.</p>}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold"><FileText size={16} className="text-gold"/> Derniers documents</h3>
            <Link to="/client/documents" className="text-xs text-gold hover:underline">Tout</Link>
          </div>
          <ul className="space-y-2 text-sm">
            {clientDocuments.slice(0, 4).map(d => (
              <li key={d.id} className="flex items-center justify-between gap-2">
                <span className="truncate">{d.name}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{d.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold"><MessageSquare size={16} className="text-gold"/> Derniers messages</h3>
            <Link to="/client/messages" className="text-xs text-gold hover:underline">Ouvrir</Link>
          </div>
          <ul className="space-y-3">
            {messages.slice(-3).reverse().map(m => (
              <li key={m.id}>
                <p className="text-[11px] text-muted-foreground">{m.author} · {m.time}</p>
                <p className="line-clamp-2 text-sm">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold"><Bell size={16} className="text-gold"/> Notifications</h3>
            <Link to="/client/notifications" className="text-xs text-gold hover:underline">Tout</Link>
          </div>
          <ul className="space-y-3">
            {notifications.slice(0, 4).map(n => (
              <li key={n.id} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.unread ? "bg-gold" : "bg-muted-foreground/40"}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{n.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{n.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
