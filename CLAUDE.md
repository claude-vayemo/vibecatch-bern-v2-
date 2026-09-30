# Vibecatch Bern – MVP

Mobile-only Webapp „Vibecatch Bern“: 12 Standorte in Bern erkunden, als Einzelspieler (lokal) oder in einem von 4 vordefinierten Teams (live via Supabase). Keine Konten. Design kommt aus Figma (Figma MCP). MVP: schlank, funktional, kein Schnickschnack, kostenlos betreibbar.

## Stack
- Vite + React + TypeScript
- Tailwind CSS (Tokens aus Figma-Variables übernehmen)
- react-router-dom (Routen: `/`, `/reset`)
- zustand + `persist` (localStorage)
- @supabase/supabase-js: Anonymous Auth, RPC, Realtime (Postgres Changes, Presence, Broadcast)
- Hosting: Vercel (Hobby), `vercel.json` mit SPA-Rewrite auf `/index.html`
- Keine weiteren Libraries ohne Rückfrage.

## Env
```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=   # oder anon key
```

## Setup (einmalig, durch Claude Code)
1. Mit dem Supabase MCP das Zielprojekt ermitteln (`list_projects`). Ist es nicht eindeutig: nachfragen. Kein neues Projekt ohne Rückfrage anlegen (Kosten).
2. `supabase/migrations/0001_init.sql` per `apply_migration` (name: `init`) anwenden. Danach mit `list_tables` prüfen und `get_advisors` (security) ausführen, Befunde melden.
3. Reset-Key per `execute_sql` auslesen (`select value from app_config where key = 'reset_key'`) und dem User ausgeben. Nicht committen.
4. Projekt-URL (`get_project_url`) und Publishable Key (`get_publishable_keys`) in `.env.local` schreiben. `.env.local` gehört in `.gitignore`.
5. Den User darauf hinweisen, dass „Allow anonymous sign-ins“ im Supabase Dashboard manuell aktiviert werden muss (Authentication → Sign In / Providers). Das geht nicht via MCP.
6. Vite-Projekt aufsetzen, `vercel.json` mit SPA-Rewrite anlegen, auf GitHub pushen.
7. Schemaänderungen immer als neue Migration in `supabase/migrations/` ablegen und per `apply_migration` anwenden, nie direkt im Dashboard.

## Datenquellen
- **Inhalte hardcoded** in `src/data/locations.ts` und `src/data/teams.ts`. Die IDs müssen mit den DB-Tabellen `locations` und `teams` übereinstimmen.
  ```ts
  type Location = {
    id: number; teamId: number;
    name: string; shortName: string;      // shortName = Label neben dem Spot
    image: string;                        // /images/locations/xx.jpg
    topic: string;                        // Titel in der Spot-Vorschau, z. B. „SYSTEM / ORIENTIERUNG“
    description: string; task: string;
    mapsUrl: string;                      // Google Maps Link
    x: number; y: number;                 // Position in % auf dem Kartenbild
  };
  ```
- **DB** (siehe `supabase/migrations/0001_init.sql`): nur Spielzustand.
  - `team_members`, `location_marks`, View `team_status`
  - RPCs: `join_team(p_team, p_name)`, `leave_team()`, `heartbeat()`, `mark_location(p_location)`, `reset_game(p_key)`
  - Schreiben nur über RPCs, nie direkt in Tabellen.

## Lokaler State (zustand, persistiert)
`name`, `mode: 'solo' | 'team' | null`, `teamId`, `soloMarks: number[]`

## Figma
- File: https://www.figma.com/design/UOaPAXLoemnyeID12RKYdl/BxP?node-id=1411-3880 (fileKey `UOaPAXLoemnyeID12RKYdl`, Page „Vibecatch Dev“ = `1411:3880`)
- **Figma hat Vorrang**: Weicht das Design von diesem Dokument ab, gilt Figma. Grössere Abweichungen kurz melden.
- **Texte 1:1 aus Figma übernehmen**, inklusive der Mischung aus Deutsch und Englisch.
- Die Node-IDs der Frames stehen unten bei den Screens. Die Sections „Team A“ bis „Team D“ zeigen die Standort-Zuteilung, `1411:5945` ist das Kartenbild.
- **Fonts**: „PP Watch“ (Bold, Extralight) liegt als woff2 in `public/fonts/` (Dateinamen siehe README dort) und ist in `src/index.css` eingebunden. Fehlen die Dateien, greift die Ersatzschrift.
- **Animationen**: Die Figma-Animationen (Splash, Mark-Success) sind nur vereinfacht per CSS umgesetzt, ohne Animations-Library.
- **Standorte noch offen**: Es bleiben 12 Standorte (4 Teams × 3), die finale Liste wird aber noch definiert. Die Frames in Figma widersprechen sich hier, darum die Namen nicht aus Figma ableiten, sondern nachfragen. Bis dahin Platzhalter in `locations.ts`.

## Flow / Screens
1. **Splash** (`1411:4135`): gestapelte Standort-Karten, kurz anzeigen, dann weiter (oder bei vorhandenem State direkt zur Map).
2. **Name + Modus** (`1411:5095`): ein gemeinsamer Screen. „DEIN NAME“ mit Eingabefeld, darunter „Erkundungsmodus (Einzelspieler)“ → Map und „Team wählen“ → Team-Auswahl. „Team wählen“ ist erst mit eingegebenem Namen aktiv (vorher 40 % Deckkraft), der Einzelspieler-Modus geht auch ohne Namen.
3. **Team-Auswahl** (`1411:5139`): 4 Teams mit ihren Standorten und `aktiv/3` (aus `team_status`, per Realtime auf `team_members` refetchen). Volle Teams deaktiviert. Team antippen, dann „Team beitreten“ → `join_team`. Fehler `team_full` sauber abfangen.
4. **Team-Lobby** (`1411:3881`): Teamname mit Standorten, 3 Plätze mit Live-Liste der Mitglieder über **Presence** auf dem Channel `team:{id}` (key = user_id, payload = `{ name }`), darunter „YOUR MISSION“ mit Text aus Figma (reiner Text, keine Logik dahinter).
   - „Back“ → `leave_team()` + Presence untrack → Team-Auswahl.
   - „Enter map“ ist ab 1 Mitglied aktiv.
5. **Map** (`1411:3908`, `1411:3994`, `1411:5672`): Kartenbild mit absolut positionierten Hotspots (`left: x%`, `top: y%`), dazu `shortName` und Status (open / caught).
   - Oben: „VIBECATCH BERN“ und Fortschritt „x / 12 caught“, bei 12/12 „12 / 12 caught – well done!“.
   - Bottom-Bar: Legende „open“ / „caught“. Im Team-Modus steht dort bei 12/12 stattdessen „Zurück zum Treffpunkt“.
   - Team: Standorte fremder Teams abgedimmt (z. B. opacity), aber klickbar und ohne Markier-Button. Der Status aller 12 kommt live aus `location_marks`.
   - Solo: Status aus `soloMarks`, keine DB.
6. **Spot-Vorschau** (`1411:4080`): Bottom-Sheet über der Map nach Tap auf einen Hotspot. „#n NAME“, Bild, `topic` und `description`, Button „Explore this place“ → Spot-Detail.
7. **Spot-Detail** (`1411:4096`): Kopf mit „#n NAME“ und Schliessen-Icon, „Zum Standort via Google Maps“ (öffnet in neuem Tab), Bild, „OBSERVE & DOCUMENT“ mit `task`, Hinweistext, Button „Mark as caught“. Der Button erscheint nur, wenn der Spot offen ist und zum eigenen Team gehört (bzw. im Solo-Modus immer).
8. **Mark-Success** (`1411:4499`): „0x / 12“, „VIBE CAUGHT“, Karte des Standorts, „Back to map“. Ca. 3 s anzeigen, dann automatisch zurück zur Map.
9. **Final-Success** (`1411:5306`): „MISSION COMPLETE“, „12 / 12 WE CAUGHT THE VIBE OF BERNE.“, Raster mit allen 12 Standorten, Button „VIEW THE MAP“. Erscheint automatisch, sobald 12/12 erreicht sind (Team: global für alle Clients gleichzeitig via Realtime).

## Live-Logik Team
- Presence auf `team:{id}` tracken, solange der User im Team ist (Lobby **und** Map). So verschwindet ein Name beim Schliessen des Tabs sofort aus der Lobby der anderen.
- `heartbeat()` alle 30 s, solange `mode === 'team'`, und bei `visibilitychange` → visible. Liefert es `false` (Platz verfallen oder Reset), den lokalen Team-State leeren und zurück zur Team-Auswahl (bzw. zum Start bei Reset).
- Channel `game` → Broadcast-Event `reset` → alle Clients leeren ihren State und gehen zum Start.

## Reset
Route `/reset?key=…`: anonym anmelden, `reset_game(key)` aufrufen. Bei `true` Broadcast `reset` auf `game` senden und „Zurückgesetzt“ anzeigen, sonst „Ungültiger Key“. Kein Link in der UI.

## Hotspot-Positionen bestimmen
`?debug=1` auf der Map: Ein Tap aufs Bild zeigt `x`/`y` in % (1 Nachkommastelle) an und kopiert die Werte in die Zwischenablage. Die Werte werden danach manuell in `locations.ts` eingetragen.

## Auth
Beim App-Start: gibt es keine Session, `supabase.auth.signInAnonymously()` aufrufen. Die Session bleibt im localStorage erhalten. Im Solo-Modus ist die DB nicht nötig, die Anmeldung schadet aber nicht.

## Arbeitsweise: Superpowers
Das Plugin **Superpowers** ist installiert. Die passenden Skills konsequent nutzen:
- **Brainstorming**: überspringen, die Spezifikation steht in diesem Dokument. Nur bei echten Unklarheiten nachfragen.
- **writing-plans**: vor Setup und vor jedem Screen einen kurzen Plan erstellen und bestätigen lassen.
- **executing-plans**: den Plan in kleinen Schritten umsetzen, nach jedem Schritt committen.
- **systematic-debugging**: bei Fehlern zuerst die Ursache finden, dann erst fixen.
- **verification-before-completion**: vor „fertig“ `npm run build` ausführen und die App im Browser prüfen (Mobile-Viewport).
- **test-driven-development**: im MVP **nicht** anwenden, es gilt „keine Tests“ (siehe unten). Dieses Dokument hat Vorrang vor Skill-Vorgaben.

## Umsetzung
- Mobile-first, max-width ca. 480px zentriert, safe-area-insets beachten.
- Figma: Frames via Figma MCP einzeln umsetzen (`get_design_context` mit den Node-IDs aus „Flow / Screens“), zuerst Tokens und Basiskomponenten, dann die Screens.
- Screen für Screen umsetzen, keine Features ausserhalb dieses Dokuments ohne Rückfrage.
- Code schlank halten, keine Tests und kein i18n im MVP.