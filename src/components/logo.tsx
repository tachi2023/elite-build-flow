import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-md gold-gradient text-background font-display text-lg font-bold shadow-[0_4px_20px_-6px_var(--color-gold)]">
        É
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold tracking-tight">
          Élite Placo<span className="text-gold"> & </span>Déco
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          PRIMA BTP · Douala
        </span>
      </span>
    </Link>
  );
}
