import Topbar from "@/components/Topbar";
import BriefUpload from "@/components/BriefUpload";
import { briefe } from "@/lib/mock-data";
import { formatDate } from "@/lib/status";
import { FileText, AlertCircle } from "lucide-react";

const dringlichkeitMeta = {
  hoch: { label: "Hohe Dringlichkeit", color: "#C2453A" },
  mittel: { label: "Mittlere Dringlichkeit", color: "#C9A66B" },
  niedrig: { label: "Niedrige Dringlichkeit", color: "#5C8A5A" },
};

export default function BriefePage() {
  return (
    <>
      <Topbar kicker="AZ-01 · Dokumentenanalyse" title="Briefe analysieren" />
      <main className="px-5 lg:px-8 py-6 space-y-6">
        <BriefUpload />

        <section>
          <p className="label-eyebrow mb-3">Bereits analysiert</p>
          <div className="space-y-3">
            {briefe.map((b) => {
              const d = dringlichkeitMeta[b.dringlichkeit];
              return (
                <div key={b.id} className="akte-card p-5 grid md:grid-cols-[auto_1fr_auto] gap-4 items-start">
                  <div className="p-2.5 rounded-sm bg-paper/[0.04] border border-paper/10">
                    <FileText size={18} className="text-paper/60" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm text-paper/90">{b.betreff}</p>
                      <span className="status-pill" style={{ color: d.color }}>
                        {d.label}
                      </span>
                    </div>
                    <p className="aktenzeichen mt-1">
                      {b.absender} · eingegangen {formatDate(b.eingegangen)}
                    </p>
                    <p className="text-sm text-paper/60 mt-2 leading-relaxed">{b.zusammenfassung}</p>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0">
                    <button className="btn-secondary text-xs">Original ansehen</button>
                    <button className="btn-secondary text-xs">Antwort vorbereiten</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="akte-card p-5 flex items-start gap-3">
          <AlertCircle size={17} className="text-akte-gold mt-0.5 shrink-0" />
          <p className="text-xs text-paper/60">
            CivicAI ersetzt keine Rechtsberatung. Bei komplexen Bescheiden empfehlen wir, zusätzlich
            eine Verbraucherzentrale oder Fachanwältin zu kontaktieren.
          </p>
        </section>
      </main>
    </>
  );
}
