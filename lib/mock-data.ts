export type Vorgang = {
  id: string;
  aktenzeichen: string;
  titel: string;
  behoerde: string;
  status: "eingegangen" | "in_bearbeitung" | "frist_laeuft" | "erledigt";
  frist?: string;
  fortschritt: number; // 0-100
};

export const vorgaenge: Vorgang[] = [
  {
    id: "1",
    aktenzeichen: "AZ-44/2026-BA",
    titel: "Wohngeldantrag Verlängerung",
    behoerde: "Bürgeramt Köln",
    status: "frist_laeuft",
    frist: "2026-08-14",
    fortschritt: 65,
  },
  {
    id: "2",
    aktenzeichen: "AZ-09/2026-AU",
    titel: "Aufenthaltstitel Verlängerung",
    behoerde: "Ausländerbehörde Aachen",
    status: "in_bearbeitung",
    frist: "2026-09-02",
    fortschritt: 40,
  },
  {
    id: "3",
    aktenzeichen: "AZ-118/2026-FA",
    titel: "Elterngeld Erstantrag",
    behoerde: "Familienkasse NRW",
    status: "eingegangen",
    frist: "2026-08-30",
    fortschritt: 10,
  },
  {
    id: "4",
    aktenzeichen: "AZ-27/2026-KV",
    titel: "Krankenkassenwechsel",
    behoerde: "AOK Rheinland",
    status: "erledigt",
    fortschritt: 100,
  },
];

export const briefe = [
  {
    id: "b1",
    absender: "Jobcenter Köln",
    betreff: "Aufforderung zur Vorlage von Unterlagen",
    eingegangen: "2026-07-28",
    dringlichkeit: "hoch" as const,
    zusammenfassung:
      "Das Jobcenter bittet um Vorlage der Kontoauszüge der letzten drei Monate bis zum 14.08.2026.",
  },
  {
    id: "b2",
    absender: "Finanzamt Aachen-Stadt",
    betreff: "Steuerbescheid 2025",
    eingegangen: "2026-07-20",
    dringlichkeit: "mittel" as const,
    zusammenfassung:
      "Der Steuerbescheid für 2025 wurde erstellt. Eine Nachzahlung von 214 € ist bis zum 20.08.2026 fällig.",
  },
  {
    id: "b3",
    absender: "Stadt Baesweiler, Bauamt",
    betreff: "Anhörung zum Bauantrag",
    eingegangen: "2026-07-15",
    dringlichkeit: "niedrig" as const,
    zusammenfassung:
      "Sie erhalten Gelegenheit zur Stellungnahme zum Bauantrag Az. 2026-B-114 innerhalb von zwei Wochen.",
  },
];

export const fristen = [
  { id: "f1", titel: "Kontoauszüge einreichen", behoerde: "Jobcenter Köln", datum: "2026-08-14", tage: 11 },
  { id: "f2", titel: "Steuerzahlung fällig", behoerde: "Finanzamt Aachen-Stadt", datum: "2026-08-20", tage: 17 },
  { id: "f3", titel: "Aufenthaltstitel verlängern", behoerde: "Ausländerbehörde Aachen", datum: "2026-09-02", tage: 30 },
  { id: "f4", titel: "Stellungnahme Bauantrag", behoerde: "Bauamt Baesweiler", datum: "2026-08-05", tage: 2 },
];

export const dokumente = [
  { id: "d1", name: "Meldebescheinigung.pdf", kategorie: "Meldewesen", groesse: "184 KB", datum: "2026-06-02" },
  { id: "d2", name: "Kontoauszug_Juli.pdf", kategorie: "Finanzen", groesse: "412 KB", datum: "2026-07-30" },
  { id: "d3", name: "Mietvertrag_2024.pdf", kategorie: "Wohnen", groesse: "1,1 MB", datum: "2024-03-11" },
  { id: "d4", name: "Aufenthaltstitel_Kopie.pdf", kategorie: "Ausländerbehörde", groesse: "620 KB", datum: "2025-11-19" },
  { id: "d5", name: "Steuerbescheid_2025.pdf", kategorie: "Finanzamt", groesse: "298 KB", datum: "2026-07-20" },
];

export const rechte = [
  {
    id: "r1",
    titel: "Akteneinsichtsrecht",
    paragraph: "§ 29 VwVfG",
    kurz: "Du darfst Einsicht in deine eigene Akte bei der Behörde nehmen.",
  },
  {
    id: "r2",
    titel: "Anspruch auf Amtssprache Deutsch — mit Recht auf Dolmetscher",
    paragraph: "§ 23 VwVfG",
    kurz: "Verfahrenssprache ist Deutsch, du kannst aber einen Dolmetscher hinzuziehen.",
  },
  {
    id: "r3",
    titel: "Recht auf Anhörung",
    paragraph: "§ 28 VwVfG",
    kurz: "Vor belastenden Entscheidungen muss dir die Behörde Gelegenheit zur Stellungnahme geben.",
  },
  {
    id: "r4",
    titel: "Widerspruchsrecht",
    paragraph: "§ 68 ff. VwGO",
    kurz: "Gegen die meisten Verwaltungsakte kannst du innerhalb eines Monats Widerspruch einlegen.",
  },
];

export const statCards = [
  { label: "Offene Vorgänge", value: "4", trend: "+1 diese Woche" },
  { label: "Nächste Frist", value: "2 Tage", trend: "Stellungnahme Bauamt" },
  { label: "Dokumente archiviert", value: "27", trend: "+3 diesen Monat" },
  { label: "Erledigt (2026)", value: "12", trend: "Ø 6 Tage Bearbeitung" },
];
