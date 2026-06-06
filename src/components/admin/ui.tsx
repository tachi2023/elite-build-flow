import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

// ────── StatusBadge ──────
const STATUS_STYLES: Record<string, string> = {
  "En attente": "bg-yellow/10 text-yellow border-yellow/30",
  "Accepté": "bg-teal/10 text-teal border-teal/30",
  "Publié": "bg-teal/10 text-teal border-teal/30",
  "Refusé": "bg-red/10 text-red border-red/30",
  "En préparation": "bg-blue/10 text-blue border-blue/30",
  "En livraison": "bg-orange/10 text-orange border-orange/30",
  "Livré": "bg-teal/10 text-teal border-teal/30",
  "En attente confirmation": "bg-yellow/10 text-yellow border-yellow/30",
  "Terminée": "bg-teal/5 text-teal/80 border-teal/20",
  "Remboursement en cours": "bg-orange/10 text-orange border-orange/30",
  "En cours": "bg-orange/10 text-orange border-orange/30",
  "Remboursée": "bg-white/5 text-muted-foreground border-white/10",
  "Masqué": "bg-white/5 text-muted-foreground border-white/10",
  "Nouvelle": "bg-purple/10 text-[#9b7fff] border-purple/30",
  "Vendu": "bg-white/5 text-muted-foreground border-white/10",
  "Annulée": "bg-red/5 text-red/80 border-red/20",
  "Actif": "bg-teal/10 text-teal border-teal/30",
  "Surveillance": "bg-yellow/10 text-yellow border-yellow/30",
  "Bloqué": "bg-red/10 text-red border-red/30",
  "OUI": "bg-teal/10 text-teal border-teal/30",
  "NON": "bg-red/10 text-red border-red/30",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const style = STATUS_STYLES[status] ?? "bg-white/5 text-muted-foreground border-white/10";
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider whitespace-nowrap",
      style, className,
    )}>
      {status}
    </span>
  );
}

// ────── KPICard ──────
type KPIAccent = "blue" | "purple" | "orange" | "teal" | "red" | "yellow";
const ACCENT: Record<KPIAccent, { dot: string; text: string; ring: string }> = {
  blue:   { dot: "bg-blue",   text: "text-blue",   ring: "ring-blue/30" },
  purple: { dot: "bg-purple", text: "text-[#9b7fff]", ring: "ring-purple/30" },
  orange: { dot: "bg-orange", text: "text-orange", ring: "ring-orange/30" },
  teal:   { dot: "bg-teal",   text: "text-teal",   ring: "ring-teal/30" },
  red:    { dot: "bg-red",    text: "text-red",    ring: "ring-red/30" },
  yellow: { dot: "bg-yellow", text: "text-yellow", ring: "ring-yellow/30" },
};

export function KPICard({
  icon: Icon, label, value, sub, accent = "blue", to,
}: {
  icon: LucideIcon; label: string; value: ReactNode; sub?: string; accent?: KPIAccent; to?: string;
}) {
  const a = ACCENT[accent];
  const inner = (
    <div className="surface-1 group relative flex h-full flex-col gap-4 rounded-lg border p-5 transition-colors hover:border-white/20">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.03] ring-1", a.ring)}>
          <Icon size={18} strokeWidth={1.5} className={a.text} />
        </span>
        <span className={cn("h-1.5 w-1.5 rounded-full", a.dot)} />
      </div>
      <div>
        <div className="font-mono text-3xl font-semibold tracking-tight text-foreground">{value}</div>
        <div className="mt-1 text-[13px] text-muted-foreground">{label}</div>
        {sub && <div className={cn("mt-2 font-mono text-xs", a.text)}>{sub}</div>}
      </div>
    </div>
  );
  return to ? <Link to={to} className="block">{inner}</Link> : inner;
}

// ────── AlertRow ──────
const ALERT_META = {
  critical: { color: "border-l-red bg-red/[0.04]",   tag: "bg-red/15 text-red border-red/30",       label: "CRITIQUE",  Icon: AlertCircle },
  warning:  { color: "border-l-orange bg-orange/[0.04]", tag: "bg-orange/15 text-orange border-orange/30", label: "ATTENTION", Icon: AlertTriangle },
  info:     { color: "border-l-purple bg-purple/[0.04]", tag: "bg-purple/15 text-[#9b7fff] border-purple/30", label: "INFO",      Icon: Info },
} as const;

export function AlertRow({
  level, message, action, countdown,
}: {
  level: keyof typeof ALERT_META; message: string;
  action: { to: string; label: string };
  countdown?: string;
}) {
  const meta = ALERT_META[level];
  return (
    <div className={cn("flex flex-col gap-3 border-l-2 surface-1 rounded-r-md px-4 py-3 sm:flex-row sm:items-center sm:justify-between", meta.color)}>
      <div className="flex items-start gap-3">
        <meta.Icon size={18} strokeWidth={1.5} className={meta.tag.split(" ")[1]} />
        <div className="min-w-0">
          <span className={cn("mb-1 inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-wider", meta.tag)}>{meta.label}</span>
          <p className="text-sm text-foreground">{message}</p>
          {countdown && <p className="mt-1 font-mono text-xs text-orange">⏱ {countdown}</p>}
        </div>
      </div>
      <Link to={action.to} className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-white/10 surface-2 px-3 text-xs font-medium hover:border-blue/40 hover:text-blue">
        {action.label} →
      </Link>
    </div>
  );
}

// ────── CountdownTimer ──────
export function CountdownTimer({ until, className }: { until: string; className?: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);
  const ms = new Date(until).getTime() - now;
  if (ms <= 0) return <span className={cn("font-mono text-xs text-muted-foreground", className)}>—</span>;
  const hours = Math.floor(ms / 3600_000);
  const mins = Math.floor((ms % 3600_000) / 60_000);
  const critical = ms < 2 * 3600_000;
  return (
    <span className={cn(
      "font-mono text-xs tabular-nums",
      critical ? "text-red" : "text-orange",
      className,
    )}>
      {String(hours).padStart(2, "0")}h{String(mins).padStart(2, "0")}
    </span>
  );
}

// ────── Empty state ──────
export function EmptyState({ icon: Icon, title, subtitle, action }: {
  icon: LucideIcon; title: string; subtitle?: string;
  action?: { label: string; to?: string; onClick?: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04]">
        <Icon size={24} strokeWidth={1.5} className="text-muted-foreground" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (action.to
        ? <Link to={action.to} className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90">{action.label}</Link>
        : <button onClick={action.onClick} className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground hover:bg-primary/90">{action.label}</button>
      )}
    </div>
  );
}

// ────── PageHeader ──────
export function PageHeader({ title, breadcrumb, actions }: {
  title: ReactNode; breadcrumb?: ReactNode; actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border surface-1/40 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div className="min-w-0">
        {breadcrumb && <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{breadcrumb}</div>}
        <h1 className="truncate text-xl font-semibold text-foreground sm:text-2xl">{title}</h1>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

// ────── Card ──────
export function Card({ title, children, action, className }: {
  title?: ReactNode; children: ReactNode; action?: ReactNode; className?: string;
}) {
  return (
    <div className={cn("surface-1 rounded-lg border", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {action}
        </div>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
