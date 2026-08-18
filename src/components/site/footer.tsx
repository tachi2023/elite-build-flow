import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md gold-gradient font-display text-lg font-bold text-primary-foreground">É</span>
            <span className="font-display text-base font-semibold tracking-wide">ÉLITE PLACO &amp; DÉCO</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Plâtrerie, faux plafonds et décoration intérieure haut de gamme à Douala.
            Une filiale du groupe PRIMA BTP.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Nos métiers</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Cloisons &amp; placoplâtre</li>
            <li>Faux plafonds décoratifs</li>
            <li>Staff &amp; moulures</li>
            <li>Peinture &amp; enduits</li>
            <li>Design d'intérieur</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> +237 6 99 41 22 08</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> contact@eliteplaco.cm</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> Bonapriso, Douala — Cameroun</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Élite Placo &amp; Déco — PRIMA BTP. Tous droits réservés.</span>
          <span>Douala · Yaoundé · Kribi</span>
        </div>
      </div>
    </footer>
  );
}
