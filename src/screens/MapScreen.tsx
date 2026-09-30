import { useState, type MouseEvent } from 'react';
import markerCaught from '../assets/icons/marker-caught.svg';
import markerOpen from '../assets/icons/marker-open.svg';
import { locations, TOTAL } from '../data/locations';

type Props = {
  marks: number[];
  teamId: number | null; // null = Solo
  onSelect: (locationId: number) => void;
};

const debug = new URLSearchParams(window.location.search).has('debug');

export default function MapScreen({ marks, teamId, onSelect }: Props) {
  const [position, setPosition] = useState('');
  const done = marks.length >= TOTAL;

  // ?debug=1: Tap aufs Bild zeigt x/y in % und kopiert die Werte.
  const showPosition = (e: MouseEvent<HTMLDivElement>) => {
    if (!debug) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    const text = `x: ${x}, y: ${y}`;
    setPosition(text);
    void navigator.clipboard?.writeText(text);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-brand text-black">
      <header className="flex flex-col items-center gap-3 pt-[calc(20px+env(safe-area-inset-top))] pb-[18px]">
        <h1 className="font-display text-[16px] font-bold">VIBECATCH BERN</h1>
        <p>{done ? `${TOTAL} / ${TOTAL} caught – well done!` : `${marks.length} / ${TOTAL} caught`}</p>
      </header>

      <div className="relative" onClick={showPosition}>
        <img alt="Karte von Bern" className="block w-full" src="/images/map.png" />
        {locations.map((location) => {
          const caught = marks.includes(location.id);
          const foreign = teamId !== null && location.teamId !== teamId;
          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelect(location.id)}
              className={`absolute flex -translate-x-3 -translate-y-1/2 items-center gap-2 ${
                foreign ? 'opacity-40' : ''
              } ${debug ? 'pointer-events-none' : ''}`}
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
            >
              <img alt={caught ? 'caught' : 'open'} src={caught ? markerCaught : markerOpen} />
              <span
                className={`border-t border-black px-2 py-1 whitespace-nowrap ${
                  caught ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {location.shortName}
              </span>
            </button>
          );
        })}
      </div>

      <footer className="sticky bottom-0 mt-auto flex min-h-[70px] items-center justify-center gap-8 bg-white pb-[env(safe-area-inset-bottom)]">
        {debug && position ? (
          <p>{position} (kopiert)</p>
        ) : done && teamId !== null ? (
          <p>Zurück zum Treffpunkt</p>
        ) : (
          <>
            <span className="flex items-center gap-2">
              <img alt="" src={markerOpen} />
              open
            </span>
            <span className="flex items-center gap-2">
              <img alt="" src={markerCaught} />
              caught
            </span>
          </>
        )}
      </footer>
    </div>
  );
}
