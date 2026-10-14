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
  labelLeft?: boolean; // Label links vom Spot (wie in Figma)
};

// Inhalte aus Figma (Node 1492:14589). IDs und Team-Zuteilung entsprechen dem
// Seed in supabase/migrations/0001_init.sql.
export const locations: Location[] = [
  {
    id: 1,
    teamId: 1,
    name: 'Bahnhof',
    shortName: 'Bahnhof',
    image: '/images/locations/01.jpg',
    topic: 'SYSTEM / ORIENTIERUNG',
    description:
      'Am Bahnhof trifft Eile auf Warten, Orientierung auf Werbung. Was lenkt dich, was zieht dich an – und wo bleibst du hängen?',
    task: 'Treffpunkt, Anzeigetafel, BakeryBakery, Ticketschalter, Werbescreens oder die Grosse und Kleine Schanze: Wo zögern Menschen, wo suchen oder warten sie? Was spricht sie in diesem Moment an?',
    mapsUrl:
      'https://www.google.com/maps/place/Bahnhof+Bern/@46.94915,7.4362748,1035m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478e39bedb177ed3:0xba48565cab2cc5d3!8m2!3d46.9491464!4d7.4388497!16zL20vMDFfcWsw',
    x: 26.2,
    y: 45.3,
  },
  {
    id: 2,
    teamId: 1,
    name: 'Reitschule',
    shortName: 'Reitschule',
    image: '/images/locations/02.jpg',
    topic: 'SUBKULTUR / IDENTITÄT',
    description:
      'Ein Ort mit eigener Stimme. Wie entsteht Identität durch Gestaltung, Botschaften und die Menschen, die einen Ort nutzen? Was davon braucht auch dein Brand?',
    task: 'Fassade, Plakate, Vorplatz und Umgebung: Was wird hier ausgedrückt – und von wem? Wie eignen sich Menschen den Raum an, und was lädt zum Mitmachen ein?',
    mapsUrl:
      'https://www.google.com/maps/place/Kulturzentrum+Reitschule/@46.9527713,7.4383131,1035m/data=!3m3!1e3!4b1!5s0x478e39be2cbcada3:0x6035c16e314797d5!4m6!3m5!1s0x478e39bfd4e45ab9:0x2d2c779ea628f25c!8m2!3d46.9527677!4d7.440888!16s%2Fg%2F1213hgzx',
    x: 31.5,
    y: 25.7,
    labelLeft: true,
  },
  {
    id: 3,
    teamId: 1,
    name: 'PROGR',
    shortName: 'PROGR',
    image: '/images/locations/03.jpg',
    topic: 'KULTUR / BEGEGNUNG',
    description:
      'Wie wird aus einem Ort ein Erlebnis? Entdecke, wie Gestaltung und Angebote zum Mitmachen einladen. Welche Rolle könnte dein Brand dabei spielen?',
    task: 'PROGR, Turnhalle, Lehrerzimmer, Kunstmuseum oder Waisenhausplatz: Was kannst du hier entdecken, ausprobieren oder mitgestalten? Wo wird aus Besuchen Teilnehmen?',
    mapsUrl:
      'https://www.google.com/maps/place/PROGR/@46.9505552,7.4409742,1035m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478e39c08bf54f55:0xaec0d832f0396a3d!8m2!3d46.9505516!4d7.4435491!16s%2Fg%2F1tfr92pj',
    x: 48.1,
    y: 40.1,
  },
  {
    id: 4,
    teamId: 2,
    name: 'Altstadt',
    shortName: 'Altstadt',
    image: '/images/locations/04.jpg',
    topic: 'BÜHNE / ERLEBNIS',
    description:
      'Schaufenster, Gassen und Plätze: Was macht dich neugierig und lockt dich näher? Stell dir vor, dein Brand wäre hier zu Gast – was würdest du mit ihm erleben?',
    task: 'Kornhaus, Bühnen Bern, Casinoplatz, Münsterplattform, Rathaus oder Schlachthaus Theater: Wo wird aus Vorbeigehen Stehenbleiben – und aus Zuschauen Mitmachen?',
    mapsUrl:
      'https://www.google.com/maps/place/Altstadt+Bern+UNESCO-Weltkulturerbe/@46.9481185,7.4449556,1035m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478e37c268c42579:0x9dad61fe34928c3c!8m2!3d46.9481149!4d7.4475305!16s%2Fg%2F11vzwmfllv',
    x: 74.6,
    y: 51.7,
  },
  {
    id: 5,
    teamId: 2,
    name: 'Bundeshaus',
    shortName: 'Bundeshaus',
    image: '/images/locations/05.jpg',
    topic: 'SYMBOLIK / TEILHABE',
    description:
      'Wie werden Werte sichtbar und erlebbar? Schau auf Gebäude, Symbole und Menschen. Wie könnte dein Brand hier Haltung zeigen und zum Dialog einladen?',
    task: 'Bundeshaus und Bundesplatz: Was wirkt offen, was schafft Distanz? Beobachte, wie Menschen den Platz nutzen – zum Durchqueren, Verweilen, Spielen oder Protestieren.',
    mapsUrl:
      'https://www.google.com/maps/place/Bundeshaus/@46.9465645,7.441681,1035m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478e39c7261703ed:0xbeabe0693b92c675!8m2!3d46.9465609!4d7.4442559!16zL20vMDdqbWZz',
    x: 48.5,
    y: 57.4,
    labelLeft: true,
  },
  {
    id: 6,
    teamId: 2,
    name: 'Lorraine',
    shortName: 'Lorraine',
    image: '/images/locations/06.jpg',
    topic: 'ALLTAG / NACHBARSCHAFT',
    description:
      'Was macht aus einem Laden einen Lieblingsort? Entdecke kleine Interaktionen, die Nähe schaffen. Wie könnte dein Brand Teil des Quartieralltags werden?',
    task: 'Kairo, Jetwash, Zytlos, LO31, Vinyl Sound, Falafingo, die beiden Lola-Läden oder Wartsaal: Achte aufs Begrüssen, Bestellen, Stöbern und Warten. Was macht diese Momente persönlich?',
    mapsUrl:
      'https://www.google.com/maps/place/Lorraine,+Bern/@46.9465645,7.441681,1035m/data=!3m1!1e3!4m6!3m5!1s0x478e39ed363190a5:0x7726277db554c2d8!8m2!3d46.959023!4d7.4435355!16s%2Fg%2F1w_vm575',
    x: 57.8,
    y: 12.3,
  },
  {
    id: 7,
    teamId: 3,
    name: 'Breitsch',
    shortName: 'Breitsch',
    image: '/images/locations/07.jpg',
    topic: 'COMMUNITY / AUSTAUSCH',
    description:
      'Was bringt Menschen zusammen? Entdecke, wie aus gemeinsamen Interessen Begegnungen entstehen. Was könnte dein Brand beitragen, damit Menschen sich beteiligen?',
    task: 'Breitenrainplatz, Barbière, Breitsch-Träff oder Feuerwehr Viktoria / Löscher: Wie treten diese Orte mit Menschen in Kontakt? Was lädt zum Austausch ein, was bleibt reine Botschaft?',
    mapsUrl:
      'https://www.google.com/maps/place/Genossenschaft+Feuerwehr+Viktoria/@46.9545816,7.4495755,1035m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478e39e9ac7e4d51:0x514b718a9a20e5be!8m2!3d46.954578!4d7.4521504!16s%2Fg%2F11f3dyl57z',
    x: 92.2,
    y: 18.6,
    labelLeft: true,
  },
  {
    id: 8,
    teamId: 3,
    name: 'Länggasse',
    shortName: 'Länggasse',
    image: '/images/locations/08.jpg',
    topic: 'STREIFZUG / ENTDECKUNG',
    description:
      'Lass dich durchs Quartier treiben. Was macht dich neugierig, wo bleibst du hängen? Entdecke kleine Interaktionen und neue Möglichkeiten für deinen Brand.',
    task: 'Café Sattler, Mittelstrasse, kleine Läden oder eine zufällige Entdeckung: Folge deiner Neugier. Was lädt zum Reingehen, Ausprobieren oder Verweilen ein?',
    mapsUrl:
      'https://www.google.com/maps/place/L%C3%A4nggasse,+3012+Bern/@46.9545816,7.4495755,1035m/data=!3m1!1e3!4m6!3m5!1s0x478e399fb428610d:0x417118b455b9c97b!8m2!3d46.9528417!4d7.4371528!16s%2Fg%2F1tcvn5f2',
    x: 8.6,
    y: 15.2,
  },
  {
    id: 9,
    teamId: 3,
    name: 'Marzili',
    shortName: 'Marzili',
    image: '/images/locations/09.jpg',
    topic: 'FREIZEIT / BEWEGUNG',
    description:
      'Am Wasser verändert sich der Rhythmus. Was lädt zum Bewegen, Spielen oder Abschalten ein? Wie könnte dein Brand diese Momente bereichern?',
    task: 'Aareufer, Freibad, Gelateria di Berna oder Dampfzentrale: Beobachte, wie Menschen ihre Freizeit gestalten. Welche Rolle spielen Wege, Sitzplätze und kleine Rituale?',
    mapsUrl:
      'https://www.google.com/maps/place/Parkplatz+Marzili/@46.9402261,7.4437682,308m/data=!3m1!1e3!4m6!3m5!1s0x478e392e948bd479:0x4879c833051b3cb9!8m2!3d46.940378!4d7.4434298!16s%2Fg%2F11gn1w1pd2',
    x: 42.0,
    y: 68.3,
    labelLeft: true,
  },
  {
    id: 10,
    teamId: 4,
    name: 'Sandrain',
    shortName: 'Sandrain',
    image: '/images/locations/10.jpg',
    topic: 'FREIRAUM / EXPERIMENT',
    description:
      'Was entsteht, wenn Menschen einen Ort selbst gestalten? Entdecke ungewohnte Nutzungen und Ideen. Wie könnte dein Brand hier zum Experimentieren einladen?',
    task: 'Lichtspiel, Gaskessel, Anstadt und ihre Umgebung: Achte auf Eingänge, Aushänge und selbst gebaute Elemente. Wie zeigen diese Orte, was hier möglich ist und wie du mitmachen kannst?',
    mapsUrl:
      'https://www.google.com/maps/place/Sandrainstrasse,+Bern/@46.93597,7.4422792,251m/data=!3m1!1e3!4m6!3m5!1s0x478e39cb9f3ee44d:0x642f04efc4d80eda!8m2!3d46.9358164!4d7.4425424!16s%2Fg%2F1thsq8wt',
    x: 39.6,
    y: 83.0,
    labelLeft: true,
  },
];

export const TOTAL = locations.length;
