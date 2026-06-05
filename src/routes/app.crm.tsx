import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { leads, type Lead } from "@/lib/mock";
import { SectionHeader, StatusBadge } from "@/components/ui-bits";

export const Route = createFileRoute("/app/crm")({
  component: Crm,
});

const cols: { k: Lead["status"]; label: string }[] = [
  { k: "new", label: "Nouveau" },
  { k: "contacted", label: "Contacté" },
  { k: "visit", label: "Visite planifiée" },
  { k: "quoted", label: "Devis envoyé" },
  { k: "won", label: "Gagné" },
  { k: "lost", label: "Perdu" },
];

function Crm() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="CRM — Demandes de devis" subtitle="Pipeline commercial issu du site web et autres sources." />
      <div className="grid gap-4 overflow-x-auto pb-4" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(260px, 1fr))` }}>
        {cols.map(c => {
          const items = leads.filter(l => l.status === c.k);
          return (
            <div key={c.k} className="rounded-xl border border-border bg-surface/40 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{c.label}</h3>
                <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-semibold text-gold">{items.length}</span>
              </div>
              <ul className="space-y-3">
                {items.map(l => (
                  <li key={l.id} className="card-elevated rounded-lg p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-sm">{l.name}</p>
                      <StatusBadge status={l.status} />
                    </div>
                    <p className="mt-1 text-xs text-gold">{l.type}</p>
                    <ul className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                      <li className="flex items-center gap-1.5"><Phone size={10}/> {l.phone}</li>
                      <li className="flex items-center gap-1.5"><Mail size={10}/> {l.email}</li>
                      <li className="flex items-center gap-1.5"><MapPin size={10}/> {l.city}</li>
                    </ul>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{l.source} · {l.createdAt}</p>
                  </li>
                ))}
                {items.length === 0 && <li className="rounded-md border border-dashed border-border p-4 text-center text-[11px] text-muted-foreground">Aucune demande</li>}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
