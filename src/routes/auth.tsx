import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Lock, KeyRound, Fingerprint, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Connexion — Élite Placo & Déco" }, { name: "robots", content: "noindex" }] }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"password" | "pin">("pin");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const submit = (value?: string) => {
    const v = value ?? pin;
    if (mode === "pin" && v.length === 4) {
      if (v === "1234") navigate({ to: "/app" });
      else {
        setError("Code PIN incorrect");
        setAttempts((a) => a + 1);
        setPin("");
      }
    }
  };
  const locked = attempts >= 3;

  return (
    <div className="relative grid min-h-screen place-items-center bg-background p-4">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "radial-gradient(60% 50% at 50% 0%, oklch(0.745 0.12 85 / 0.18), transparent 60%)" }} />
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>

        <div className="card-elevated rounded-2xl p-8">
          <div className="flex justify-center">
            <span className="grid h-14 w-14 place-items-center rounded-full gold-gradient text-background shadow-[0_10px_30px_-10px_var(--color-gold)]">
              {mode === "pin" ? <Lock size={22} /> : <KeyRound size={22} />}
            </span>
          </div>
          <h1 className="mt-5 text-center font-display text-2xl font-semibold">Espace Directeur</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            {mode === "pin" ? "Entrez votre code PIN" : "Connectez-vous avec votre mot de passe"}
          </p>

          {locked ? (
            <div className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-center text-sm text-destructive">
              Compte verrouillé après 3 essais. Réessayez dans 5 minutes.
            </div>
          ) : mode === "pin" ? (
            <>
              <div className="mt-8 flex justify-center gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-14 w-12 rounded-md border text-center text-2xl leading-[3.4rem] font-semibold ${pin.length > i ? "border-gold bg-gold-soft text-gold" : "border-border bg-background text-muted-foreground"}`}>
                    {pin.length > i ? "•" : ""}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9].map(n => (
                  <button key={n} onClick={() => { const v = (pin + n).slice(0,4); setPin(v); setError(""); if (v.length===4) submit(v); }} className="rounded-md border border-border bg-surface py-3 text-lg font-medium hover:border-gold/50 hover:bg-gold-soft active:scale-95 transition">{n}</button>
                ))}
                <button onClick={() => { setPin(""); setError(""); }} className="rounded-md py-3 text-xs text-muted-foreground hover:text-foreground">Effacer</button>
                <button onClick={() => { const v = (pin + 0).slice(0,4); setPin(v); setError(""); if (v.length===4) submit(v); }} className="rounded-md border border-border bg-surface py-3 text-lg font-medium hover:border-gold/50 hover:bg-gold-soft transition">0</button>
                <button onClick={() => setPin(p => p.slice(0,-1))} className="rounded-md py-3 text-xs text-muted-foreground hover:text-foreground">⌫</button>
              </div>
              {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
              <p className="mt-4 text-center text-[11px] text-muted-foreground">Astuce démo · PIN <span className="text-gold">1234</span></p>
            </>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app" }); }} className="mt-6 space-y-4">
              <input className="auth-input" type="email" placeholder="Email" defaultValue="bruno@eliteplaco.cm" />
              <input className="auth-input" type="password" placeholder="Mot de passe" />
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient py-3 text-sm font-semibold text-background">Se connecter <ArrowRight size={16} /></button>
              <button type="button" className="block w-full text-center text-xs text-muted-foreground hover:text-gold">Mot de passe oublié ?</button>
            </form>
          )}

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">ou</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => setMode(mode === "pin" ? "password" : "pin")} className="rounded-md border border-border py-2 text-xs font-medium hover:border-gold/50">
              {mode === "pin" ? "Mot de passe" : "Code PIN"}
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-md border border-border py-2 text-xs font-medium text-muted-foreground hover:border-gold/50">
              <Fingerprint size={14} /> Biométrie
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">Connexion sécurisée · Session expirée après 15 min d'inactivité</p>
      </div>
      <style>{`.auth-input{width:100%;background:var(--color-background);border:1px solid var(--color-input);border-radius:var(--radius-md);padding:.7rem .9rem;font-size:.875rem;color:var(--color-foreground);outline:none}.auth-input:focus{border-color:var(--color-gold);box-shadow:0 0 0 3px var(--color-ring)}`}</style>
    </div>
  );
}
