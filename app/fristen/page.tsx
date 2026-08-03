import Topbar from "@/components/Topbar";
import { fristen } from "@/lib/mock-data";
import { formatDate } from "@/lib/status";
import { CalendarClock } from "lucide-react";

export default function FristenPage() {
  const sorted = [...fristen].sort((a, b) => a.tage - b.tage);

  return (
    <>
      <Topbar kicker="AZ-05 · Termine" title="Fristen" />
      <main className="px-5 lg:px-8 py-6 space-y-4">
        <div className="akte-card divide-y divide-paper/8">
          {sorted.map((f) => {
            const urgent = f.tage <= 3;
            const soon = f.tage <= 10 && !urgent;
            return (
              <div key={f.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-sm bg-paper/[0.04] border border-paper/10 shrink-0">
                  <span className="font-display text-lg font-semibold text-paper leading-none">
                    {f.tage}
                  </span>
                  <span className="text-[9px] font-mono text-paper/40 mt-0.5">TAGE</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-paper/90">{f.titel}</p>
                  <p className="aktenzeichen mt-0.5">
                    {f.behoerde} · fällig am {formatDate(f.datum)}
                  </p>
                </div>
                <span
                  className="status-pill shrink-0"
                  style={{ color: urgent ? "#C2453A" : soon ? "#C9A66B" : "#5C82E8" }}
                >
                  <CalendarClock size={11} />
                  {urgent ? "Dringend" : soon ? "Bald fällig" : "Geplant"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="akte-card p-5">
          <p className="label-eyebrow mb-3">Erinnerungen</p>
          <p className="text-sm text-paper/60">
            CivicAI erinnert dich automatisch 14, 7 und 2 Tage vor jeder Frist per Push-Benachrichtigung
            und E-Mail. Du kannst das je Vorgang unter „Bearbeitungsstatus&rdquo; anpassen.
          </p>
        </div>
      </main>
    </>
  );
}
