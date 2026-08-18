import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const SECTIONS = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#processus", label: "Processus" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md gold-gradient font-display text-lg font-bold text-primary-foreground">
            É
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-wide">ÉLITE PLACO &amp; DÉCO</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">PRIMA BTP · Douala</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#contact"
            className="rounded-md border border-gold/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
          >
            Devis gratuit
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface md:hidden">
          <div className="container-x flex flex-col py-3">
            {SECTIONS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-muted-foreground hairline"
              >
                {s.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-3 rounded-md gold-gradient px-4 py-2.5 text-center text-sm font-medium text-primary-foreground">
              Devis gratuit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
