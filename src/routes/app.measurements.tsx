import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2, Ruler, Download, Share2, WifiOff } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/measurements")({
  component: Measurements,
});

interface Room { id: string; name: string; length: number; width: number; height: number; beams: number; pillars: number; niches: number; spots: number; }

const initial: Room[] = [
  { id: "r1", name: "Salon", length: 7.5, width: 5.2, height: 3.0, beams: 2, pillars: 0, niches: 1, spots: 8 },
  { id: "r2", name: "Chambre principale", length: 4.8, width: 4.2, height: 2.8, beams: 0, pillars: 0, niches: 0, spots: 4 },
];

function Measurements() {
  const [rooms, setRooms] = useState<Room[]>(initial);
  const add = () => setRooms(r => [...r, { id: crypto.randomUUID(), name: `Pièce ${r.length+1}`, length: 0, width: 0, height: 2.8, beams: 0, pillars: 0, niches: 0, spots: 0 }]);
  const upd = (id: string, k: keyof Room, v: number | string) => setRooms(rs => rs.map(r => r.id===id ? { ...r, [k]: v } : r));
  const rm = (id: string) => setRooms(rs => rs.filter(r => r.id !== id));

  const totals = rooms.reduce((acc, r) => {
    const area = r.length * r.width;
    const perim = 2 * (r.length + r.width);
    const vol = area * r.height;
    return { area: acc.area + area, perim: acc.perim + perim, vol: acc.vol + vol };
  }, { area: 0, perim: 0, vol: 0 });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Métrés digitaux"
        subtitle="Mesurez vos pièces, exportez en PDF, partagez sur WhatsApp."
        action={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full hairline-gold px-3 py-1 text-[11px] text-gold"><WifiOff size={11}/> Mode hors-ligne actif</span>
            <button onClick={add} className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2 text-sm font-semibold text-background"><Plus size={14}/> Ajouter pièce</button>
          </div>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Kpi label="Surface totale" value={`${totals.area.toFixed(2)} m²`} />
        <Kpi label="Périmètre total" value={`${totals.perim.toFixed(2)} m`} />
        <Kpi label="Volume total" value={`${totals.vol.toFixed(2)} m³`} />
      </div>

      <div className="space-y-4">
        {rooms.map((r, i) => {
          const area = r.length * r.width;
          const perim = 2 * (r.length + r.width);
          const vol = area * r.height;
          return (
            <div key={r.id} className="card-elevated rounded-xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-gold-soft text-gold font-semibold">{i+1}</span>
                  <input value={r.name} onChange={e=>upd(r.id, "name", e.target.value)}
                    className="bg-transparent font-display text-lg font-semibold outline-none focus:text-gold" />
                </div>
                <button onClick={()=>rm(r.id)} className="text-muted-foreground hover:text-destructive" aria-label="Supprimer"><Trash2 size={16}/></button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <NumIn label="Longueur (m)" value={r.length} onChange={v=>upd(r.id,"length",v)} />
                <NumIn label="Largeur (m)" value={r.width} onChange={v=>upd(r.id,"width",v)} />
                <NumIn label="Hauteur (m)" value={r.height} onChange={v=>upd(r.id,"height",v)} />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <NumIn label="Poutres" value={r.beams} onChange={v=>upd(r.id,"beams",v)} step={1} />
                <NumIn label="Piliers" value={r.pillars} onChange={v=>upd(r.id,"pillars",v)} step={1} />
                <NumIn label="Niches" value={r.niches} onChange={v=>upd(r.id,"niches",v)} step={1} />
                <NumIn label="Spots" value={r.spots} onChange={v=>upd(r.id,"spots",v)} step={1} />
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                <Stat label="Surface" value={`${area.toFixed(2)} m²`} />
                <Stat label="Périmètre" value={`${perim.toFixed(2)} m`} />
                <Stat label="Volume" value={`${vol.toFixed(2)} m³`} />
              </dl>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm"><Download size={14}/> Exporter PDF</button>
        <button className="inline-flex items-center gap-2 rounded-md gold-gradient px-4 py-2.5 text-sm font-semibold text-background"><Share2 size={14}/> Partager WhatsApp</button>
        <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground"><Ruler size={12}/> Sauvegarde locale automatique</span>
      </div>
    </div>
  );
}

function NumIn({ label, value, onChange, step=0.1 }: { label: string; value: number; onChange: (v:number)=>void; step?: number }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input type="number" step={step} value={value} onChange={e=>onChange(Number(e.target.value)||0)}
        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-gold outline-none" />
    </label>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-1 font-display text-lg font-semibold text-gold">{value}</dd></div>;
}
function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-elevated rounded-xl p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-gold">{value}</p>
    </div>
  );
}
