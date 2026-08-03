"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { ArrowLeftRight, Languages } from "lucide-react";

const languages = ["Deutsch", "Englisch", "Türkisch", "Ukrainisch", "Arabisch", "Russisch", "Polnisch"];

const sampleAmtsdeutsch =
  "Gemäß § 66 Abs. 1 SGB I sind Sie verpflichtet, die angeforderten Nachweise innerhalb der gesetzten Frist vorzulegen, andernfalls kann die Leistung ganz oder teilweise versagt werden.";

export default function UebersetzerPage() {
  const [from, setFrom] = useState("Deutsch");
  const [to, setTo] = useState("Englisch");
  const [input, setInput] = useState(sampleAmtsdeutsch);
  const [plain, setPlain] = useState(true);

  const output = plain
    ? "You must submit the requested documents by the deadline. If you don't, your benefits could be reduced or stopped."
    : "According to § 66 (1) SGB I, you are obligated to submit the requested evidence within the given deadline; otherwise the benefit may be denied in whole or in part.";

  return (
    <>
      <Topbar kicker="AZ-03 · Sprache" title="Übersetzer" />
      <main className="px-5 lg:px-8 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-2 text-sm outline-none"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-ink">
                {l}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            className="p-2 border border-paper/10 rounded-sm hover:border-paper/30 transition-colors"
            aria-label="Sprachen tauschen"
          >
            <ArrowLeftRight size={15} className="text-paper/60" />
          </button>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-2 text-sm outline-none"
          >
            {languages.map((l) => (
              <option key={l} value={l} className="bg-ink">
                {l}
              </option>
            ))}
          </select>

          <label className="ml-auto flex items-center gap-2 text-xs text-paper/55">
            <input
              type="checkbox"
              checked={plain}
              onChange={(e) => setPlain(e.target.checked)}
              className="accent-amtsblau"
            />
            Einfache Sprache statt Amtsdeutsch
          </label>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="akte-card p-5">
            <p className="label-eyebrow mb-3">{from}</p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="w-full bg-transparent text-sm text-paper/85 outline-none resize-none leading-relaxed"
            />
          </div>
          <div className="akte-card p-5">
            <p className="label-eyebrow mb-3 flex items-center gap-1.5">
              <Languages size={12} /> {to}
            </p>
            <p className="text-sm text-paper/85 leading-relaxed">{output}</p>
          </div>
        </div>

        <p className="text-xs text-paper/40">
          Übersetzungen dienen dem besseren Verständnis. Für rechtsverbindliche Dokumente ist ggf.
          eine beglaubigte Übersetzung erforderlich.
        </p>
      </main>
    </>
  );
}
