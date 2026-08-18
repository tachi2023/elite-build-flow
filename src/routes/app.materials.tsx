import { createFileRoute } from "@tanstack/react-router";
import { Pencil, History } from "lucide-react";
import { materials } from "@/lib/mock";
import { fcfa } from "@/lib/format";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/materials")({
  component: MaterialsPage,
});

function MaterialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Prix des matériaux" subtitle="Configuration utilisée par le calculateur. Historique conservé." />
      <div className="card-elevated overflow-x-auto rounded-xl">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr><th className="p-4">Matériau</th><th>Unité</th><th className="text-right">Prix</th><th>Mis à jour</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {materials.map(m => (
              <tr key={m.id} className="hover:bg-surface/50">
                <td className="p-4 font-medium">{m.name}</td>
                <td className="text-muted-foreground">{m.unit}</td>
                <td className="text-right font-semibold text-gold">{fcfa(m.price)}</td>
                <td className="text-muted-foreground">{m.updated}</td>
                <td className="p-4 text-right">
                  <div className="inline-flex gap-1">
                    <button className="rounded-md border border-border bg-surface p-2 text-xs hover:border-gold/50" aria-label="Modifier"><Pencil size={14}/></button>
                    <button className="rounded-md border border-border bg-surface p-2 text-xs hover:border-gold/50" aria-label="Historique"><History size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
