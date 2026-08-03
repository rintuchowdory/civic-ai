"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { FileText, UploadCloud, X, CheckCircle2, AlertCircle } from "lucide-react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";
const MAX_FILE_SIZE = 15 * 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function BriefUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  function processFile(file: File | undefined) {
    if (!file) return;

    setError("");

    const extensionAllowed = /\.(pdf|jpe?g|png)$/i.test(file.name);
    const typeAllowed = ACCEPTED_TYPES.includes(file.type) || extensionAllowed;

    if (!typeAllowed) {
      setSelectedFile(null);
      setError("Bitte wähle eine PDF-, JPG- oder PNG-Datei aus.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setError("Die Datei ist zu groß. Maximal 15 MB sind erlaubt.");
      return;
    }

    setSelectedFile(file);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    processFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    processFile(event.dataTransfer.files?.[0]);
  }

  function clearFile() {
    setSelectedFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section
      className={`akte-card border-dashed p-8 flex flex-col items-center justify-center text-center gap-3 transition-colors ${
        dragActive ? "border-amtsblau-bright bg-amtsblau/[0.08]" : ""
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleInputChange}
        className="sr-only"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="p-3 rounded-full bg-amtsblau/15 text-amtsblau-bright hover:bg-amtsblau/25 transition-colors"
        aria-label="Datei auswählen"
      >
        <UploadCloud size={22} />
      </button>

      <div>
        <p className="font-display text-lg text-paper">Behördenbrief hochladen</p>
        <p className="text-sm text-paper/60 max-w-md mt-2">
          PDF oder Foto eines Briefs auswählen oder direkt hierher ziehen. Unterstützt werden PDF, JPG und PNG.
        </p>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="btn-primary text-sm mt-2"
      >
        Datei auswählen
      </button>

      <p className="aktenzeichen">PDF, JPG, PNG · max. 15 MB</p>

      {dragActive && (
        <p className="text-xs text-amtsblau-bright font-mono">Datei hier ablegen</p>
      )}

      {error && (
        <div className="w-full max-w-lg flex items-center justify-center gap-2 text-xs text-stempel bg-stempel/10 border border-stempel/30 rounded-sm px-3 py-2.5">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {selectedFile && (
        <div className="w-full max-w-lg mt-2 flex items-center gap-3 rounded-sm border border-paper/15 bg-paper/[0.035] px-3 py-3 text-left">
          <div className="p-2 rounded-sm bg-amtsblau/15 text-amtsblau-bright shrink-0">
            <FileText size={17} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-paper/90 truncate">{selectedFile.name}</p>
            <p className="text-[11px] text-paper/55 font-mono mt-0.5">
              {formatFileSize(selectedFile.size)} · Datei ausgewählt
            </p>
          </div>
          <CheckCircle2 size={16} className="text-akte-moss shrink-0" />
          <button
            type="button"
            onClick={clearFile}
            className="p-1.5 rounded-sm text-paper/50 hover:text-paper hover:bg-paper/[0.06] transition-colors"
            aria-label="Ausgewählte Datei entfernen"
          >
            <X size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
