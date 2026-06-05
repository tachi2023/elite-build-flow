import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, Circle, MapPin, Download, Eye, Share2, Image as ImageIcon, FileText, Wallet,
  MessageSquare, CheckCircle2, X, Calendar, ChevronLeft,
} from "lucide-react";
import { fcfa } from "@/lib/format";
import { clientProjects, clientDocuments, payments, messages, approvals, statusLabel } from "@/lib/client-mock";

export const Route = createFileRoute("/client/projects/$id")({
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl">Projet introuvable</h1>
      <Link to="/client/projects" className="mt-4 inline-block text-gold hover:underline">← Retour à mes projets</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl">Erreur</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  loader: ({ params }) => {
    const project = clientProjects.find(p => p.id === params.id);
    if (!project) throw notFound();
    return { project };
  },
});

type Tab = "timeline" | "gallery" | "documents" | "approvals" | "payments" | "messages";
const tabs: { key: Tab; label: string; icon: typeof Check }[] = [
  { key: "timeline", label: "Suivi", icon: CheckCircle2 },
  { key: "gallery", label: "Galerie", icon: ImageIcon },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "approvals", label: "Approbations", icon: Check },
  { key: "payments", label: "Paiements", icon: Wallet },
  { key: "messages", label: "Échanges", icon: MessageSquare },
];

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("timeline");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [compare, setCompare] = useState(false);

  const docs = clientDocuments.filter(d => d.projectId === project.id);
  const pays = payments.filter(p => p.projectId === project.id);
  const msgs = messages.filter(m => m.projectId === project.id);
  const apps = approvals.filter(a => a.projectId === project.id);

  const before = project.gallery.find(g => g.phase === "before");
  const after = [...project.gallery].reverse().find(g => g.phase !== "before");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Link to="/client/projects" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold">
        <ChevronLeft size={14} /> Retour à mes projets
      </Link>

      <div className="card-elevated overflow-hidden rounded-2xl">
        <div className="relative h-56 sm:h-72">
          <img src={project.cover} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <p className="text-[10px] uppercase tracking-widest text-gold">{project.reference} · {statusLabel[project.status]}</p>
            <h1 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">{project.title}</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} /> {project.address}
            </p>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border p-5 sm:grid-cols-4">
          <KV label="Avancement" value={`${project.progress}%`} accent />
          <KV label="Fin estimée" value={project.estimatedEnd} />
          <KV label="Montant total" value={fcfa(project.amount)} />
          <KV label="Payé" value={fcfa(project.paid)} success />
        </div>

        <div className="overflow-x-auto border-t border-border">
          <div className="flex min-w-max">
            {tabs.map(t => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition ${
                    active ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={14} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-7">
          {tab === "timeline" && (
            <ol className="space-y-5">
              {project.timeline.map((step, i) => (
                <li key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`grid h-9 w-9 place-items-center rounded-full border ${
                      step.current ? "gold-gradient text-background border-transparent" :
                      step.done ? "bg-success/20 border-success/40 text-success" :
                      "bg-surface border-border text-muted-foreground"
                    }`}>
                      {step.done ? <Check size={16} /> : <Circle size={12} />}
                    </div>
                    {i < project.timeline.length - 1 && (
                      <div className={`h-10 w-px ${step.done ? "bg-gold/40" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="-mt-0.5 flex-1 pb-2">
                    <p className={`font-medium ${step.current ? "text-gold" : ""}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.date ?? "À venir"}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {tab === "gallery" && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2 text-xs">
                  {(["before", "progress", "after"] as const).map(ph => (
                    <span key={ph} className="rounded-full border border-border bg-surface px-2.5 py-1 capitalize">
                      {ph === "before" ? "Avant" : ph === "progress" ? "Pendant" : "Après"}
                    </span>
                  ))}
                </div>
                {before && after && (
                  <button onClick={() => setCompare(c => !c)} className="rounded-md hairline-gold px-3 py-1.5 text-xs text-gold">
                    {compare ? "Vue galerie" : "Comparer avant / après"}
                  </button>
                )}
              </div>
              {compare && before && after ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Figure label="Avant" img={before.url} caption={before.caption} />
                  <Figure label="Pendant / Après" img={after.url} caption={after.caption} />
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.gallery.map(g => (
                    <button key={g.id} onClick={() => setLightbox(g.url)} className="group relative overflow-hidden rounded-lg">
                      <img src={g.url} alt={g.caption} className="h-44 w-full object-cover transition group-hover:scale-105" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 text-left">
                        <p className="text-xs font-medium">{g.caption}</p>
                        <p className="text-[10px] text-muted-foreground">{g.date} · {g.phase}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "documents" && (
            <ul className="divide-y divide-border">
              {docs.map(d => (
                <li key={d.id} className="flex items-center gap-3 py-3">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-gold-soft text-gold">
                    <FileText size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.type} · {d.date} · {d.size}</p>
                  </div>
                  <div className="flex gap-1">
                    <IconBtn icon={Eye} />
                    <IconBtn icon={Download} />
                    <IconBtn icon={Share2} />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === "approvals" && (
            <ul className="space-y-3">
              {apps.map(a => (
                <li key={a.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium">{a.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.description}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Demandé : {a.requestedAt}</p>
                    </div>
                    {a.amount !== undefined && (
                      <span className="shrink-0 font-display text-lg text-gold">{fcfa(a.amount)}</span>
                    )}
                  </div>
                  {a.status === "pending" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-1 rounded-md gold-gradient px-3 py-1.5 text-xs font-semibold text-background"><Check size={12}/> Approuver</button>
                      <button className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs">Demander une modification</button>
                      <button className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-3 py-1.5 text-xs text-destructive"><X size={12}/> Refuser</button>
                    </div>
                  )}
                  {a.status !== "pending" && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Statut : <span className="text-foreground capitalize">
                        {a.status === "approved" ? "Approuvé" : a.status === "rejected" ? "Refusé" : "Modification demandée"}
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}

          {tab === "payments" && (
            <ul className="divide-y divide-border">
              {pays.map(p => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <div className={`grid h-10 w-10 place-items-center rounded-md ${
                    p.status === "paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                  }`}>
                    <Wallet size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{p.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.status === "paid" ? `${p.date} · ${p.method}` : `Échéance ${p.dueDate} · ${p.method}`}
                    </p>
                  </div>
                  <span className={`shrink-0 font-display text-base ${p.status === "paid" ? "text-success" : "text-gold"}`}>{fcfa(p.amount)}</span>
                </li>
              ))}
            </ul>
          )}

          {tab === "messages" && (
            <div className="space-y-3">
              {msgs.map(m => (
                <div key={m.id} className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "client" ? "gold-gradient text-background" : "bg-surface border border-border"
                  }`}>
                    <p className="text-[10px] uppercase tracking-widest opacity-70">{m.author} · {m.time}</p>
                    <p className="mt-1">{m.text}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex gap-2 border-t border-border pt-3">
                <input placeholder="Écrire un message..." className="flex-1 rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold" />
                <button className="rounded-md gold-gradient px-4 text-sm font-semibold text-background">Envoyer</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-full rounded-xl" />
        </div>
      )}

      {/* swallow unused-imports */}
      <span className="hidden"><Calendar size={0} /></span>
    </div>
  );
}

function KV({ label, value, accent, success }: { label: string; value: string; accent?: boolean; success?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-lg ${accent ? "text-gold" : success ? "text-success" : ""}`}>{value}</p>
    </div>
  );
}

function Figure({ label, img, caption }: { label: string; img: string; caption: string }) {
  return (
    <figure>
      <div className="relative overflow-hidden rounded-lg">
        <img src={img} alt={label} className="h-64 w-full object-cover" />
        <span className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-gold backdrop-blur">{label}</span>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function IconBtn({ icon: Icon }: { icon: typeof Eye }) {
  return (
    <button className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-gold hover:border-gold/40">
      <Icon size={14} />
    </button>
  );
}
