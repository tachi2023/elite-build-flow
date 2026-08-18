import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator as Calc, Download, Share2 } from "lucide-react";
import { materials } from "@/lib/mock";
import { fcfa } from "@/lib/format";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/calculator")({
  component: CalculatorPage,
});

function CalculatorPage() {
  const [surface, setSurface] = useState(50);
  const [system, setSystem] = useState<"cornfourrure" | "railsmontants">("cornfourrure");

  const result = useMemo(() => {
    const waste = 1.15;
    const ba13 = Math.ceil((surface / 3) * waste); // ~3m² per plate
    const rails = Math.ceil(surface * 0.8 * waste);
    const fourrures = system === "cornfourrure" ? Math.ceil(surface * 1.5 * waste) : 0;
    const montants = system === "railsmontants" ? Math.ceil(surface * 1.2 * waste) : 0;
    const cornieres = Math.ceil(Math.sqrt(surface) * 4 * waste);
    const visBox = Math.ceil(ba13 / 8);
    const bande = Math.ceil(surface / 25);
    const enduit = Math.ceil(surface / 18);

    const lines = [
      { name: "Plaque BA13 standard", qty: ba13, unit: "plaque", price: materials.find(m=>m.id==="M-01")!.price },
      ...(system === "cornfourrure" ? [
        { name: "Fourrure F47", qty: fourrures, unit: "ml", price: materials.find(m=>m.id==="M-05")!.price },
        { name: "Cornière 25x25", qty: cornieres, unit: "ml", price: materials.find(m=>m.id==="M-06")!.price },
      ] : [
        { name: "Rail R48", qty: rails, unit: "ml", price: materials.find(m=>m.id==="M-03")!.price },
        { name: "Montant M48", qty: montants, unit: "ml", price: materials.find(m=>m.id==="M-04")!.price },
      ]),
      { name: "Vis TTPC (boîte)", qty: visBox, unit: "boîte", price: materials.find(m=>m.id==="M-07")!.price },
      { name: "Bande à joint", qty: bande, unit: "rouleau", price: materials.find(m=>m.id==="M-08")!.price },
      { name: "Enduit joint 25kg", qty: enduit, unit: "sac", price: materials.find(m=>m.id==="M-09")!.price },
    ];
    const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return { lines, total };
  }, [surface, system]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Calculateur de matériaux" subtitle="Estimez les fournitures et le budget pour un chantier." />

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="card-elevated rounded-xl p-5 space-y-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Surface (m²)</label>
            <input type="number" value={surface} onChange={e=>setSurface(Number(e.target.value)||0)}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-2xl font-display font-semibold focus:border-gold outline-none" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Système</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { k: "cornfourrure", l: "Cornière + Fourrure" },
                { k: "railsmontants", l: "Rails + Montants" },
              ].map(o => (
                <button key={o.k} onClick={()=>setSystem(o.k as "cornfourrure" | "railsmontants")}
                  className={`rounded-md border px-3 py-3 text-xs font-medium transition ${system===o.k?"border-gold bg-gold-soft text-gold":"border-border bg-surface text-muted-foreground"}`}>
                  {o.l}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-md hairline-gold bg-gold-soft p-4">
            <p className="text-xs uppercase tracking-widest text-gold">Marge perte appliquée</p>
            <p className="mt-1 font-display text-2xl font-semibold text-gold">+15%</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface py-2.5 text-sm"><Download size={14}/> PDF</button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-md gold-gradient py-2.5 text-sm font-semibold text-background"><Share2 size={14}/> WhatsApp</button>
          </div>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md gold-gradient text-background"><Calc size={18}/></span>
            <div>
              <h2 className="font-display text-lg font-semibold">Estimation matériaux</h2>
              <p className="text-xs text-muted-foreground">Pour {surface} m² · {system === "cornfourrure" ? "Cornière + Fourrure" : "Rails + Montants"}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2.5">Matériau</th><th>Qté</th><th>Unité</th><th className="text-right">PU</th><th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {result.lines.map(l => (
                  <tr key={l.name}>
                    <td className="py-3">{l.name}</td>
                    <td className="font-semibold text-gold">{l.qty}</td>
                    <td className="text-muted-foreground">{l.unit}</td>
                    <td className="text-right text-muted-foreground">{fcfa(l.price)}</td>
                    <td className="text-right font-semibold">{fcfa(l.qty * l.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gold/30">
                  <td colSpan={4} className="py-4 text-right text-sm uppercase tracking-widest text-muted-foreground">Budget estimé</td>
                  <td className="py-4 text-right font-display text-2xl font-semibold text-gold">{fcfa(result.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
