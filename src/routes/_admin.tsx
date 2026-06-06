import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Menu, Bell, Search } from "lucide-react";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("vd_sidebar_collapsed");
      if (v === "1") setCollapsed(true);
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("vd_sidebar_collapsed", collapsed ? "1" : "0"); } catch {}
  }, [collapsed]);

  const sidebarWidth = collapsed ? "lg:w-16" : "lg:w-60";
  const contentPad = collapsed ? "lg:pl-16" : "lg:pl-60";

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col z-30 ${sidebarWidth} transition-[width] duration-200`}>
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      </div>

      {/* Floating expand button when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          aria-label="Étendre le menu"
          className="hidden lg:flex fixed left-16 top-4 z-40 h-7 items-center rounded-r-md bg-primary px-2 text-[10px] font-medium text-primary-foreground"
        >
          ▸
        </button>
      )}

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-64 max-w-[80%]">
            <AdminSidebar collapsed={false} onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className={`${contentPad} transition-[padding] duration-200`}>
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border surface-1/90 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setDrawer(true)} aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-md border border-white/10">
            <Menu size={18} strokeWidth={1.5} />
          </button>
          <Link to="/dashboard" className="font-mono text-xs font-semibold uppercase tracking-wider">VraiDeal · Admin</Link>
          <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-md border border-white/10">
            <Bell size={18} strokeWidth={1.5} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-purple" />
          </button>
        </header>

        {/* Desktop top bar */}
        <header className="sticky top-0 z-20 hidden h-14 items-center justify-between border-b border-border surface-1/90 px-6 backdrop-blur lg:flex lg:px-8">
          <div className="relative max-w-md flex-1">
            <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Rechercher commande, produit, vendeur…"
              className="h-9 w-full rounded-md surface-2 border border-white/5 pl-9 pr-3 text-xs outline-none focus:border-primary/40"
            />
          </div>
          <div className="ml-4 flex items-center gap-2">
            <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-md surface-2 border border-white/5 hover:border-white/15">
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-purple" />
            </button>
          </div>
        </header>

        <main className="pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
