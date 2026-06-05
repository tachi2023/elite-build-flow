import { createFileRoute } from "@tanstack/react-router";
import { FileText, Image as ImageIcon, FileCheck, Upload, Download, Share2 } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/documents")({
  component: Documents,
});

const docs = [
  { id: "d1", name: "Contrat — Résidence Mbeng.pdf", type: "Contrat", project: "P-2410", size: "1.4 Mo", date: "12 avr 2026", icon: FileCheck },
  { id: "d2", name: "Photos chantier — Akwa.zip", type: "Photos", project: "P-2411", size: "82 Mo", date: "27 mai 2026", icon: ImageIcon },
  { id: "d3", name: "Devis — Famille Ndongo.pdf", type: "Devis", project: "L-04", size: "640 Ko", date: "20 mai 2026", icon: FileText },
  { id: "d4", name: "Facture — Pharmacie Bonanjo.pdf", type: "Facture", project: "P-2398", size: "210 Ko", date: "01 mars 2026", icon: FileText },
  { id: "d5", name: "Métré — Villa Eyenga.pdf", type: "Métré", project: "P-2412", size: "1.1 Mo", date: "30 juin 2026", icon: FileText },
];

function Documents() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Documents"
        subtitle="Contrats, factures, photos, métrés."
        action={
          <button className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background">
            <Upload size={14}/> Téléverser
          </button>
        }
      />
      <ul className="grid gap-3">
        {docs.map(d => (
          <li key={d.id} className="card-elevated flex items-center gap-4 rounded-xl p-4">
            <span className="grid h-11 w-11 place-items-center rounded-md bg-gold-soft text-gold"><d.icon size={18}/></span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.type} · {d.project} · {d.size} · {d.date}</p>
            </div>
            <div className="hidden sm:flex gap-1">
              <button className="rounded-md border border-border bg-surface p-2 text-xs" aria-label="Télécharger"><Download size={14}/></button>
              <button className="rounded-md border border-border bg-surface p-2 text-xs" aria-label="Partager"><Share2 size={14}/></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
