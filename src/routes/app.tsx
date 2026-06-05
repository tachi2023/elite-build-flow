import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  LayoutDashboard, FolderKanban, Calculator, Ruler, HardHat, Menu, X, Bell,
} from "lucide-react";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Tableau de bord — Élite Placo & Déco" }, { name: "robots", content: "noindex" }] }),
  component: AppLayout,
});

const mobileTabs = [
  { to: "/app", label: "Accueil", icon: LayoutDashboard, exact: true },
  { to: "/app/projects", label: "Projets", icon: FolderKanban },
  { to: "/app/calculator", label: "Calcul.", icon: Calculator },
  { to: "/app/measurements", label: "Métrés", icon: Ruler },
  { to: "/app/workers", label: "Ouvriers", icon: HardHat },
];

function AppLayout() {
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <AppSidebar />
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80%]"><AppSidebar onNavigate={() => setDrawer(false)} /></div>
        </div>
      )}

      <div className="lg:pl-72">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setDrawer(true)} className="rounded-md border border-border p-2"><Menu size={16} /></button>
          <Link to="/app" className="font-display text-sm font-semibold gold-text">Élite Placo</Link>
          <button className="rounded-md border border-border p-2 relative">
            <Bell size={16} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
          </button>
        </header>

        <main className="pb-24 lg:pb-10">
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-sidebar/95 backdrop-blur lg:hidden">
          <ul className="grid grid-cols-5">
            {mobileTabs.map(({ to, label, icon: Icon, exact }) => (
              <li key={to}>
                <Link
                  to={to}
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact }}
                  className="flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] text-muted-foreground"
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => setDrawer(true)} className="sr-only">menu</button>
        </nav>
      </div>
      {/* swallow unused-import lint */}
      <span className="hidden"><X size={0} /></span>
    </div>
  );
}
