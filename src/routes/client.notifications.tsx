import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Image as ImageIcon, FileText, Wallet, Calendar, TrendingUp, Settings2 } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { notifications } from "@/lib/client-mock";

export const Route = createFileRoute("/client/notifications")({ component: NotificationsPage });

const iconMap = {
  photo: ImageIcon, doc: FileText, payment: Wallet, appointment: Calendar, update: TrendingUp,
} as const;

const channels = [
  { key: "inapp", label: "Application", enabled: true },
  { key: "email", label: "Email", enabled: true },
  { key: "whatsapp", label: "WhatsApp", enabled: true },
  { key: "sms", label: "SMS", enabled: false, hint: "Bientôt disponible" },
];

function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const list = filter === "unread" ? notifications.filter(n => n.unread) : notifications;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Notifications" subtitle="Toutes vos alertes : photos, documents, paiements et rendez-vous." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Boîte de réception</h3>
            <div className="flex gap-1 rounded-md border border-border p-0.5 text-xs">
              <button onClick={() => setFilter("all")} className={`rounded px-2 py-1 ${filter==="all" ? "bg-gold-soft text-gold" : "text-muted-foreground"}`}>Tout</button>
              <button onClick={() => setFilter("unread")} className={`rounded px-2 py-1 ${filter==="unread" ? "bg-gold-soft text-gold" : "text-muted-foreground"}`}>Non lues</button>
            </div>
          </div>
          <ul className="divide-y divide-border">
            {list.map(n => {
              const Icon = iconMap[n.type as keyof typeof iconMap] ?? Bell;
              return (
                <li key={n.id} className={`flex items-start gap-3 py-3 ${n.unread ? "" : "opacity-70"}`}>
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-gold-soft text-gold"><Icon size={16}/></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{n.title}</p>
                    <p className="truncate text-sm text-muted-foreground">{n.description}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</p>
                  </div>
                  {n.unread && <span className="mt-2 h-2 w-2 rounded-full bg-gold" />}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card-elevated h-fit rounded-xl p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold"><Settings2 size={16} className="text-gold"/> Canaux de notification</h3>
          <ul className="space-y-2">
            {channels.map(c => (
              <li key={c.key} className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{c.label}</p>
                  {c.hint && <p className="text-[11px] text-muted-foreground">{c.hint}</p>}
                </div>
                <span className={`relative inline-flex h-5 w-9 items-center rounded-full ${c.enabled ? "gold-gradient" : "bg-muted"}`}>
                  <span className={`block h-3.5 w-3.5 rounded-full bg-background transition ${c.enabled ? "ml-4.5" : "ml-1"}`} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
