import { useEffect } from 'react';
import LocationCard from '../components/LocationCard';
import { TOTAL, type Location } from '../data/locations';

type Props = { location: Location; count: number; onDone: () => void };

// Wird ca. 3 s gezeigt, dann automatisch zurück zur Map.
export default function MarkSuccess({ location, count, onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <button
      type="button"
      onClick={onDone}
      className="relative block h-dvh w-full overflow-hidden bg-brand text-black"
    >
      <h1 className="absolute inset-x-0 top-[19%] text-center font-display text-[16px] font-bold">
        {String(count).padStart(2, '0')} / {TOTAL}
        <br />
        <br />
        VIBE CAUGHT
      </h1>
      <div className="absolute top-[59%] left-[45.5%] w-[74.5%] -translate-x-1/2 -translate-y-1/2 -rotate-[23.5deg]">
        <LocationCard location={location} />
      </div>
      <p className="absolute inset-x-0 bottom-[calc(24px+env(safe-area-inset-bottom))] text-center">
        Back to map
      </p>
    </button>
  );
}
