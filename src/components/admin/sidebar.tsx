import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Inbox, ClipboardList, ShoppingBag, RefreshCcw,
  Truck, DollarSign, Store, BarChart2, LogOut, PanelLeft, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { submissions, orders, refunds } from "@/lib/mock";

const NAV = [
  { to: "/dashboard",    label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { to: "/submissions",  label: "Soumissions",     icon: Inbox,        badgeKey: "pendingSubs" as const },
  { to: "/catalogue",    label: "Catalogue",       icon: ClipboardList },
  { to: "/orders",       label: "Commandes",       icon: ShoppingBag,  badgeKey: "activeOrders" as const },
  { to: "/refunds",      label: "Remboursements",  icon: RefreshCcw,   badgeKey: "pendingRefunds" as const },
  { to: "/deliveries",   label: "Livraisons",      icon: Truck },
  { to: "/immediate",    label: "Achat immédiat",  icon: Zap },
  { to: "/finance",      label: "Financier",       icon: DollarSign },
  { to: "/vendors",      label: "Vendeurs",        icon: Store },
  { to: "/analytics",    label: "Analytics",       icon: BarChart2 },
];

export function AdminSidebar({ collapsed, onNavigate, onToggle }: {
  collapsed: boolean; onNavigate?: () => void; onToggle?: () => void;
}) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const counts = {
    pendingSubs: submissions.filter(s => s.status === "En attente").length,
    activeOrders: orders.filter(o => !["Terminée", "Annulée"].includes(o.status)).length,
    pendingRefunds: refunds.filter(r => r.status === "En attente").length,
  };

  return (
    <aside className={cn(
      "flex h-full w-full flex-col surface-1 text-sidebar-foreground border-r border-sidebar-border",
    )}>
      {/* Logo */}
      <div className={cn("flex items-center gap-2 border-b border-sidebar-border px-4 h-16", collapsed && "justify-center px-2")}>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground font-semibold">V</div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">VraiDeal</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-purple">Admin</div>
          </div>
        )}
        {!collapsed && onToggle && (
          <button onClick={onToggle} aria-label="Réduire" className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-white/5">
            <PanelLeft size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {!collapsed && <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Opérations</p>}
        <ul className="space-y-0.5">
          {NAV.map(item => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            const badge = item.badgeKey ? counts[item.badgeKey] : 0;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors",
                    active ? "bg-primary/15 text-primary border border-primary/30" : "text-sidebar-foreground/85 hover:bg-white/5 hover:text-foreground border border-transparent",
                    collapsed && "justify-center px-2",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={20} strokeWidth={1.5} className={active ? "text-primary" : ""} />
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && badge > 0 && (
                    <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-purple/20 px-1.5 font-mono text-[10px] font-medium text-[#9b7fff]">{badge}</span>
                  )}
                  {collapsed && badge > 0 && (
                    <span className="absolute right-1.5 top-1 h-2 w-2 rounded-full bg-purple" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-md surface-2 p-2.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">AD</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">Admin</p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">vraideal.cm</p>
            </div>
            <Link to="/" aria-label="Déconnexion" className="grid h-7 w-7 place-items-center rounded text-muted-foreground hover:text-red hover:bg-white/5">
              <LogOut size={16} strokeWidth={1.5} />
            </Link>
          </div>
        ) : (
          <Link to="/" aria-label="Déconnexion" className="mx-auto grid h-9 w-9 place-items-center rounded text-muted-foreground hover:text-red hover:bg-white/5">
            <LogOut size={18} strokeWidth={1.5} />
          </Link>
        )}
      </div>
    </aside>
  );
}
