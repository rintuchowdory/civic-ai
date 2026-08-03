export const statusMeta: Record<
  string,
  { label: string; color: string; text: string }
> = {
  eingegangen: { label: "Eingegangen", color: "#C9A66B", text: "text-akte-gold" },
  in_bearbeitung: { label: "In Bearbeitung", color: "#5C82E8", text: "text-amtsblau-bright" },
  frist_laeuft: { label: "Frist läuft", color: "#C2453A", text: "text-stempel" },
  erledigt: { label: "Erledigt", color: "#5C8A5A", text: "text-akte-moss" },
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
