import Topbar from "@/components/Topbar";
import { dokumente } from "@/lib/mock-data";
import { formatDate } from "@/lib/status";
import { FileText, UploadCloud, Folder } from "lucide-react";

const kategorien = Array.from(new Set(dokumente.map((d) => d.kategorie)));

export default function DokumentePage() {
  return (
    <>
      <Topbar kicker="AZ-06 · Archiv" title="Dokumente" />
      <main className="px-5 lg:px-8 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="akte-card p-4 h-fit">
          <p className="label-eyebrow mb-3">Kategorien</p>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-2 text-sm text-paper/90 px-2.5 py-1.5 rounded-sm bg-paper/[0.06]">
              <Folder size={14} className="text-amtsblau-bright" /> Alle Dokumente
            </button>
            {kategorien.map((k) => (
              <button
                key={k}
                className="w-full flex items-center gap-2 text-sm text-paper/55 hover:text-paper/85 px-2.5 py-1.5 rounded-sm transition-colors"
              >
                <Folder size={14} /> {k}
              </button>
            ))}
          </div>
          <button className="btn-primary text-xs w-full justify-center mt-4">
            <UploadCloud size={14} /> Hochladen
          </button>
        </aside>

        <div className="akte-card divide-y divide-paper/8">
          {dokumente.map((d) => (
            <div key={d.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="p-2 rounded-sm bg-paper/[0.04] border border-paper/10">
                <FileText size={16} className="text-paper/60" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-paper/90 truncate">{d.name}</p>
                <p className="aktenzeichen mt-0.5">{d.kategorie}</p>
              </div>
              <p className="text-xs text-paper/40 font-mono hidden sm:block">{formatDate(d.datum)}</p>
              <p className="text-xs text-paper/40 font-mono w-16 text-right">{d.groesse}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
