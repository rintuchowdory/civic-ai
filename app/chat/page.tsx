"use client";

import { useState, useRef, useEffect } from "react";
import Topbar from "@/components/Topbar";
import { Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "assistant"; text: string };

const starter: Msg[] = [
  {
    role: "assistant",
    text:
      "Hallo Rintu! Ich bin dein CivicAI-Assistent. Frag mich zu Anträgen, Fristen oder was ein Behördenbrief bedeutet — ich erkläre es in einfacher Sprache.",
  },
];

const suggestions = [
  "Was bedeutet 'Anhörung nach § 28 VwVfG'?",
  "Wie lege ich Widerspruch gegen einen Bescheid ein?",
  "Welche Unterlagen brauche ich fürs Jobcenter?",
];

function mockReply(question: string): string {
  return `Zu „${question}“: In der Regel prüft die Behörde deinen Fall anhand der eingereichten Unterlagen. Wichtig ist, Fristen einzuhalten und Schreiben schriftlich zu beantworten. Soll ich dir eine Vorlage dafür vorbereiten?`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(starter);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: mockReply(q) }]);
    }, 500);
  }

  return (
    <>
      <Topbar kicker="AZ-02 · Assistenz" title="KI-Chat" />
      <main className="px-5 lg:px-8 py-6">
        <div className="akte-card flex flex-col h-[calc(100vh-160px)] max-h-[720px]">
          <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 text-sm rounded-sm ${
                    m.role === "user"
                      ? "bg-amtsblau text-paper"
                      : "bg-paper/[0.05] border border-paper/10 text-paper/90"
                  }`}
                >
                  {m.role === "assistant" && (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-paper/40 mb-1">
                      <Sparkles size={10} /> CIVICAI
                    </span>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs border border-paper/15 rounded-full px-3 py-1.5 text-paper/60 hover:border-paper/35 hover:text-paper/90 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-paper/10 p-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Frag zu einem Antrag, Brief oder Recht…"
              className="flex-1 bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-2.5 text-sm outline-none focus:border-amtsblau-bright/60 placeholder:text-paper/35"
            />
            <button type="submit" className="btn-primary text-sm px-3.5 py-2.5">
              <Send size={15} />
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
