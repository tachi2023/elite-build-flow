import { createFileRoute, Link } from "@tanstack/react-router";
import { Wallet, TrendingUp, TrendingDown, Briefcase, ArrowUpRight, Plus, Bell } from "lucide-react";
import { fcfa, marginColor, pct } from "@/lib/format";
import { projects, totals, expenses, leads } from "@/lib/mock";
import { StatCard, SectionHeader, StatusBadge } from "@/components/ui-bits";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, PieChart, Pie } from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const revenueData = [
  { m: "Jan", revenu: 4200000, depense: 2800000 },
  { m: "Fév", revenu: 5800000, depense: 3400000 },
  { m: "Mar", revenu: 7100000, depense: 4200000 },
  { m: "Avr", revenu: 9800000, depense: 5900000 },
  { m: "Mai", revenu: 13400000, depense: 7800000 },
];
const catData = [
  { name: "BA13", value: 1850000 },
  { name: "Profilés", value: 720000 },
  { name: "Main d'œuvre", value: 1320000 },
  { name: "Peinture", value: 480000 },
  { name: "Transport", value: 280000 },
];
const COLORS = ["#C9A84C", "#4CAF7D", "#E0B84C", "#E05555", "#7AA0C8"];

function Dashboard() {
  const t = totals();
  const active = projects.filter(p => p.status === "active").length;
  const newLeads = leads.filter(l => l.status === "new").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Bonsoir, Bruno."
        subtitle="Voici l'état de vos chantiers et finances aujourd'hui."
        action={
          <div className="flex flex-wrap gap-2">
            <button className="hidden lg:inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm hover:border-gold/40">
              <Bell size={14} /> {newLeads} nouvelle{newLeads>1?"s":""} demande{newLeads>1?"s":""}
            </button>
            <Link to="/app/projects" className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background">
              <Plus size={14} /> Nouveau projet
            </Link>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Chantiers actifs" value={active} hint={`${projects.length} au total`} icon={Briefcase} />
        <StatCard label="Revenus encaissés" value={fcfa(t.revenue)} hint="Cumulé" icon={Wallet} accent="success" />
        <StatCard label="Dépenses" value={fcfa(t.expenses)} icon={TrendingDown} accent="destructive" />
        <StatCard label="Marge nette" value={pct(t.margin)} hint={fcfa(t.profit)} icon={TrendingUp}
          accent={t.margin >= 20 ? "success" : t.margin >= 5 ? "warning" : "destructive"} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Revenus vs Dépenses</h2>
              <p className="text-xs text-muted-foreground">Évolution sur 5 mois (FCFA)</p>
            </div>
            <span className={`text-xs ${marginColor(t.margin)}`}>+{pct(t.margin)} marge</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E05555" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#E05555" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="m" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip contentStyle={{ background: "#272727", border: "1px solid rgba(201,168,76,.3)", borderRadius: 8 }} formatter={(v: number) => fcfa(v)} />
                <Area type="monotone" dataKey="revenu" stroke="#C9A84C" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="depense" stroke="#E05555" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <h2 className="font-display text-lg font-semibold">Répartition dépenses</h2>
          <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={catData} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {catData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#272727", border: "1px solid rgba(201,168,76,.3)", borderRadius: 8 }} formatter={(v: number) => fcfa(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {catData.map((c, i) => (
              <li key={c.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{background: COLORS[i]}} /> {c.name}</span>
                <span className="text-muted-foreground">{fcfa(c.value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Chantiers actifs</h2>
            <Link to="/app/projects" className="text-xs text-gold hover:underline">Voir tout →</Link>
          </div>
          <ul className="divide-y divide-border">
            {projects.filter(p => p.status === "active").map(p => {
              const progress = Math.min(100, Math.round((p.expenses / p.amount) * 100));
              return (
                <li key={p.id}>
                  <Link to="/app/projects/$id" params={{ id: p.id }} className="flex items-center gap-4 py-4 hover:bg-surface/50 -mx-2 px-2 rounded-md">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-medium">{p.client}</p>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.type} · {p.city}</p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full gold-gradient" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="font-semibold">{fcfa(p.amount)}</p>
                      <p className="text-xs text-muted-foreground">{progress}% dépensé</p>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Dépenses récentes</h2>
          <ul className="space-y-3">
            {expenses.slice(0, 5).map(e => (
              <li key={e.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.category}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.notes}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-destructive">-{fcfa(e.amount)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* unused import guard */}
      <BarChart data={[]} className="hidden" />
    </div>
  );
}
