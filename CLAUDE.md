# Vibecatch Bern – v2

Mobile-only Webapp „Vibecatch Bern“: 10 Standorte in Bern erkunden. Jede Person spielt für sich, der Fortschritt liegt nur lokal im Browser. Keine Konten, keine Datenbank, kein Backend. Design kommt aus Figma (Figma MCP). Schlank, funktional, kostenlos betreibbar.

## Versionen
- **v2 (dieses Repo)**: GitHub `claude-vayemo/vibecatch-bern-v2`, eigenes Vercel-Projekt. Ohne Teams und ohne Namen.
- **v1 (alt, nicht mehr anfassen)**: GitHub `claude-vayemo/vibechatch-bern`, eigenes Vercel-Projekt mit Team-Modus und Supabase. Läuft unverändert weiter. Nichts in dieses Repo pushen und die Supabase-DB nicht verändern.

## Stack
- Vite + React + TypeScript
- Tailwind CSS (Tokens aus Figma-Variables in `src/index.css`)
- zustand + `persist` (localStorage)
- gsap für Animationen (Splash, Mark-Success, Hotspots auf der Map, Final-Success)
- Hosting: Vercel (Hobby), `vercel.json` mit SPA-Rewrite auf `/index.html`
- Keine weiteren Libraries ohne Rückfrage.

## Daten
- **Inhalte hardcoded** in `src/data/locations.ts`:
  ```ts
  type Location = {
    id: number;
    name: string; shortName: string;      // shortName = Label neben dem Spot
    image: string;                        // /images/locations/xx.jpg (1020 × 575, zugeschnitten wie in Figma)
    topic: string;                        // Titel in der Spot-Vorschau, z. B. „SYSTEM / ORIENTIERUNG“
    description: string; task: string;
    mapsUrl: string;                      // Google Maps Link
    x: number; y: number;                 // Mittelpunkt des Spots in % auf dem Kartenbild
    labelLeft?: boolean;                  // Label links vom Spot
  };
  ```
- **Lokaler State** (zustand, persistiert unter `vibecatch`): `started` (Intro gesehen), `marks: number[]`.

## Figma
- File: https://www.figma.com/design/UOaPAXLoemnyeID12RKYdl/BxP (fileKey `UOaPAXLoemnyeID12RKYdl`), aktuelle Screens in `1492:14589`.
- **Figma hat Vorrang**: Weicht das Design von diesem Dokument ab, gilt Figma. Grössere Abweichungen kurz melden.
- **Texte 1:1 aus Figma übernehmen**, inklusive der Mischung aus Deutsch und Englisch.
- **Fonts**: „PP Watch“ (Bold, Extralight) liegt als woff2 in `public/fonts/` und ist in `src/index.css` eingebunden.
- **Animationen**: mit gsap frei nachgebaut, nicht 1:1 aus den Figma-Keyframes.

## Flow / Screens
1. **Splash** (`1492:15255`): Standort-Karten fallen herein und wieder hinaus, „Tap to start“ → Intro. Ist `started` gesetzt, startet die App direkt auf der Map.
2. **Intro** (`1492:17470`): „VIBECATCH BERN“, Introtext, „Zur Map“ → Map, „Back“ → Splash.
3. **Map** (`1492:14590`): Kartenbild mit absolut positionierten Hotspots, `shortName` und Status (open / caught). Oben „x / 10 caught“, bei 10/10 „10 / 10 caught – well done!“ als Button, der Final-Success erneut öffnet. Bottom-Bar mit Legende „open“ / „caught“.
4. **Spot-Vorschau** (`1492:14695` ff.): Bottom-Sheet (`SpotSheet`) mit „#n NAME“, Bild, `topic`, `description`, Button „Explore this area“.
5. **Spot-Detail** (`1492:14845` ff.): dasselbe Sheet auf voller Höhe. „In Google Maps öffnen“, Bild, „OBSERVE & DOCUMENT“ mit `task`, Hinweistext, „Mark as caught“ (nur wenn der Spot offen ist).
6. **Mark-Success** (`1492:15312`): Karte des Standorts fällt herein und hinaus, danach automatisch zurück zur Map.
7. **Final-Success**: „MISSION COMPLETE“, Raster mit allen Standorten, „VIEW THE MAP“. Erscheint automatisch, sobald alle Standorte caught sind.

## Hotspot-Positionen bestimmen
`?debug=1` auf der Map: Ein Tap aufs Bild zeigt `x`/`y` in % an und kopiert die Werte in die Zwischenablage.

## Arbeitsweise: Superpowers
- **Brainstorming**: überspringen, nur bei echten Unklarheiten nachfragen.
- **writing-plans**: vor grösseren Änderungen einen kurzen Plan erstellen und bestätigen lassen.
- **executing-plans**: in kleinen Schritten umsetzen, nach jedem Schritt committen.
- **systematic-debugging**: bei Fehlern zuerst die Ursache finden, dann erst fixen.
- **verification-before-completion**: vor „fertig“ `npm run build` ausführen und die App im Browser prüfen (Mobile-Viewport).
- **test-driven-development**: nicht anwenden, es gilt „keine Tests“. Dieses Dokument hat Vorrang vor Skill-Vorgaben.

## Umsetzung
- Mobile-first, max-width ca. 480px zentriert, safe-area-insets beachten.
- Keine Features ausserhalb dieses Dokuments ohne Rückfrage.
- Code schlank halten, keine Tests und kein i18n.
