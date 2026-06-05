import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, FileText, HardHat, Ruler, Package, Wallet } from "lucide-react";
import { projects, expenses, incomes, workers } from "@/lib/mock";
import { fcfa, marginColor, pct } from "@/lib/format";
import { StatusBadge, StatCard } from "@/components/ui-bits";

export const Route = createFileRoute("/app/projects/$id")({
  loader: ({ params }) => {
    const p = projects.find(x => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  component: ProjectDetail,
  notFoundComponent: () => <div className="p-10 text-center text-muted-foreground">Projet introuvable.</div>,
});

const tabs = [
  { k: "overview", label: "Vue d'ensemble" },
  { k: "finance", label: "Financier" },
  { k: "materials", label: "Matériaux" },
  { k: "workers", label: "Ouvriers" },
  { k: "measurements", label: "Métrés" },
  { k: "documents", label: "Documents" },
] as const;

function ProjectDetail() {
  const p = Route.useLoaderData();
  const [tab, setTab] = useState<typeof tabs[number]["k"]>("overview");
  const projExpenses = expenses.filter(e => e.projectId === p.id);
  const projIncomes = incomes.filter(i => i.projectId === p.id);
  const received = projIncomes.reduce((s, i) => s + i.amount, 0);
  const profit = p.amount - p.expenses;
  const margin = p.amount > 0 ? (profit / p.amount) * 100 : 0;
  const assignedWorkers = workers.filter(w => w.projectId === p.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Link to="/app/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft size={14} /> Tous les projets
      </Link>

      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold">{p.id}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{p.client}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{p.type}</p>
        </div>
        <StatusBadge status={p.status} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Contrat" value={fcfa(p.amount)} icon={Wallet} />
        <StatCard label="Encaissé" value={fcfa(received)} hint={`${Math.round(received/p.amount*100)}% du contrat`} accent="success" />
        <StatCard label="Dépenses" value={fcfa(p.expenses)} accent="destructive" />
        <StatCard label="Marge" value={pct(margin)} hint={fcfa(profit)} accent={margin>=20?"success":margin>=5?"warning":"destructive"} />
      </div>

      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              tab===t.k ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>{t.label}</button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-elevated rounded-xl p-5 lg:col-span-2">
              <h2 className="font-display text-lg font-semibold">Description</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Info icon={Calendar} label="Démarrage" value={new Date(p.startDate).toLocaleDateString("fr-FR")} />
                <Info icon={Calendar} label="Livraison estimée" value={new Date(p.endDate).toLocaleDateString("fr-FR")} />
                <Info icon={MapPin} label="Ville" value={p.city} />
                <Info icon={HardHat} label="Type" value={p.type} />
              </div>
            </div>
            <div className="card-elevated rounded-xl p-5">
              <h2 className="font-display text-lg font-semibold">Contact client</h2>
              <ul className="mt-4 space-y-3">
                <Info icon={Phone} label="Téléphone" value={p.phone} />
                <Info icon={Mail} label="Email" value={p.email} />
                <Info icon={MapPin} label="Ville" value={p.city} />
              </ul>
              <a href={`https://wa.me/${p.phone.replace(/\D/g,"")}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient py-2.5 text-sm font-semibold text-background">
                <Phone size={14}/> Contacter via WhatsApp
              </a>
            </div>
          </div>
        )}

        {tab === "finance" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-elevated rounded-xl p-5">
              <h2 className="font-display text-lg font-semibold">Paiements reçus</h2>
              <ul className="mt-4 divide-y divide-border">
                {projIncomes.length === 0 && <li className="py-4 text-sm text-muted-foreground">Aucun paiement enregistré.</li>}
                {projIncomes.map(i => (
                  <li key={i.id} className="flex items-center justify-between py-3">
                    <div><p className="text-sm font-medium">{i.type}</p><p className="text-xs text-muted-foreground">{i.notes} · {i.date}</p></div>
                    <p className="text-sm font-semibold text-success">+{fcfa(i.amount)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated rounded-xl p-5">
              <h2 className="font-display text-lg font-semibold">Dépenses</h2>
              <ul className="mt-4 divide-y divide-border">
                {projExpenses.map(e => (
                  <li key={e.id} className="flex items-center justify-between py-3">
                    <div><p className="text-sm font-medium">{e.category}</p><p className="text-xs text-muted-foreground">{e.notes} · {e.date}</p></div>
                    <p className="text-sm font-semibold text-destructive">-{fcfa(e.amount)}</p>
                  </li>
                ))}
                {projExpenses.length===0 && <li className="py-4 text-sm text-muted-foreground">Aucune dépense.</li>}
              </ul>
            </div>
          </div>
        )}

        {tab === "workers" && (
          <div className="card-elevated rounded-xl p-5">
            <h2 className="mb-4 font-display text-lg font-semibold">Ouvriers assignés</h2>
            <ul className="divide-y divide-border">
              {assignedWorkers.map(w => (
                <li key={w.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft text-gold font-semibold">{w.name.split(" ").map(n=>n[0]).join("")}</span>
                    <div><p className="text-sm font-medium">{w.name}</p><p className="text-xs text-muted-foreground">{w.role} · {w.daysThisMonth}j ce mois</p></div>
                  </div>
                  <p className="text-sm font-semibold">{fcfa(w.dailyRate)}/j</p>
                </li>
              ))}
              {assignedWorkers.length===0 && <li className="py-4 text-sm text-muted-foreground">Aucun ouvrier assigné.</li>}
            </ul>
          </div>
        )}

        {tab === "materials" && (
          <EmptyTab icon={Package} label="Liste de matériaux à venir" />
        )}
        {tab === "measurements" && (
          <EmptyTab icon={Ruler} label="Aucun métré enregistré pour ce chantier" />
        )}
        {tab === "documents" && (
          <EmptyTab icon={FileText} label="Aucun document associé" />
        )}
      </div>
      <span className={marginColor(margin)} aria-hidden />
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <Icon size={14} className="mt-0.5 text-gold" />
      <div><p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p><p className="text-sm">{value}</p></div>
    </li>
  );
}
function EmptyTab({ icon: Icon, label }: { icon: typeof Package; label: string }) {
  return (
    <div className="card-elevated rounded-xl p-12 text-center">
      <Icon size={32} className="mx-auto text-muted-foreground" />
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
