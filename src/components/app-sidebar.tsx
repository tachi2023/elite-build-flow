import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, Wallet, Calculator, Ruler,
  HardHat, Users2, Package, FileText, Settings, Bell, LogOut,
} from "lucide-react";
import { Logo } from "./logo";

const nav = [
  { to: "/app", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/app/projects", label: "Projets", icon: FolderKanban },
  { to: "/app/finances", label: "Finances", icon: Wallet },
  { to: "/app/calculator", label: "Calculateur", icon: Calculator },
  { to: "/app/measurements", label: "Métrés", icon: Ruler },
  { to: "/app/workers", label: "Ouvriers", icon: HardHat },
  { to: "/app/crm", label: "CRM / Devis", icon: Users2 },
  { to: "/app/materials", label: "Matériaux", icon: Package },
  { to: "/app/documents", label: "Documents", icon: FileText },
  { to: "/app/settings", label: "Paramètres", icon: Settings },
] as const;

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">Pilotage</p>
        <ul className="space-y-1">
          {nav.map((item) => {
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
            BN
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Bruno Ngassa</p>
            <p className="truncate text-xs text-muted-foreground">Directeur</p>
          </div>
          <button className="text-muted-foreground hover:text-gold" aria-label="Notifications">
            <Bell size={16} />
          </button>
        </div>
        <Link
          to="/auth"
          className="flex items-center justify-center gap-2 rounded-md border border-sidebar-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/40"
        >
          <LogOut size={14} /> Déconnexion
        </Link>
      </div>
    </aside>
  );
}
