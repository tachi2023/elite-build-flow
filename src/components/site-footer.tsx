import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            L'excellence du plâtre, l'art de la décoration. Plafonds décoratifs,
            faux plafonds BA13, habillage mural et finitions haut de gamme à
            Douala et dans tout le Cameroun.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-widest text-gold">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Plafonds décoratifs</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Faux plafonds BA13</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Habillage mural</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Décoration intérieure</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs uppercase tracking-widest text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> Douala, Cameroun</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold" /> +237 6 99 00 00 00</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold" /> contact@eliteplaco.cm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Élite Placo & Déco | PRIMA BTP. Tous droits réservés.</p>
          <p>Conçu avec exigence à Douala.</p>
        </div>
      </div>
    </footer>
  );
}
