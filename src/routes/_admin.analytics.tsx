import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/admin/ui";
import { orders, products, submissions, refunds, findProduct } from "@/lib/mock";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics · VraiDeal Admin" }] }),
  component: Analytics,
});

const COLORS = ["#4F7FFF", "#00D4AA", "#7C5CFC", "#FF6B2B", "#FFD60A"];

function Analytics() {
  // Top 5 categories by sold count
  const soldByCat = new Map<string, number>();
  orders.filter(o => o.status === "Terminée").forEach(o => {
    const p = findProduct(o.productId);
    if (p) soldByCat.set(p.category, (soldByCat.get(p.category) ?? 0) + 1);
  });
  products.filter(p => p.status === "Vendu").forEach(p => soldByCat.set(p.category, (soldByCat.get(p.category) ?? 0) + 1));
  const topCats = Array.from(soldByCat, ([category, value]) => ({ category, value })).sort((a, b) => b.value - a.value).slice(0, 5);

  // Avg sale delay (days) by category — synthetic
  const delayByCat = Array.from(new Set(products.map(p => p.category))).map(category => ({
    category, value: Math.round(3 + Math.random() * 18),
  })).slice(0, 6);

  // Acceptance rate
  const total = submissions.length;
  const accepted = submissions.filter(s => s.status === "Accepté").length;
  const refused = submissions.filter(s => s.status === "Refusé").length;
  const acceptanceRate = total ? Math.round((accepted / Math.max(accepted + refused, 1)) * 100) : 0;

  // Top refusal reasons (mock)
  const refusalReasons = [
    { reason: "Photos insuffisantes", value: 12 },
    { reason: "Prix irréaliste", value: 8 },
    { reason: "État incohérent", value: 5 },
    { reason: "Preuve manquante", value: 3 },
    { reason: "Catégorie non acceptée", value: 2 },
  ];

  // Refund rate
  const refundRate = orders.length ? Math.round((refunds.length / orders.length) * 100) : 0;

  // Conversion (views → orders) mock
  const conversion = 4.2;

  return (
    <div>
      <PageHeader title="Analytics" breadcrumb="Opérations · Analytics" />
      <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KPI label="Taux acceptation" value={`${acceptanceRate}%`} accent="text-teal" />
          <KPI label="Taux remboursement" value={`${refundRate}%`} accent="text-red" />
          <KPI label="Conversion vues → cmd." value={`${conversion}%`} accent="text-blue" />
          <KPI label="Catégories actives" value={String(soldByCat.size)} accent="text-purple" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Top 5 catégories vendues">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={topCats} layout="vertical">
                <CartesianGrid stroke="#21253A" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#7a7f95" fontSize={10} />
                <YAxis type="category" dataKey="category" stroke="#7a7f95" fontSize={10} width={100} />
                <Tooltip contentStyle={{ background: "#21253A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {topCats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Délai moyen de vente (jours)">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={delayByCat}>
                <CartesianGrid stroke="#21253A" strokeDasharray="3 3" />
                <XAxis dataKey="category" stroke="#7a7f95" fontSize={10} />
                <YAxis stroke="#7a7f95" fontSize={10} />
                <Tooltip contentStyle={{ background: "#21253A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }} />
                <Bar dataKey="value" fill="#00D4AA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Top motifs de refus">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={refusalReasons} layout="vertical">
                <CartesianGrid stroke="#21253A" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#7a7f95" fontSize={10} />
                <YAxis type="category" dataKey="reason" stroke="#7a7f95" fontSize={10} width={150} />
                <Tooltip contentStyle={{ background: "#21253A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }} />
                <Bar dataKey="value" fill="#FF3355" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Indicateurs clés">
            <dl className="space-y-3 text-sm">
              <Row label="Soumissions totales" value={String(total)} />
              <Row label="Acceptées" value={String(accepted)} accent="text-teal" />
              <Row label="Refusées" value={String(refused)} accent="text-red" />
              <Row label="Commandes traitées" value={String(orders.length)} />
              <Row label="Remboursements (tous statuts)" value={String(refunds.length)} accent="text-orange" />
              <Row label="Produits publiés" value={String(products.filter(p => p.status === "Publié").length)} accent="text-blue" />
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="surface-1 rounded-lg border p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono text-2xl font-semibold ${accent ?? ""}`}>{value}</div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex justify-between border-b border-border pb-2 last:border-0 last:pb-0">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className={`font-mono ${accent ?? ""}`}>{value}</dd>
    </div>
  );
}
