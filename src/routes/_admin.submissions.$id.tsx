import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, Card } from "@/components/admin/ui";
import { findSubmission, findVendor } from "@/lib/mock";
import { fcfa, dateTime } from "@/lib/format";
import { Check, XCircle, MessageCircle, ShieldCheck, Zap, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_admin/submissions/$id")({
  head: () => ({ meta: [{ title: "Examiner soumission · VraiDeal Admin" }] }),
  component: SubmissionDetail,
  notFoundComponent: () => <div className="p-8 text-sm text-muted-foreground">Soumission introuvable.</div>,
});

const CHECKLIST = [
  "Photos suffisantes, nettes et représentatives",
  "État déclaré cohérent avec photos",
  "Prix minimum réaliste pour le marché de Douala",
  "Description honnête, sans info trompeuse",
  "Catégorie correcte",
  "Preuve de propriété fournie (si obligatoire)",
  "Aucun doute sur la légitimité de la vente",
];

const REFUSAL_REASONS = [
  "Photos insuffisantes", "État incohérent", "Prix irréaliste",
  "Preuve manquante", "Catégorie non acceptée", "Doute sur la légitimité", "Autre",
];

function SubmissionDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const sub = findSubmission(id);
  const vendor = sub ? findVendor(sub.vendorId) : undefined;
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(() => Array(CHECKLIST.length).fill(false));
  const [notes, setNotes] = useState("");
  const [refuseOpen, setRefuseOpen] = useState(false);
  const [refusalReasons, setRefusalReasons] = useState<string[]>([]);
  const [refusalMsg, setRefusalMsg] = useState("");

  const allChecked = checks.every(Boolean);

  const refusalPreview = useMemo(() => {
    const fname = vendor?.firstName ?? "—";
    const reasonsBlock = refusalReasons.length ? `\n\nMotifs : ${refusalReasons.join(" · ")}` : "";
    const personal = refusalMsg ? `\n\n${refusalMsg}` : "";
    return `Bonjour ${fname}, après examen de votre soumission ${sub?.ref}, nous ne pouvons pas la publier sur VraiDeal pour le moment.${reasonsBlock}${personal}\n\nL'équipe VraiDeal`;
  }, [refusalReasons, refusalMsg, vendor, sub]);

  if (!sub) return null;

  const accept = () => {
    toast.success("Soumission acceptée — passez à la rédaction de l'annonce.");
    navigate({ to: "/submissions/$id/publish", params: { id: sub.id } });
  };
  const refuse = () => {
    if (refusalReasons.length === 0) { toast.error("Sélectionnez au moins un motif."); return; }
    toast.success(`Refus envoyé via WhatsApp à ${vendor?.firstName}.`);
    setRefuseOpen(false);
    navigate({ to: "/submissions" });
  };

  return (
    <div>
      <PageHeader
        title={`Soumission ${sub.ref}`}
        breadcrumb={<><Link to="/submissions" className="hover:text-foreground">Soumissions</Link> · {sub.ref}</>}
        actions={<Link to="/submissions" className="text-xs text-muted-foreground hover:text-foreground">← Retour à la liste</Link>}
      />

      <div className="grid grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        {/* Left column */}
        <div className="space-y-6 min-w-0">
          {/* Photo gallery */}
          <Card title="Photos soumises">
            <div className="space-y-3">
              <button
                onClick={() => setLightbox(true)}
                className="block w-full overflow-hidden rounded-md surface-2 aspect-[4/3]"
              >
                <img src={sub.photos[activePhoto]} alt="" className="h-full w-full object-cover" />
              </button>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {sub.photos.map((p, i) => (
                  <button key={i} onClick={() => setActivePhoto(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded border ${i === activePhoto ? "border-primary" : "border-white/10"}`}>
                    <img src={p} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Vendor info */}
          <Card title="Infos vendeur">
            <dl className="grid grid-cols-2 gap-4 text-xs">
              <div><dt className="text-muted-foreground">Prénom</dt><dd className="mt-1 text-foreground">{vendor?.firstName}</dd></div>
              <div><dt className="text-muted-foreground">WhatsApp</dt><dd className="mt-1"><a href={`https://wa.me/${vendor?.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono">{vendor?.whatsapp}</a></dd></div>
              <div><dt className="text-muted-foreground">Date soumission</dt><dd className="mt-1 font-mono">{dateTime(sub.submittedAt)}</dd></div>
              <div><dt className="text-muted-foreground">Référence</dt><dd className="mt-1 font-mono">{sub.ref}</dd></div>
              <div><dt className="text-muted-foreground">Score confiance</dt><dd className="mt-1 font-mono">{vendor?.trust}/100</dd></div>
              <div><dt className="text-muted-foreground">Historique ventes</dt><dd className="mt-1 font-mono">{vendor?.sold}</dd></div>
            </dl>
          </Card>

          {/* Product */}
          <Card title="Produit soumis">
            <dl className="space-y-3 text-xs">
              <div><dt className="text-muted-foreground">Catégorie</dt><dd className="mt-1 text-foreground">{sub.category}</dd></div>
              <div><dt className="text-muted-foreground">État déclaré</dt><dd className="mt-1">{sub.declaredCondition}</dd></div>
              <div><dt className="text-muted-foreground">Description libre</dt><dd className="mt-1 whitespace-pre-wrap text-foreground leading-relaxed">{sub.description}</dd></div>
              <div className="rounded-md border border-purple/20 bg-purple/[0.04] p-3">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-[#9b7fff]">Prix minimum confidentiel (admin)</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{fcfa(sub.minPrice)}</dd>
              </div>
            </dl>
          </Card>

          {/* Proof + options */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card title="Preuve de propriété">
              {sub.proofPhoto ? (
                <img src={sub.proofPhoto} alt="preuve" className="aspect-[4/3] w-full rounded object-cover" />
              ) : (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <X size={14} /> Non fournie
                </div>
              )}
            </Card>
            <Card title="Options cochées">
              <div className="space-y-2 text-xs">
                <div className={`flex items-center gap-2 ${sub.urgency ? "text-orange" : "text-muted-foreground"}`}>
                  <Zap size={14} strokeWidth={1.5} /> Urgence demandée {sub.urgency ? "✓" : "—"}
                </div>
                <div className={`flex items-center gap-2 ${sub.immediatePurchase ? "text-[#9b7fff]" : "text-muted-foreground"}`}>
                  <ShoppingBag size={14} strokeWidth={1.5} /> Achat immédiat souhaité {sub.immediatePurchase ? "✓" : "—"}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right column — sticky action panel */}
        <div className="space-y-4 lg:sticky lg:top-20 self-start">
          <Card title="Checklist de validation">
            <ul className="space-y-2">
              {CHECKLIST.map((item, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded surface-2 border border-white/5 p-2.5 text-xs hover:border-white/15">
                    <input type="checkbox" checked={checks[i]}
                      onChange={() => setChecks(c => c.map((v, j) => j === i ? !v : v))}
                      className="mt-0.5 h-4 w-4 accent-primary" />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Notes internes" action={<ShieldCheck size={14} strokeWidth={1.5} className="text-muted-foreground" />}>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Notes invisibles pour le vendeur…" rows={3}
              className="w-full rounded surface-2 border border-white/5 p-2.5 text-xs outline-none focus:border-primary/40" />
          </Card>

          <div className="space-y-2">
            <button
              onClick={accept} disabled={!allChecked}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-teal text-sm font-medium text-[#0F1117] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Check size={18} strokeWidth={1.5} /> Accepter
            </button>
            <button
              onClick={() => setRefuseOpen(true)}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-red text-sm font-medium text-white transition-transform active:scale-[0.98] hover:bg-red/90"
            >
              <XCircle size={18} strokeWidth={1.5} /> Refuser
            </button>
            {!allChecked && <p className="text-center text-[11px] text-muted-foreground">Cochez les 7 items pour activer Accepter.</p>}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4" onClick={() => setLightbox(false)}>
          <button aria-label="Fermer" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"><X /></button>
          <img src={sub.photos[activePhoto]} alt="" className="max-h-[88vh] max-w-[92vw] object-contain" />
        </div>
      )}

      {/* Refuse modal */}
      {refuseOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-4" onClick={() => setRefuseOpen(false)}>
          <div className="surface-1 w-full max-w-xl rounded-t-xl border sm:rounded-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-sm font-semibold">Refuser la soumission {sub.ref}</h3>
              <button onClick={() => setRefuseOpen(false)} aria-label="Fermer"><X size={18} /></button>
            </div>
            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-xs font-medium">Motifs de refus</label>
                <div className="flex flex-wrap gap-1.5">
                  {REFUSAL_REASONS.map(r => {
                    const on = refusalReasons.includes(r);
                    return (
                      <button key={r} onClick={() => setRefusalReasons(s => on ? s.filter(x => x !== r) : [...s, r])}
                        className={`rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors ${on ? "bg-red/15 border-red/40 text-red" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label htmlFor="rmsg" className="mb-2 block text-xs font-medium">Message personnalisé (optionnel)</label>
                <textarea id="rmsg" value={refusalMsg} onChange={e => setRefusalMsg(e.target.value)} rows={3}
                  className="w-full rounded surface-2 border border-white/5 p-2.5 text-xs outline-none focus:border-primary/40"
                  placeholder="Ex : Merci de soumettre à nouveau avec des photos en lumière naturelle…" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium">Prévisualisation WhatsApp</label>
                <div className="rounded-lg bg-[#005c4b]/20 border border-teal/20 p-3">
                  <div className="flex items-start gap-2">
                    <MessageCircle size={14} className="text-teal mt-0.5" />
                    <pre className="font-sans whitespace-pre-wrap text-xs text-foreground leading-relaxed">{refusalPreview}</pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button onClick={() => setRefuseOpen(false)} className="h-9 rounded-md border border-white/10 px-4 text-xs hover:border-white/25">Annuler</button>
              <button onClick={refuse} className="h-9 rounded-md bg-red px-4 text-xs font-medium text-white hover:bg-red/90">Envoyer le refus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
