import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Package, Sofa, HardHat, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/client/marketplace")({ component: Marketplace });

const futureCategories = [
  { icon: Sparkles, title: "Produits décoratifs", desc: "Corniches, moulures, spots LED, peintures..." },
  { icon: Package, title: "Marketplace matériaux", desc: "BA13, profilés, enduits — prix négociés." },
  { icon: Sofa, title: "Mobilier sur-mesure", desc: "Meubles assortis à votre intérieur." },
  { icon: HardHat, title: "Services partenaires", desc: "Électriciens, plombiers, peintres validés." },
];

function Marketplace() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Marketplace" subtitle="Notre écosystème de produits et services partenaires arrive bientôt." />

      <div className="card-elevated relative overflow-hidden rounded-2xl p-8 sm:p-12">
        <div className="absolute inset-0 -z-10 opacity-30" style={{
          background: "radial-gradient(600px 300px at 30% 0%, color-mix(in oklab, var(--color-gold) 30%, transparent), transparent)",
        }} />
        <div className="inline-flex items-center gap-2 rounded-full hairline-gold px-3 py-1 text-[11px] text-gold">
          <ShoppingBag size={12}/> Bientôt disponible
        </div>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">L'univers Élite, sous votre toit.</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Découvrez prochainement notre catalogue de produits décoratifs, notre marketplace de matériaux à prix négociés,
          ainsi que notre réseau de partenaires certifiés.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {futureCategories.map(c => {
          const Icon = c.icon;
          return (
            <div key={c.title} className="card-elevated rounded-xl p-5">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-gold-soft text-gold"><Icon size={18}/></div>
              <h3 className="mt-3 font-display text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-muted-foreground">À venir</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
