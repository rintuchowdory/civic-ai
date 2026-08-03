"use client";

import { ChangeEvent, DragEvent, useMemo, useRef, useState } from "react";
import { CheckCircle2, FileText, Folder, UploadCloud, X } from "lucide-react";
import { dokumente } from "@/lib/mock-data";
import { formatDate } from "@/lib/status";

const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);

type Category = "Alle" | string;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAllowedFile(file: File) {
  return ALLOWED_MIME_TYPES.has(file.type) || /\.(pdf|jpe?g|png)$/i.test(file.name);
}

export default function DocumentLibrary() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<Category>("Alle");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(dokumente.map((document) => document.kategorie))),
    [],
  );

  const filteredDocuments = useMemo(
    () =>
      category === "Alle"
        ? dokumente
        : dokumente.filter((document) => document.kategorie === category),
    [category],
  );

  function processFiles(files: FileList | File[]) {
    const nextErrors: string[] = [];
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (!isAllowedFile(file)) {
        nextErrors.push(`${file.name}: Bitte PDF, JPG oder PNG verwenden.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        nextErrors.push(`${file.name}: Maximal 15 MB pro Datei.`);
        return;
      }

      validFiles.push(file);
    });

    setErrors(nextErrors);
    if (validFiles.length > 0) {
      setSelectedFiles((current) => [...current, ...validFiles]);
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) processFiles(event.target.files);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files.length > 0) processFiles(event.dataTransfer.files);
  }

  function removeSelectedFile(index: number) {
    setSelectedFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
  }

  return (
    <div className="grid lg:grid-cols-[230px_1fr] gap-6">
      <aside className="akte-card p-4 h-fit">
        <p className="label-eyebrow mb-2">Dokumente</p>
        <p className="text-xs text-paper/60 leading-relaxed mb-4">
          Wähle eine Kategorie oder füge ein neues Dokument hinzu.
        </p>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setCategory("Alle")}
            className={`w-full flex items-center gap-2 text-sm px-2.5 py-2 rounded-sm border transition-colors ${
              category === "Alle"
                ? "text-paper border-amtsblau-bright/60 bg-amtsblau/15"
                : "text-paper/65 border-transparent hover:border-paper/15 hover:text-paper/90"
            }`}
          >
            <Folder size={14} className="text-amtsblau-bright" />
            <span className="flex-1 text-left">Alle Dokumente</span>
            <span className="font-mono text-[10px] text-paper/35">{dokumente.length}</span>
          </button>

          {categories.map((item) => {
            const count = dokumente.filter((document) => document.kategorie === item).length;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`w-full flex items-center gap-2 text-sm px-2.5 py-2 rounded-sm border transition-colors ${
                  category === item
                    ? "text-paper border-amtsblau-bright/60 bg-amtsblau/15"
                    : "text-paper/65 border-transparent hover:border-paper/15 hover:text-paper/90"
                }`}
              >
                <Folder size={14} />
                <span className="flex-1 text-left">{item}</span>
                <span className="font-mono text-[10px] text-paper/35">{count}</span>
              </button>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={handleInputChange}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="btn-primary text-sm w-full justify-center mt-4"
        >
          <UploadCloud size={15} />
          Dokument hinzufügen
        </button>

        <p className="text-[10px] text-paper/45 text-center mt-2 leading-relaxed">
          PDF, JPG oder PNG · bis 15 MB
        </p>
      </aside>

      <div className="space-y-5">
        <div
          className={`akte-card p-5 md:p-6 border-dashed transition-colors ${
            dragActive ? "border-amtsblau-bright bg-amtsblau/[0.08]" : ""
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-full bg-amtsblau/15 text-amtsblau-bright shrink-0">
                <UploadCloud size={20} />
              </div>
              <div>
                <p className="font-display text-xl text-paper">Dokument hinzufügen</p>
                <p className="text-sm text-paper/60 mt-1">
                  Ziehe Dateien hierher oder wähle sie mit einem Klick aus.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="btn-secondary text-sm shrink-0"
            >
              Dateien auswählen
            </button>
          </div>

          {dragActive && (
            <p className="text-xs text-amtsblau-bright font-mono mt-4">Datei hier ablegen</p>
          )}

          {errors.length > 0 && (
            <div className="mt-4 rounded-sm border border-stempel/30 bg-stempel/10 p-3 text-xs text-stempel space-y-1">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="label-eyebrow">Für diese Sitzung ausgewählt</p>
              {selectedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="flex items-center gap-3 rounded-sm border border-paper/12 bg-paper/[0.035] px-3 py-2.5"
                >
                  <div className="p-2 rounded-sm bg-amtsblau/15 text-amtsblau-bright shrink-0">
                    <FileText size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-paper/90 truncate">{file.name}</p>
                    <p className="text-[11px] text-paper/55 font-mono mt-0.5">
                      {formatFileSize(file.size)} · bereit zur Ablage
                    </p>
                  </div>
                  <CheckCircle2 size={16} className="text-akte-moss shrink-0" />
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(index)}
                    className="p-1.5 rounded-sm text-paper/45 hover:text-paper hover:bg-paper/[0.06]"
                    aria-label={`${file.name} entfernen`}
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
              <p className="text-[11px] text-paper/45 leading-relaxed">
                Hinweis: In dieser Demo werden Dateien nur im Browser ausgewählt. Eine dauerhafte Speicherung
                und OCR-Verarbeitung kann später über ein Backend angebunden werden.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="label-eyebrow">Dein Archiv</p>
            <p className="text-sm text-paper/55 mt-1">
              {category === "Alle" ? "Alle Dokumente" : category} · {filteredDocuments.length} Dokumente
            </p>
          </div>
        </div>

        <div className="akte-card divide-y divide-paper/8">
          {filteredDocuments.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-paper/70">Keine Dokumente in dieser Kategorie.</p>
              <button
                type="button"
                onClick={() => setCategory("Alle")}
                className="text-xs text-amtsblau-bright hover:underline mt-2"
              >
                Alle Dokumente anzeigen
              </button>
            </div>
          ) : (
            filteredDocuments.map((document) => (
              <div key={document.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="p-2.5 rounded-sm bg-paper/[0.04] border border-paper/10 shrink-0">
                  <FileText size={16} className="text-paper/60" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-paper/90 truncate">{document.name}</p>
                  <p className="aktenzeichen mt-0.5">{document.kategorie}</p>
                </div>
                <p className="text-xs text-paper/40 font-mono hidden sm:block">{formatDate(document.datum)}</p>
                <p className="text-xs text-paper/40 font-mono w-16 text-right">{document.groesse}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
