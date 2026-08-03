"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { CheckCircle2, Circle, HelpCircle } from "lucide-react";

const checklist = [
  "Personalausweis oder Reisepass",
  "Einladungsschreiben / Terminbestätigung",
  "Aktuelle Meldebescheinigung",
  "Kontoauszüge der letzten 3 Monate",
  "Vollmacht, falls du in Vertretung erscheinst",
];

const fragen = [
  "Wie lange dauert die Bearbeitung nach dem Termin?",
  "Welche Unterlagen fehlen mir noch für eine vollständige Akte?",
  "Bekomme ich eine schriftliche Bestätigung des heutigen Termins?",
];

export default function TerminvorbereitungPage() {
  const [checked, setChecked] = useState<boolean[]>(checklist.map(() => false));

  function toggle(i: number) {
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));
  }

  const done = checked.filter(Boolean).length;

  return (
    <>
      <Topbar kicker="AZ-09 · Termine" title="Terminvorbereitung" />
      <main className="px-5 lg:px-8 py-6 grid lg:grid-cols-2 gap-6">
        <div className="akte-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="label-eyebrow">Mitzubringen — Ausländerbehörde Aachen</p>
            <span className="aktenzeichen">
              {done}/{checklist.length}
            </span>
          </div>
          <div className="space-y-1">
            {checklist.map((item, i) => (
              <button
                key={item}
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-3 text-left px-2.5 py-2.5 rounded-sm hover:bg-paper/[0.04] transition-colors"
              >
                {checked[i] ? (
                  <CheckCircle2 size={18} className="text-akte-moss shrink-0" />
                ) : (
                  <Circle size={18} className="text-paper/25 shrink-0" />
                )}
                <span className={`text-sm ${checked[i] ? "text-paper/45 line-through" : "text-paper/85"}`}>
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="akte-card p-5">
          <p className="label-eyebrow mb-4">Mögliche Fragen an dich</p>
          <div className="space-y-3">
            {fragen.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <HelpCircle size={16} className="text-amtsblau-bright mt-0.5 shrink-0" />
                <p className="text-sm text-paper/80 leading-relaxed">{f}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-paper/10">
            <p className="label-eyebrow mb-2">Sprachhilfe vor Ort</p>
            <p className="text-sm text-paper/60">
              Du hast das Recht, einen Dolmetscher mitzubringen (§ 23 VwVfG). CivicAI kann
              Kernsätze für dein Anliegen in deine Sprache übersetzen — probier den Übersetzer.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
