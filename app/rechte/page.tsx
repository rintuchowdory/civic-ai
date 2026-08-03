import Topbar from "@/components/Topbar";
import { rechte } from "@/lib/mock-data";
import { Scale } from "lucide-react";

export default function RechtePage() {
  return (
    <>
      <Topbar kicker="AZ-08 · Wissen" title="Rechte erklärt" />
      <main className="px-5 lg:px-8 py-6">
        <p className="text-sm text-paper/55 max-w-2xl mb-6">
          Im Kontakt mit Behörden hast du klare gesetzliche Rechte. CivicAI erklärt die wichtigsten
          in einfacher Sprache — mit der jeweiligen Rechtsgrundlage zum Nachschlagen.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {rechte.map((r) => (
            <div key={r.id} className="akte-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Scale size={15} className="text-akte-gold" />
                <p className="aktenzeichen">{r.paragraph}</p>
              </div>
              <p className="font-display text-lg text-paper leading-snug">{r.titel}</p>
              <p className="text-sm text-paper/60 mt-2 leading-relaxed">{r.kurz}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
