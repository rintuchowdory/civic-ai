# CivicAI — Dein digitaler Behördenbegleiter

Frontend-MVP für CivicAI: ein digitaler Begleiter durch deutsche Behördenprozesse.

## Features (Frontend, Mock-Daten)

- 📄 Briefe analysieren — OCR-Upload-UI + KI-Zusammenfassung von Behördenbriefen
- 🤖 KI-Chat — Fragen zu Anträgen, Fristen und Behördendeutsch
- 🌍 Übersetzer — Amtsdeutsch ⇄ einfache Sprache, mehrsprachig
- 📝 Widerspruch erstellen — Formular + Live-Vorschau eines Widerspruchsschreibens
- 📅 Fristen — Übersicht aller anstehenden Fristen
- 📂 Dokumente — Zentrales Dokumentenarchiv
- 📈 Bearbeitungsstatus — Fortschritt laufender Vorgänge als Prozess-Timeline
- 📚 Rechte erklärt — Bürgerrechte im Verwaltungsverfahren, einfach erklärt
- 💬 Terminvorbereitung — Checkliste & mögliche Fragen vor Behördenterminen

## Design

Das Designsystem greift die Materialwelt deutscher Verwaltung auf: Aktenordner, Aktenzeichen,
Amtsstempel. Dunkles "Amtsblau" als Basis, warmes Aktendeckel-Cream für Textkontrast, Stempel-Rot
für Fristen/Dringlichkeit. Typografie: Barlow Condensed (angelehnt an DIN 1451, die deutsche
Beschilderungsschrift) für Überschriften/Navigation, IBM Plex Sans für Fließtext, IBM Plex Mono für
Aktenzeichen und Daten. Das Dashboard zeigt eine 3D-Visualisierung ("Aktenstapel-Orbit") deiner
offenen Vorgänge via Three.js / React Three Fiber.

## Tech-Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS
- Three.js über `@react-three/fiber` + `@react-three/drei`
- lucide-react (Icons), framer-motion, clsx

## Entwicklung

```bash
npm install --legacy-peer-deps
npm run dev
```

App läuft unter `http://localhost:3000`.

## Roadmap (nächste Phasen)

- [ ] FastAPI-Backend (Chat, Übersetzung, OCR-Analyse)
- [ ] Postgres + Redis für echte Vorgangs-/Fristenverwaltung
- [ ] Anbindung KI-Modell (Groq/OpenAI oder lokal) über bestehenden Cloudflare-Worker-Proxy
- [ ] Echte OCR-Pipeline für hochgeladene Behördenbriefe
- [ ] Mehrsprachige Übersetzung produktiv anbinden
- [ ] Docker-Setup + Deployment (Vercel Frontend / Render oder K8s Backend)

## Rechtlicher Hinweis

CivicAI ersetzt keine Rechtsberatung. Bei komplexen Fällen empfiehlt die App den Kontakt zu
Verbraucherzentralen, Migrationsberatung oder Fachanwält:innen.
