import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import AktenOrbit from "@/components/AktenOrbit";
import { vorgaenge, fristen, statCards } from "@/lib/mock-data";
import { statusMeta, formatDate } from "@/lib/status";
import { ArrowUpRight, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Topbar kicker="Guten Tag, Rintu" title="Deine Übersicht" />

      <main className="px-5 lg:px-8 py-6 space-y-8">
        {/* Hero: 3D Aktenstapel + intro */}
        <section className="akte-card grid lg:grid-cols-[1.1fr_1fr] overflow-hidden">
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <p className="label-eyebrow">Live · Verwaltungsvorgänge im Überblick</p>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-paper mt-2 leading-tight">
              4 Vorgänge in Bewegung.
              <br />
              Eine Frist braucht dich heute.
            </h2>
            <p className="text-sm text-paper/60 mt-3 max-w-md">
              Jede Akte, die bei einer Behörde für dich läuft, kreist hier als Karte —
              eingefärbt nach Status. Klicke dich in Sekunden zum nächsten wichtigen Schritt.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/fristen" className="btn-primary text-sm">
                Fristen ansehen <ArrowUpRight size={15} />
              </Link>
              <Link href="/briefe" className="btn-secondary text-sm">
                Neuen Brief hochladen
              </Link>
            </div>
          </div>
          <div className="h-72 lg:h-auto lg:min-h-[360px] border-t lg:border-t-0 lg:border-l border-paper/10">
            <AktenOrbit />
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <StatCard key={s.label} label={s.label} value={s.value} trend={s.trend} index={i} />
          ))}
        </section>

        <section className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
          {/* Vorgänge list */}
          <div className="akte-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="label-eyebrow">Deine Vorgänge</p>
              <Link href="/status" className="text-xs text-amtsblau-bright hover:underline">
                Alle ansehen
              </Link>
            </div>
            <div className="space-y-2">
              {vorgaenge.map((v) => {
                const meta = statusMeta[v.status];
                return (
                  <div
                    key={v.id}
                    className="flex items-center gap-4 rounded-sm border border-paper/8 hover:border-paper/20 transition-colors px-3 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-paper/90 truncate">{v.titel}</p>
                      <p className="aktenzeichen mt-0.5">
                        {v.aktenzeichen} · {v.behoerde}
                      </p>
                    </div>
                    <div className="w-28 hidden sm:block">
                      <div className="h-1.5 rounded-full bg-paper/10 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${v.fortschritt}%`, backgroundColor: meta.color }}
                        />
                      </div>
                    </div>
                    <span
                      className="status-pill shrink-0"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fristen preview */}
          <div className="akte-card p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="label-eyebrow">Nächste Fristen</p>
              <Link href="/fristen" className="text-xs text-amtsblau-bright hover:underline">
                Kalender
              </Link>
            </div>
            <div className="space-y-3">
              {fristen
                .slice()
                .sort((a, b) => a.tage - b.tage)
                .map((f) => (
                  <div key={f.id} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 shrink-0 rounded-sm p-1.5 ${
                        f.tage <= 3 ? "bg-stempel/15 text-stempel" : "bg-amtsblau/15 text-amtsblau-bright"
                      }`}
                    >
                      <AlertTriangle size={13} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-paper/90">{f.titel}</p>
                      <p className="text-[11px] text-paper/45 font-mono mt-0.5">
                        {f.behoerde} · {formatDate(f.datum)} · noch {f.tage} Tage
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
