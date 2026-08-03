"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import { Printer, Download } from "lucide-react";

export default function WiderspruchPage() {
  const [bescheid, setBescheid] = useState("Ablehnungsbescheid Wohngeld vom 22.07.2026");
  const [aktenzeichen, setAktenzeichen] = useState("AZ-44/2026-BA");
  const [begruendung, setBegruendung] = useState(
    "Die Einkommensberechnung berücksichtigt nicht meine seit Juni reduzierten Arbeitsstunden."
  );

  const heute = new Date().toLocaleDateString("de-DE");

  return (
    <>
      <Topbar kicker="AZ-04 · Schriftverkehr" title="Widerspruch erstellen" />
      <main className="px-5 lg:px-8 py-6 grid lg:grid-cols-[1fr_1.1fr] gap-6">
        <div className="akte-card p-5 space-y-4">
          <p className="label-eyebrow">Angaben zum Bescheid</p>

          <div>
            <label className="text-xs text-paper/50 block mb-1">Betreff / Bescheid</label>
            <input
              value={bescheid}
              onChange={(e) => setBescheid(e.target.value)}
              className="w-full bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-2 text-sm outline-none focus:border-amtsblau-bright/60"
            />
          </div>

          <div>
            <label className="text-xs text-paper/50 block mb-1">Aktenzeichen</label>
            <input
              value={aktenzeichen}
              onChange={(e) => setAktenzeichen(e.target.value)}
              className="w-full bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-2 text-sm font-mono outline-none focus:border-amtsblau-bright/60"
            />
          </div>

          <div>
            <label className="text-xs text-paper/50 block mb-1">Warum widersprichst du?</label>
            <textarea
              value={begruendung}
              onChange={(e) => setBegruendung(e.target.value)}
              rows={5}
              className="w-full bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-2 text-sm outline-none resize-none focus:border-amtsblau-bright/60"
            />
          </div>

          <p className="text-xs text-paper/40">
            CivicAI formuliert daraus einen formal korrekten Widerspruch. Frist: in der Regel ein
            Monat ab Zugang des Bescheids (§ 70 VwGO).
          </p>
        </div>

        <div className="akte-card p-6 flex flex-col">
          <p className="label-eyebrow mb-4">Vorschau</p>
          <div className="bg-paper text-ink rounded-sm p-6 flex-1 font-body text-sm leading-relaxed space-y-4">
            <p className="text-right text-xs text-ink/60">{heute}</p>
            <p className="font-semibold">Widerspruch</p>
            <p>
              Betreff: {bescheid}
              <br />
              Aktenzeichen: {aktenzeichen}
            </p>
            <p>Sehr geehrte Damen und Herren,</p>
            <p>
              hiermit lege ich form- und fristgerecht Widerspruch gegen den oben genannten Bescheid
              ein.
            </p>
            <p>
              <span className="font-semibold">Begründung:</span> {begruendung}
            </p>
            <p>
              Ich bitte um erneute Prüfung meines Falls unter Berücksichtigung der vorgenannten
              Punkte und um schriftliche Bestätigung des Eingangs.
            </p>
            <p>Mit freundlichen Grüßen</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="btn-primary text-sm">
              <Download size={15} /> Als PDF speichern
            </button>
            <button className="btn-secondary text-sm">
              <Printer size={15} /> Drucken
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
