import { createFileRoute, Link } from "@tanstack/react-router";
import { Inbox, ShoppingBag, Banknote, RefreshCcw, ArrowRight } from "lucide-react";
import { KPICard, AlertRow, StatusBadge, CountdownTimer, Card } from "@/components/admin/ui";
import { PageHeader } from "@/components/admin/ui";
import { submissions, orders, refunds, alerts, products, vendors, findProduct, findVendor } from "@/lib/mock";
import { fcfa, relTime, dateTime } from "@/lib/format";

export const Route = createFileRoute("/_admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · VraiDeal Admin" }] }),
  component: Dashboard,
});

function Dashboard() {
  const pendingSubs = submissions.filter(s => s.status === "En attente");
  const activeOrders = orders.filter(o => !["Terminée", "Annulée"].includes(o.status));
  const toRelease = orders.filter(o => o.status === "En attente confirmation" || (o.receivedConfirmedAt && !o.paymentReleasedAt));
  const releaseTotal = toRelease.reduce((s, o) => s + o.amount, 0);
  const pendingRefunds = refunds.filter(r => r.status === "En attente");

  return (
    <div>
      <PageHeader title="Tableau de bord" breadcrumb="VraiDeal Admin · Opérations" />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard icon={Inbox} accent="purple" label="Soumissions en attente"
            value={pendingSubs.length} sub="à examiner" to="/submissions" />
          <KPICard icon={ShoppingBag} accent="teal" label="Commandes actives"
            value={activeOrders.length} sub="en cours de traitement" to="/orders" />
          <KPICard icon={Banknote} accent="orange" label="Paiements à libérer"
            value={toRelease.length} sub={fcfa(releaseTotal)} to="/orders" />
          <KPICard icon={RefreshCcw} accent="red" label="Remboursements en attente"
            value={pendingRefunds.length} sub="à instruire" to="/refunds" />
        </div>

        {/* Alerts */}
        <div className="mt-6">
          <Card title="Alertes prioritaires">
            <div className="space-y-2">
              {alerts.map(a => (
                <AlertRow key={a.id} level={a.level} message={a.message} action={a.action}
                  countdown={a.deadline ? `Validation auto dans ` : undefined}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Tables */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Card title={`Soumissions en attente (${pendingSubs.length})`}
            action={<Link to="/submissions" className="text-xs text-primary hover:underline inline-flex items-center gap-1">Tout voir <ArrowRight size={12} /></Link>}>
            <div className="-mx-5 -mb-5 overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 text-left">Réf.</th>
                    <th className="px-3 py-2 text-left">Catégorie</th>
                    <th className="px-3 py-2 text-left hidden sm:table-cell">Vendeur</th>
                    <th className="px-3 py-2 text-left">Attente</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {pendingSubs.slice().sort((a, b) => a.submittedAt.localeCompare(b.submittedAt)).map(s => {
                    const v = findVendor(s.vendorId);
                    return (
                      <tr key={s.id} className="hover-row border-b border-border last:border-0">
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <img src={s.photos[0]} alt="" className="h-8 w-8 rounded object-cover" />
                            <span className="font-mono text-[11px]">{s.ref}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-muted-foreground">{s.category}</td>
                        <td className="px-3 py-2.5 hidden sm:table-cell">{v?.firstName}</td>
                        <td className="px-3 py-2.5 text-muted-foreground">{relTime(s.submittedAt)}</td>
                        <td className="px-3 py-2.5 text-right">
                          <Link to="/submissions/$id" params={{ id: s.id }} className="inline-flex h-7 items-center rounded border border-white/10 px-2 text-[11px] hover:border-primary/50 hover:text-primary">Examiner</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title={`Commandes actives (${activeOrders.length})`}
            action={<Link to="/orders" className="text-xs text-primary hover:underline inline-flex items-center gap-1">Tout voir <ArrowRight size={12} /></Link>}>
            <div className="-mx-5 -mb-5 overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="font-mono uppercase tracking-wider text-[10px] text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 text-left">N°</th>
                    <th className="px-3 py-2 text-left">Produit</th>
                    <th className="px-3 py-2 text-left hidden sm:table-cell">Acheteur</th>
                    <th className="px-3 py-2 text-left">Statut</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {activeOrders.slice(0, 6).map(o => {
                    const p = findProduct(o.productId);
                    return (
                      <tr key={o.id} className="hover-row border-b border-border last:border-0">
                        <td className="px-3 py-2.5 font-mono text-[11px]">{o.id}</td>
                        <td className="px-3 py-2.5 truncate max-w-[180px]">{p?.title}</td>
                        <td className="px-3 py-2.5 hidden sm:table-cell">{o.buyerFirstName}</td>
                        <td className="px-3 py-2.5"><StatusBadge status={o.status} /></td>
                        <td className="px-3 py-2.5 text-right">
                          <Link to="/orders/$id" params={{ id: o.id }} className="inline-flex h-7 items-center rounded border border-white/10 px-2 text-[11px] hover:border-primary/50 hover:text-primary">Gérer</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick stats footer */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="surface-1 rounded-lg border p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Produits publiés</div>
            <div className="mt-1 font-mono text-xl font-semibold">{products.filter(p => p.status === "Publié").length}</div>
          </div>
          <div className="surface-1 rounded-lg border p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Vendeurs actifs</div>
            <div className="mt-1 font-mono text-xl font-semibold">{vendors.filter(v => v.status === "Actif").length}</div>
          </div>
          <div className="surface-1 rounded-lg border p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">CA ce mois (mock)</div>
            <div className="mt-1 font-mono text-xl font-semibold">{fcfa(orders.reduce((s, o) => s + o.amount, 0))}</div>
          </div>
          <div className="surface-1 rounded-lg border p-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Maj.</div>
            <div className="mt-1 font-mono text-xs">{dateTime(new Date())}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
