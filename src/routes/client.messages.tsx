import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, Send, Image as ImageIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits";
import { messages, clientProjects } from "@/lib/client-mock";

export const Route = createFileRoute("/client/messages")({ component: MessagesPage });

function MessagesPage() {
  const [project, setProject] = useState(clientProjects[0].id);
  const list = messages.filter(m => m.projectId === project);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <SectionHeader title="Messagerie" subtitle="Communiquez directement avec votre conseiller et votre conducteur de travaux." />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="card-elevated rounded-xl p-4">
          <p className="mb-2 px-2 text-[10px] uppercase tracking-widest text-muted-foreground">Conversations</p>
          <ul className="space-y-1">
            {clientProjects.map(p => (
              <li key={p.id}>
                <button onClick={() => setProject(p.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm ${
                    project === p.id ? "bg-gold-soft text-gold" : "hover:bg-surface"
                  }`}>
                  <img src={p.cover} alt="" className="h-9 w-9 rounded-md object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-medium">{p.title}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{p.reference}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="card-elevated flex h-[70vh] flex-col rounded-xl">
          <div className="border-b border-border p-4">
            <p className="font-display text-base font-semibold">{clientProjects.find(p => p.id === project)?.title}</p>
            <p className="text-xs text-muted-foreground">Équipe : Bruno (Directeur), Serge (Conducteur)</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {list.map(m => (
              <div key={m.id} className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === "client" ? "gold-gradient text-background" : "bg-surface border border-border"
                }`}>
                  <p className="text-[10px] uppercase tracking-widest opacity-70">{m.author} · {m.time}</p>
                  <p className="mt-1">{m.text}</p>
                  {m.attachment && (
                    <div className={`mt-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${m.from === "client" ? "bg-background/20" : "bg-background"}`}>
                      {m.attachment.type === "image" ? <ImageIcon size={12} /> : <Paperclip size={12} />}
                      {m.attachment.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <form className="flex items-center gap-2 border-t border-border p-3" onSubmit={(e) => e.preventDefault()}>
            <button type="button" className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-gold"><Paperclip size={14}/></button>
            <input placeholder="Écrire un message..." className="flex-1 rounded-md border border-input bg-surface px-3 py-2 text-sm outline-none focus:border-gold" />
            <button className="inline-flex h-9 items-center gap-1 rounded-md gold-gradient px-4 text-sm font-semibold text-background"><Send size={14}/> Envoyer</button>
          </form>
        </section>
      </div>
    </div>
  );
}
