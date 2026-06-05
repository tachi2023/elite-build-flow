import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Lock, ArrowRight, ShieldCheck, KeyRound, UserPlus } from "lucide-react";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/client/auth")({
  head: () => ({ meta: [{ title: "Connexion client — Élite Placo & Déco" }, { name: "robots", content: "noindex" }] }),
  component: ClientAuth,
});

type Mode = "login" | "signup" | "otp" | "forgot";

function ClientAuth() {
  const [mode, setMode] = useState<Mode>("login");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 opacity-40" style={{
        background: "radial-gradient(800px 400px at 20% 0%, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent), radial-gradient(700px 400px at 80% 100%, color-mix(in oklab, var(--color-gold) 12%, transparent), transparent)",
      }} />
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-10">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <Link to="/" className="text-xs text-muted-foreground hover:text-gold">← Retour au site</Link>
        </div>

        <div className="card-elevated rounded-2xl p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-widest text-gold">Espace client</p>
          <h1 className="mt-1 font-display text-2xl font-semibold">
            {mode === "login" && "Bon retour parmi nous"}
            {mode === "signup" && "Créez votre compte client"}
            {mode === "otp" && "Vérification de votre numéro"}
            {mode === "forgot" && "Réinitialiser le mot de passe"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "login" && "Suivez vos chantiers, documents et paiements en temps réel."}
            {mode === "signup" && "Accédez à un suivi premium de vos projets."}
            {mode === "otp" && "Entrez le code à 6 chiffres reçu par SMS."}
            {mode === "forgot" && "Nous vous envoyons un lien de réinitialisation."}
          </p>

          {(mode === "login" || mode === "signup") && (
            <>
              <div className="mt-6 grid grid-cols-2 rounded-md border border-border p-1 text-xs">
                <button
                  onClick={() => setMethod("email")}
                  className={`rounded px-3 py-2 font-medium ${method === "email" ? "bg-gold-soft text-gold" : "text-muted-foreground"}`}
                ><Mail size={12} className="mr-1 inline" /> Email</button>
                <button
                  onClick={() => setMethod("phone")}
                  className={`rounded px-3 py-2 font-medium ${method === "phone" ? "bg-gold-soft text-gold" : "text-muted-foreground"}`}
                ><Phone size={12} className="mr-1 inline" /> Téléphone + OTP</button>
              </div>

              <form
                className="mt-5 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (method === "phone") setMode("otp");
                  else navigate({ to: "/client" });
                }}
              >
                {mode === "signup" && (
                  <Field icon={UserPlus} placeholder="Nom complet" />
                )}
                {method === "email" ? (
                  <Field icon={Mail} placeholder="vous@exemple.com" type="email" />
                ) : (
                  <Field icon={Phone} placeholder="+237 6 78 00 00 00" />
                )}
                {method === "email" && (
                  <Field icon={Lock} placeholder="Mot de passe" type="password" />
                )}
                <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient px-4 py-3 text-sm font-semibold text-background">
                  {mode === "login" ? "Se connecter" : "Créer mon compte"} <ArrowRight size={14} />
                </button>
              </form>

              <div className="mt-4 flex items-center justify-between text-xs">
                <button onClick={() => setMode("forgot")} className="text-muted-foreground hover:text-gold">Mot de passe oublié ?</button>
                <button
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-gold hover:underline"
                >
                  {mode === "login" ? "Créer un compte" : "J'ai déjà un compte"}
                </button>
              </div>
            </>
          )}

          {mode === "otp" && (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => { e.preventDefault(); navigate({ to: "/client" }); }}
            >
              <div className="flex justify-between gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    maxLength={1}
                    inputMode="numeric"
                    className="h-12 w-full rounded-md border border-input bg-surface text-center font-display text-xl outline-none focus:border-gold"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Code envoyé au +237 6 78 22 11 09. <button type="button" className="text-gold hover:underline">Renvoyer</button>
              </p>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient px-4 py-3 text-sm font-semibold text-background">
                <ShieldCheck size={14} /> Vérifier et continuer
              </button>
              <button type="button" onClick={() => setMode("login")} className="block w-full text-center text-xs text-muted-foreground hover:text-gold">
                ← Retour à la connexion
              </button>
            </form>
          )}

          {mode === "forgot" && (
            <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setMode("login"); }}>
              <Field icon={Mail} placeholder="Email associé au compte" type="email" />
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-md gold-gradient px-4 py-3 text-sm font-semibold text-background">
                <KeyRound size={14} /> Envoyer le lien
              </button>
              <button type="button" onClick={() => setMode("login")} className="block w-full text-center text-xs text-muted-foreground hover:text-gold">
                ← Retour
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Invité par Élite Placo & Déco ?{" "}
          <button onClick={() => setMode("signup")} className="text-gold hover:underline">Utilisez votre code d'invitation</button>
        </p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon, placeholder, type = "text",
}: { icon: typeof Mail; placeholder: string; type?: string }) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-input bg-surface px-3 py-2.5 focus-within:border-gold">
      <Icon size={14} className="text-muted-foreground" />
      <input type={type} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}
