import { type ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function StatCard({
  label, value, hint, icon: Icon, accent,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon;
  accent?: "gold" | "success" | "warning" | "destructive";
}) {
  const accentClass =
    accent === "success" ? "text-success"
    : accent === "warning" ? "text-warning"
    : accent === "destructive" ? "text-destructive"
    : "text-gold";
  return (
    <div className="card-elevated rounded-xl p-5">
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        {Icon && (
          <span className="grid h-9 w-9 place-items-center rounded-md bg-gold-soft">
            <Icon size={16} className={accentClass} />
          </span>
        )}
      </div>
      <p className={`mt-3 font-display text-3xl font-semibold ${accentClass}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SectionHeader({
  title, subtitle, action,
}: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-success/15 text-success border-success/30",
    upcoming: "bg-gold-soft text-gold border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)]",
    completed: "bg-muted text-muted-foreground border-border",
    paused: "bg-warning/15 text-warning border-warning/30",
    new: "bg-gold-soft text-gold border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)]",
    contacted: "bg-chart-5/20 text-chart-5 border-chart-5/30",
    visit: "bg-warning/15 text-warning border-warning/30",
    quoted: "bg-chart-5/20 text-chart-5 border-chart-5/30",
    won: "bg-success/15 text-success border-success/30",
    lost: "bg-destructive/15 text-destructive border-destructive/30",
  };
  const labels: Record<string, string> = {
    active: "En cours", upcoming: "À venir", completed: "Terminé", paused: "En pause",
    new: "Nouveau", contacted: "Contacté", visit: "Visite", quoted: "Devis envoyé",
    won: "Gagné", lost: "Perdu",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${map[status] ?? "bg-muted text-muted-foreground border-border"}`}>
      {labels[status] ?? status}
    </span>
  );
}
