import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Upload, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { inspirations } from "@/lib/client-mock";

export const Route = createFileRoute("/client/inspirations")({ component: InspirationsPage });

const styles = ["Tous", "Modern", "Luxury", "Minimalist", "Contemporary", "Hotel"] as const;

function InspirationsPage() {
  const [style, setStyle] = useState<typeof styles[number]>("Tous");
  const [saved, setSaved] = useState(() => Object.fromEntries(inspirations.map(i => [i.id, i.saved])) as Record<string, boolean>);
  const items = inspirations.filter(i => style === "Tous" || i.style === style);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader
        title="Mes inspirations déco"
        subtitle="Sauvegardez les ambiances qui vous inspirent. Notre équipe s'en inspire pour vos projets."
        action={
          <button className="inline-flex items-center gap-2 rounded-md hairline-gold px-4 py-2 text-sm font-semibold text-gold">
            <Upload size={14}/> Uploader une photo
          </button>
        }
      />

      <div className="mb-6 flex gap-1.5 overflow-x-auto">
        {styles.map(s => (
          <button key={s} onClick={() => setStyle(s)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${
              style === s ? "bg-gold-soft text-gold border border-gold/30" : "border border-border text-muted-foreground"
            }`}>{s}</button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map(i => (
          <figure key={i.id} className="card-elevated mb-4 break-inside-avoid overflow-hidden rounded-xl">
            <div className="relative">
              <img src={i.img} alt={i.title} className="w-full" />
              <button onClick={() => setSaved(s => ({ ...s, [i.id]: !s[i.id] }))}
                className={`absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full backdrop-blur ${
                  saved[i.id] ? "gold-gradient text-background" : "bg-background/70 text-foreground"
                }`}>
                <Heart size={16} fill={saved[i.id] ? "currentColor" : "none"} />
              </button>
              <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] text-gold backdrop-blur">
                <Sparkles size={10} className="mr-1 inline"/> {i.style}
              </span>
            </div>
            <figcaption className="p-3 text-sm font-medium">{i.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
