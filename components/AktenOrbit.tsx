"use client";

import { useEffect, useState } from "react";
import { FileText, FolderOpen, Sparkles } from "lucide-react";
import { vorgaenge } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  eingegangen: "#C9A66B",
  in_bearbeitung: "#5C82E8",
  frist_laeuft: "#C2453A",
  erledigt: "#5C8A5A",
};

export default function AktenOrbit() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(49,89,199,0.16),transparent_52%)]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className={`civic-orbit-core ${reduceMotion ? "civic-orbit-static" : ""}`}>
          <div className="civic-orbit-ring civic-orbit-ring-blue" />
          <div className="civic-orbit-ring civic-orbit-ring-gold" />
          <div className="civic-orbit-glow" />
          <div className="civic-orbit-center">
            <FolderOpen size={22} strokeWidth={1.5} />
            <span>AKTEN</span>
          </div>
        </div>
      </div>

      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-paper/10 bg-ink/45 px-3 py-1.5 backdrop-blur-sm">
        <Sparkles size={13} className="text-akte-gold" />
        <span className="font-mono text-[10px] tracking-[0.14em] text-paper/55">AKTENSTAPEL · LIVE</span>
      </div>

      {vorgaenge.map((vorgang, index) => {
        const status = statusColor[vorgang.status] ?? "#5C82E8";
        const slot = index % 4;
        const cardClass = `civic-document-card civic-document-${slot + 1} ${reduceMotion ? "civic-document-static" : ""}`;

        return (
          <div key={vorgang.id} className={cardClass}>
            <div className="civic-document-face">
              <div className="civic-document-tab" style={{ backgroundColor: status }} />
              <div className="flex items-start justify-between gap-2">
                <FileText size={15} className="text-ink/60" />
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: status }} />
              </div>
              <p className="mt-5 font-display text-[15px] font-semibold leading-tight text-ink/90">
                {vorgang.titel}
              </p>
              <p className="mt-2 font-mono text-[9px] tracking-[0.08em] text-ink/55">{vorgang.aktenzeichen}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: status }}>
                  {vorgang.status.replaceAll("_", " ")}
                </span>
                <span className="font-mono text-[9px] text-ink/45">{vorgang.fortschritt}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full" style={{ width: `${vorgang.fortschritt}%`, backgroundColor: status }} />
              </div>
            </div>
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-soft/70 to-transparent" />
    </div>
  );
}
