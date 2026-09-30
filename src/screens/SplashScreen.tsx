import { useEffect, useState } from 'react';
import LocationCard from '../components/LocationCard';
import { locations } from '../data/locations';

// Mittelpunkt (in % des Figma-Frames 393 × 852) und Drehung je Karte.
const layout: [number, number, number][] = [
  [28.9, 10.4, -23.5],
  [61.9, 17.1, 32.1],
  [84.9, 29.4, -17.5],
  [23.1, 31.0, -5.5],
  [50.8, 46.2, 16.7],
  [76.4, 55.8, -33.5],
  [12.7, 52.1, 4.6],
  [49.4, 66.0, 1.0],
  [76.4, 78.9, -19.6],
  [11.6, 76.7, -6.5],
  [37.0, 88.5, -8.2],
  [66.9, 100.8, 17.8],
];

type Props = { onStart: () => void };

export default function SplashScreen({ onStart }: Props) {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAway(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      type="button"
      onClick={onStart}
      className="relative block h-dvh w-full overflow-hidden bg-brand text-black"
    >
      <h1 className="absolute inset-x-0 top-[45%] text-center font-display text-[16px] font-bold">
        LET’S CATCH
        <br />
        THE VIBE OF BERNE
      </h1>
      <p className="absolute inset-x-0 bottom-[calc(24px+env(safe-area-inset-bottom))] text-center">
        Tap to start
      </p>
      {locations.map((location, i) => {
        const [x, y, rotation] = layout[i % layout.length];
        return (
          <div
            key={location.id}
            className="absolute w-[36.9%] transition-transform duration-700 ease-in"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transitionDelay: `${(layout.length - i) * 40}ms`,
              transform: `translate(-50%, -50%) ${away ? 'translateY(120vh) ' : ''}rotate(${rotation}deg)`,
            }}
          >
            <LocationCard location={location} />
          </div>
        );
      })}
    </button>
  );
}
