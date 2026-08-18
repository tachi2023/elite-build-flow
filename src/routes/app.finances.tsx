import { createFileRoute } from "@tanstack/react-router";
import { Plus, Receipt, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { incomes, expenses, expenseCategories, projects, totals } from "@/lib/mock";
import { fcfa, marginColor, pct } from "@/lib/format";
import { SectionHeader, StatCard } from "@/components/ui-bits";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/finances")({
  component: Finances,
});

function Finances() {
  const t = totals();
  const byCat = expenseCategories.map(c => ({
    cat: c, amount: expenses.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0),
  })).filter(x => x.amount > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Finances"
        subtitle="Encaissements, dépenses et rentabilité."
        action={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"><Plus size={14}/> Paiement</button>
            <button className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background"><Plus size={14}/> Dépense</button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total revenus" value={fcfa(t.revenue)} icon={ArrowUpCircle} accent="success" />
        <StatCard label="Total dépenses" value={fcfa(t.expenses)} icon={ArrowDownCircle} accent="destructive" />
        <StatCard label="Bénéfice net" value={fcfa(t.profit)} accent={t.margin>=20?"success":t.margin>=5?"warning":"destructive"} />
        <StatCard label="Marge" value={pct(t.margin)} accent={t.margin>=20?"success":t.margin>=5?"warning":"destructive"} />
      </div>

      <div className="mt-8 card-elevated rounded-xl p-5">
        <h2 className="font-display text-lg font-semibold">Dépenses par catégorie</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={byCat} margin={{ left: 4, right: 12, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
              <XAxis dataKey="cat" stroke="rgba(255,255,255,.4)" fontSize={10} angle={-12} dy={4} />
              <YAxis stroke="rgba(255,255,255,.4)" fontSize={10} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#272727", border: "1px solid rgba(201,168,76,.3)", borderRadius: 8 }} formatter={(v: number) => fcfa(v)} />
              <Bar dataKey="amount" fill="#C9A84C" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-elevated rounded-xl p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Paiements reçus</h2>
          <ul className="divide-y divide-border">
            {incomes.map(i => {
              const pr = projects.find(p => p.id === i.projectId);
              return (
                <li key={i.id} className="flex items-center gap-3 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-success/15 text-success"><ArrowUpCircle size={16}/></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{i.type}</p>
                    <p className="truncate text-xs text-muted-foreground">{pr?.client} · {i.date}</p>
                  </div>
                  <p className="text-sm font-semibold text-success">+{fcfa(i.amount)}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="card-elevated rounded-xl p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Dépenses récentes</h2>
          <ul className="divide-y divide-border">
            {expenses.map(e => {
              const pr = projects.find(p => p.id === e.projectId);
              return (
                <li key={e.id} className="flex items-center gap-3 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-destructive/15 text-destructive"><Receipt size={16}/></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{e.category}</p>
                    <p className="truncate text-xs text-muted-foreground">{pr?.client} · {e.date} · {e.notes}</p>
                  </div>
                  <p className="text-sm font-semibold text-destructive">-{fcfa(e.amount)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <span className={marginColor(t.margin)} aria-hidden />
    </div>
  );
}
