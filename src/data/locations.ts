export type Location = {
  id: number;
  teamId: number;
  name: string;
  shortName: string;
  image: string;
  topic: string;
  description: string;
  task: string;
  mapsUrl: string;
  x: number;
  y: number;
};

// Platzhalter, bis die finalen Standorte feststehen. IDs und Team-Zuteilung
// entsprechen dem Seed in supabase/migrations/0001_init.sql.
export const locations: Location[] = Array.from({ length: 12 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    teamId: Math.floor(i / 3) + 1,
    name: `Standort ${id}`,
    shortName: `Standort ${id}`,
    image: `/images/locations/${String(id).padStart(2, '0')}.jpg`,
    topic: `Thema ${id}`,
    description: `Beschreibung für Standort ${id}.`,
    task: `Aufgabe für Standort ${id}.`,
    mapsUrl: 'https://maps.google.com/?q=Bern',
    x: 20 + (i % 3) * 30,
    y: 15 + Math.floor(i / 3) * 22,
  };
});
