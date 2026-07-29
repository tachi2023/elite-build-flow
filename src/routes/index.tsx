import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Elite placo&deco" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd.length >= 3) navigate({ to: "/dashboard" });
    else setErr(true);
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground text-lg font-semibold">V</div>
          <div>
            <div className="text-base font-semibold">VraiDeal</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-purple">Console Admin</div>
          </div>
        </div>
        <div className="surface-1 rounded-lg border p-6">
          <h1 className="text-lg font-semibold">Connexion sécurisée</h1>
          <p className="mt-1 text-xs text-muted-foreground">Console interne · accès restreint à l'équipe ops.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="pwd" className="mb-1.5 block text-xs font-medium">Mot de passe administrateur</label>
              <div className="relative">
                <Lock size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="pwd" type="password" autoFocus value={pwd}
                  onChange={(e) => { setPwd(e.target.value); setErr(false); }}
                  placeholder="••••••••"
                  className="h-12 w-full rounded-md surface-2 border border-input pl-9 pr-3 font-mono text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                />
              </div>
              {err && <p className="mt-1.5 text-xs text-red">Mot de passe requis (min. 3 caractères).</p>}
            </div>
            <button type="submit" className="h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98] hover:bg-primary/90">
              Accéder à la console
            </button>
          </form>
          <p className="mt-6 font-mono text-[10px] text-muted-foreground">
            DEMO · n'importe quel mot de passe ≥ 3 caractères ouvre la session.
          </p>
        </div>
        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          VraiDeal · Marketplace seconde main vérifiée · Douala
        </p>
        <Link to="/dashboard" className="mt-2 block text-center text-[11px] text-primary hover:underline">Sauter →</Link>
      </div>
    </div>
  );
}
