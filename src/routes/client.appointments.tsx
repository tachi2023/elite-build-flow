import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { appointments } from "@/lib/client-mock";

export const Route = createFileRoute("/client/appointments")({ component: AppointmentsPage });

const types = ["Visite technique", "Inspection", "Consultation déco", "Réception finale"] as const;
const slots = ["09:00", "10:30", "11:00", "14:00", "15:30", "16:30"];

function AppointmentsPage() {
  const [type, setType] = useState<typeof types[number]>("Consultation déco");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Mes rendez-vous" subtitle="Planifiez visites, inspections et consultations en quelques clics." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-5 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg font-semibold">À venir & historique</h3>
          <ul className="space-y-3">
            {appointments.map(a => (
              <li key={a.id} className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-gold">{a.type}</p>
                    <p className="mt-0.5 font-medium">{a.title}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Calendar size={12}/> {a.date}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12}/> {a.time}</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={12}/> {a.location}</span>
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] ${
                    a.status === "confirmed" ? "bg-success/15 text-success border-success/30" :
                    a.status === "pending" ? "bg-warning/15 text-warning border-warning/30" :
                    "bg-muted text-muted-foreground border-border"
                  }`}>
                    {a.status === "confirmed" ? "Confirmé" : a.status === "pending" ? "En attente" : "Terminé"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-elevated rounded-xl p-5">
          <h3 className="mb-3 font-display text-lg font-semibold">Demander un nouveau rendez-vous</h3>
          {done ? (
            <div className="flex flex-col items-center gap-2 rounded-md bg-success/10 p-5 text-center">
              <Check size={28} className="text-success" />
              <p className="font-medium">Demande envoyée</p>
              <p className="text-xs text-muted-foreground">Notre équipe vous confirmera sous 24h.</p>
              <button onClick={() => { setDone(false); setSlot(null); setDate(""); }} className="mt-2 text-xs text-gold hover:underline">Nouvelle demande</button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Type de rendez-vous</p>
                <div className="grid grid-cols-2 gap-2">
                  {types.map(t => (
                    <button type="button" key={t} onClick={() => setType(t)}
                      className={`rounded-md border px-2 py-2 text-xs ${
                        type === t ? "border-gold/50 bg-gold-soft text-gold" : "border-border text-muted-foreground"
                      }`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Date souhaitée</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                  className="w-full rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold" />
              </div>
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Créneau</p>
                <div className="grid grid-cols-3 gap-2">
                  {slots.map(s => (
                    <button type="button" key={s} onClick={() => setSlot(s)}
                      className={`rounded-md border px-2 py-2 text-xs ${
                        slot === s ? "border-gold/50 bg-gold-soft text-gold" : "border-border text-muted-foreground"
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
              <button disabled={!date || !slot} className="inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient px-4 py-2.5 text-sm font-semibold text-background disabled:opacity-50">
                <Plus size={14}/> Confirmer la demande
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
