import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Card } from "@/components/admin/ui";
import { findSubmission, findVendor, CATEGORIES, type Condition } from "@/lib/mock";
import { fcfa, breakdown, commissionFor } from "@/lib/format";
import { Star, Zap, BadgeCheck, Eye, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/submissions/$id/publish")({
  head: () => ({ meta: [{ title: "Publier l'annonce · VraiDeal Admin" }] }),
  component: PublishPage,
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Soumission introuvable.</div>,
});

const CONDITIONS: Condition[] = ["Neuf", "Très bon", "Bon", "Passable"];

function PublishPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const sub = findSubmission(id);
  const vendor = sub ? findVendor(sub.vendorId) : undefined;

  const [title, setTitle] = useState(sub?.title ?? "");
  const [description, setDescription] = useState(sub?.description ?? "");
  const [condition, setCondition] = useState<Condition>(sub?.declaredCondition ?? "Très bon");
  const [category, setCategory] = useState(sub?.category ?? "Téléphones");
  const [price, setPrice] = useState<number>(Math.round((sub?.minPrice ?? 0) * 1.25));
  const [selected, setSelected] = useState<Set<number>>(() => new Set(sub?.photos.map((_, i) => i) ?? []));
  const [mainIdx, setMainIdx] = useState(0);
  const [urgent, setUrgent] = useState(false);
  const [urgentDate, setUrgentDate] = useState("");
  const [certified, setCertified] = useState(false);
  const [preview, setPreview] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const br = useMemo(() => breakdown(price, category), [price, category]);

  if (!sub) return null;

  const togglePhoto = (i: number) => {
    setSelected(s => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i); else n.add(i);
      return n;
    });
  };

  const publish = () => {
    if (urgent && !urgentDate) { toast.error("Définissez une date limite pour l'urgence."); return; }
    toast.success("Annonce publiée sur le catalogue.");
    setConfirm(false);
    navigate({ to: "/catalogue" });
  };

  return (
    <div>
      <PageHeader
        title="Créer la fiche publique"
        breadcrumb={<><Link to="/submissions" className="hover:text-foreground">Soumissions</Link> · <Link to="/submissions/$id" params={{ id: sub.id }} className="hover:text-foreground">{sub.ref}</Link> · Publication</>}
      />

      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        {/* Editor */}
        <div className="space-y-6 min-w-0">
          <Card title="Photos publiques (cliquer pour activer · ⭐ photo principale)">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {sub.photos.map((p, i) => {
                const on = selected.has(i);
                const main = mainIdx === i;
                return (
                  <div key={i} className="relative group">
                    <button onClick={() => togglePhoto(i)}
                      className={`block aspect-square w-full overflow-hidden rounded-md border-2 ${on ? "border-primary" : "border-white/10 opacity-50"}`}>
                      <img src={p} alt="" className="h-full w-full object-cover" />
                    </button>
                    <button onClick={() => setMainIdx(i)} aria-label="Photo principale"
                      className={`absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full ${main ? "bg-yellow text-[#0F1117]" : "bg-black/60 text-white/70 hover:text-yellow"}`}>
                      <Star size={14} strokeWidth={1.5} fill={main ? "currentColor" : "none"} />
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">{selected.size} photo(s) sélectionnée(s) · principale : #{mainIdx + 1}</p>
          </Card>

          <Card title="Fiche publique à créer">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="mb-1.5 block text-xs font-medium">Titre de l'annonce</label>
                <input id="title" value={title} onChange={e => setTitle(e.target.value)}
                  className="h-11 w-full rounded surface-2 border border-white/5 px-3 text-sm outline-none focus:border-primary/40" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium">Catégorie</label>
                  <select value={category} onChange={e => setCategory(e.target.value as typeof category)}
                    className="h-11 w-full rounded surface-2 border border-white/5 px-3 text-sm outline-none focus:border-primary/40">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium">État</label>
                  <select value={condition} onChange={e => setCondition(e.target.value as Condition)}
                    className="h-11 w-full rounded surface-2 border border-white/5 px-3 text-sm outline-none focus:border-primary/40">
                    {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="desc" className="mb-1.5 block text-xs font-medium">Description publique</label>
                <textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} rows={5}
                  className="w-full rounded surface-2 border border-white/5 p-3 text-sm outline-none focus:border-primary/40" />
              </div>
              <div>
                <label htmlFor="price" className="mb-1.5 block text-xs font-medium">Prix de vente public (FCFA)</label>
                <input id="price" type="number" value={price} onChange={e => setPrice(Number(e.target.value) || 0)}
                  className="h-11 w-full rounded surface-2 border border-white/5 px-3 font-mono text-base outline-none focus:border-primary/40" />
                <div className="mt-3 grid grid-cols-3 gap-2 rounded-md border border-blue/20 bg-blue/[0.05] p-3 text-xs">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Taux</div>
                    <div className="mt-1 font-mono font-semibold">{(commissionFor(category) * 100).toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Commission VraiDeal</div>
                    <div className="mt-1 font-mono font-semibold text-blue">{fcfa(br.commission)}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Montant vendeur</div>
                    <div className="mt-1 font-mono font-semibold text-teal">{fcfa(br.sellerAmount)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-md border border-white/5 surface-2 p-3">
                <Toggle label="Badge Urgence" icon={<Zap size={14} strokeWidth={1.5} />} on={urgent} onChange={setUrgent} />
                {urgent && (
                  <input type="date" value={urgentDate} onChange={e => setUrgentDate(e.target.value)}
                    className="h-10 w-full rounded surface-1 border border-white/10 px-3 font-mono text-sm" />
                )}
                <Toggle label="Badge Certifié" icon={<BadgeCheck size={14} strokeWidth={1.5} />} on={certified} onChange={setCertified} />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button onClick={() => setPreview(true)} className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 px-4 text-xs hover:border-primary/40 hover:text-primary">
                  <Eye size={14} strokeWidth={1.5} /> Prévisualiser
                </button>
                <button onClick={() => setConfirm(true)} className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-teal px-4 text-sm font-medium text-[#0F1117] hover:opacity-90 sm:flex-none">
                  Publier l'annonce
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right reference */}
        <div className="space-y-4 lg:sticky lg:top-20 self-start">
          <Card title="Données brutes vendeur">
            <dl className="space-y-2 text-xs">
              <Field label="Vendeur" value={vendor?.firstName ?? "—"} />
              <Field label="WhatsApp" value={vendor?.whatsapp ?? "—"} mono />
              <Field label="Catégorie" value={sub.category} />
              <Field label="État déclaré" value={sub.declaredCondition} />
              <Field label="Prix minimum" value={fcfa(sub.minPrice)} mono />
              <div>
                <dt className="text-muted-foreground">Description vendeur</dt>
                <dd className="mt-1 whitespace-pre-wrap text-xs text-foreground/80 leading-relaxed">{sub.description}</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onClick={() => setPreview(false)}>
          <div className="surface-1 w-full max-w-md rounded-xl border overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="aspect-[4/3] overflow-hidden">
              <img src={sub.photos[mainIdx]} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                {urgent && <span className="inline-flex items-center gap-1 rounded bg-orange/15 px-2 py-0.5 text-[10px] text-orange"><Zap size={10} />Urgent</span>}
                {certified && <span className="inline-flex items-center gap-1 rounded bg-teal/15 px-2 py-0.5 text-[10px] text-teal"><BadgeCheck size={10} />Certifié</span>}
                <span className="font-mono text-[10px] text-muted-foreground">{condition}</span>
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="font-mono text-2xl font-semibold text-primary">{fcfa(price)}</p>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">{description}</p>
              <button className="mt-2 h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">Commander</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm publish */}
      {confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="surface-1 w-full max-w-md rounded-xl border p-6">
            <h3 className="text-base font-semibold">Publier {title || "cette annonce"} ?</h3>
            <p className="mt-2 text-xs text-muted-foreground">Elle sera visible immédiatement sur le catalogue VraiDeal. Vous pourrez la modifier ou la masquer à tout moment.</p>
            <div className="mt-3 rounded surface-2 border border-white/5 p-3 text-xs space-y-1">
              <div>Prix public : <span className="font-mono font-semibold text-primary">{fcfa(price)}</span></div>
              <div>Commission : <span className="font-mono text-blue">{fcfa(br.commission)}</span></div>
              <div>Reverser vendeur : <span className="font-mono text-teal">{fcfa(br.sellerAmount)}</span></div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirm(false)} className="h-9 rounded-md border border-white/10 px-4 text-xs">Annuler</button>
              <button onClick={publish} className="h-9 rounded-md bg-teal px-4 text-xs font-medium text-[#0F1117]">Confirmer & publier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ label, icon, on, onChange }: { label: string; icon: React.ReactNode; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className="flex w-full items-center justify-between text-xs">
      <span className="inline-flex items-center gap-2">{icon}{label}</span>
      <span className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-primary" : "bg-white/10"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono text-foreground" : "text-foreground"}>{value}</dd>
    </div>
  );
}
