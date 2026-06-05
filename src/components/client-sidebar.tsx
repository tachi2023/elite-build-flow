import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, FileText, Wallet, Calendar, MessageSquare,
  GitPullRequestArrow, Sparkles, Star, Gift, Bell, ShoppingBag, User2, LogOut,
} from "lucide-react";
import { Logo } from "./logo";
import { clientProfile } from "@/lib/client-mock";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
export const clientNav: NavItem[] = [
  { to: "/client", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/client/projects", label: "Mes projets", icon: FolderKanban },
  { to: "/client/documents", label: "Documents", icon: FileText },
  { to: "/client/payments", label: "Paiements", icon: Wallet },
  { to: "/client/appointments", label: "Rendez-vous", icon: Calendar },
  { to: "/client/messages", label: "Messagerie", icon: MessageSquare },
  { to: "/client/changes", label: "Demandes de modif.", icon: GitPullRequestArrow },
  { to: "/client/inspirations", label: "Inspirations déco", icon: Sparkles },
  { to: "/client/reviews", label: "Avis & évaluations", icon: Star },
  { to: "/client/referrals", label: "Parrainage", icon: Gift },
  { to: "/client/notifications", label: "Notifications", icon: Bell },
  { to: "/client/marketplace", label: "Marketplace", icon: ShoppingBag },
  { to: "/client/profile", label: "Mon profil", icon: User2 },
];

export function ClientSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <Logo />
        <p className="mt-2 text-[10px] uppercase tracking-widest text-gold">Espace client</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Mon espace</p>
        <ul className="space-y-1">
          {clientNav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-gold-soft text-gold border border-[color-mix(in_oklab,var(--color-gold)_30%,transparent)]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon size={16} className={active ? "text-gold" : ""} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-3 rounded-md bg-sidebar-accent/60 p-3">
          <div className="grid h-9 w-9 place-items-center rounded-full gold-gradient text-background font-semibold">
            {clientProfile.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{clientProfile.name}</p>
            <p className="truncate text-xs text-muted-foreground">Cliente — {clientProfile.city}</p>
          </div>
        </div>
        <Link
          to="/client/auth"
          className="flex items-center justify-center gap-2 rounded-md border border-sidebar-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/40"
        >
          <LogOut size={14} /> Déconnexion
        </Link>
      </div>
    </aside>
  );
}
