import Topbar from "@/components/Topbar";
import { vorgaenge } from "@/lib/mock-data";
import { statusMeta, formatDate } from "@/lib/status";

const steps = ["Eingegangen", "In Bearbeitung", "Anhörung/Rückfrage", "Entscheidung"];

function stepIndex(status: string, fortschritt: number) {
  if (status === "erledigt") return 3;
  if (fortschritt > 60) return 2;
  if (fortschritt > 15) return 1;
  return 0;
}

export default function StatusPage() {
  return (
    <>
      <Topbar kicker="AZ-07 · Verfolgung" title="Bearbeitungsstatus" />
      <main className="px-5 lg:px-8 py-6 space-y-5">
        {vorgaenge.map((v) => {
          const meta = statusMeta[v.status];
          const idx = stepIndex(v.status, v.fortschritt);
          return (
            <div key={v.id} className="akte-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div>
                  <p className="text-sm text-paper/90">{v.titel}</p>
                  <p className="aktenzeichen mt-0.5">
                    {v.aktenzeichen} · {v.behoerde}
                  </p>
                </div>
                <span className="status-pill" style={{ color: meta.color }}>
                  {meta.label}
                </span>
              </div>

              <div className="flex items-center">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1 flex items-center last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`h-3 w-3 rounded-full border-2 ${
                          i <= idx
                            ? "bg-amtsblau-bright border-amtsblau-bright"
                            : "bg-transparent border-paper/20"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-mono text-center max-w-[70px] ${
                          i <= idx ? "text-paper/70" : "text-paper/30"
                        }`}
                      >
                        {s}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`flex-1 h-[2px] mx-1 mb-4 ${
                          i < idx ? "bg-amtsblau-bright" : "bg-paper/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {v.frist && (
                <p className="text-xs text-paper/45 mt-4">
                  Nächste Frist: <span className="text-paper/70">{formatDate(v.frist)}</span>
                </p>
              )}
            </div>
          );
        })}
      </main>
    </>
  );
}
