import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Card } from "@/components/admin/ui";
import { finEvents, products } from "@/lib/mock";
import { fcfa, dateShort } from "@/lib/format";
import { FileDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/finance")({
  head: () => ({ meta: [{ title: "Finances · VraiDeal Admin" }] }),
  component: FinancePage,
});

const RANGES = ["7j", "30j", "Custom"] as const;
const CHART_COLORS = ["#4F7FFF", "#00D4AA", "#7C5CFC", "#FF6B2B", "#FFD60A"];

function FinancePage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("30j");
  const days = range === "7j" ? 7 : 30;

  const events = useMemo(() => {
    const cutoff = Date.now() - days * 86400000;
    return finEvents.filter(e => new Date(e.date).getTime() >= cutoff);
  }, [days]);

  const totals = useMemo(() => ({
    commission: events.filter(e => e.type === "Commission").reduce((s, e) => s + e.commission, 0),
    direct: events.filter(e => e.type === "Achat direct").reduce((s, e) => s + e.commission, 0),
    refund: events.filter(e => e.type === "Remboursement").reduce((s, e) => s + e.gross, 0),
  }), [events]);
  const net = totals.commission + totals.direct + totals.refund;

  const byCategory = useMemo(() => {
    const m = new Map<string, number>();
    events.filter(e => e.type === "Commission").forEach(e => {
      const cat = products.find(p => p.title === e.productTitle)?.category ?? "Autres";
      m.set(cat, (m.get(cat) ?? 0) + e.commission);
    });
    return Array.from(m, ([category, value]) => ({ category, value }));
  }, [events]);

  const daily = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      m.set(dateShort(d), 0);
    }
    events.forEach(e => {
      const k = dateShort(e.date);
      if (m.has(k)) m.set(k, (m.get(k) ?? 0) + e.net);
    });
    return Array.from(m, ([date, value]) => ({ date: date.split(" ").slice(0, 2).join(" "), value }));
  }, [events, days]);

  const breakdown = [
    { name: "Commissions", value: totals.commission },
    { name: "Achats directs", value: totals.direct },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard financier"
        breadcrumb="Opérations · Finances"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-md surface-1 border border-white/10 p-0.5">
              {RANGES.map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`rounded px-3 py-1 text-[11px] ${range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{r}</button>
              ))}
            </div>
            <button onClick={() => toast.success("Export CSV (mock).")}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/10 px-3 text-xs hover:border-primary/40 hover:text-primary"><FileDown size={14} /> CSV</button>
            <button onClick={() => toast.success("Export PDF (mock).")}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-white/10 px-3 text-xs hover:border-primary/40 hover:text-primary"><FileDown size={14} /> PDF</button>
          </div>
        }
      />
      <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <KPI label="Total commissions" value={fcfa(totals.commission)} accent="text-blue" />
          <KPI label="Revenus achats directs" value={fcfa(totals.direct)} accent="text-purple" />
          <KPI label="Remboursements" value={fcfa(Math.abs(totals.refund))} accent="text-red" />
          <KPI label="Marge nette" value={fcfa(net)} accent={net >= 0 ? "text-teal" : "text-red"} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Commissions par catégorie">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={byCategory}>
                <CartesianGrid stroke="#21253A" strokeDasharray="3 3" />
                <XAxis dataKey="category" stroke="#7a7f95" fontSize={10} />
                <YAxis stroke="#7a7f95" fontSize={10} tickFormatter={v => `${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={{ background: "#21253A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }} formatter={(v: number) => fcfa(v)} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {byCategory.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Évolution quotidienne">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={daily}>
                <CartesianGrid stroke="#21253A" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#7a7f95" fontSize={10} interval={Math.floor(daily.length / 7)} />
                <YAxis stroke="#7a7f95" fontSize={10} tickFormatter={v => `${Math.round(v / 1000)}k`} />
                <Tooltip contentStyle={{ background: "#21253A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }} formatter={(v: number) => fcfa(v)} />
                <Line type="monotone" dataKey="value" stroke="#4F7FFF" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Répartition revenus">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={breakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {breakdown.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#21253A", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12 }} formatter={(v: number) => fcfa(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex justify-center gap-4 text-xs">
              {breakdown.map((b, i) => (
                <div key={b.name} className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  {b.name}
                </div>
              ))}
            </div>
          </Card>

          <Card title="Top vendeurs (commissions générées)">
            <ul className="space-y-2 text-xs">
              {Object.entries(events.filter(e => e.type === "Commission").reduce<Record<string, number>>((acc, e) => {
                acc[e.vendorFirstName] = (acc[e.vendorFirstName] ?? 0) + e.commission;
                return acc;
              }, {})).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, val], i) => (
                <li key={name} className="flex items-center justify-between rounded surface-2 border border-white/5 px-3 py-2">
                  <span className="inline-flex items-center gap-2"><span className="font-mono text-[10px] text-muted-foreground">#{i + 1}</span>{name}</span>
                  <span className="font-mono text-teal">{fcfa(val)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Card title={`Transactions (${events.length})`}>
          <div className="-mx-5 -mb-5 overflow-x-auto">
            <table className="w-full text-xs whitespace-nowrap">
              <thead className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Produit</th>
                  <th className="px-3 py-2 text-left hidden md:table-cell">Vendeur</th>
                  <th className="px-3 py-2 text-right">Brut</th>
                  <th className="px-3 py-2 text-right">Commission</th>
                  <th className="px-3 py-2 text-right">Net</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 40).map((e, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-3 py-2 font-mono text-[11px] text-muted-foreground">{dateShort(e.date)}</td>
                    <td className="px-3 py-2">{e.type}</td>
                    <td className="px-3 py-2 max-w-[220px] truncate">{e.productTitle}</td>
                    <td className="px-3 py-2 hidden md:table-cell">{e.vendorFirstName}</td>
                    <td className="px-3 py-2 text-right font-mono">{fcfa(e.gross)}</td>
                    <td className="px-3 py-2 text-right font-mono text-blue">{fcfa(e.commission)}</td>
                    <td className={`px-3 py-2 text-right font-mono ${e.net >= 0 ? "text-teal" : "text-red"}`}>{fcfa(e.net)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function KPI({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="surface-1 rounded-lg border p-4">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono text-xl font-semibold ${accent ?? ""}`}>{value}</div>
    </div>
  );
}
