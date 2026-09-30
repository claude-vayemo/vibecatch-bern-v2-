import type { Location } from '../data/locations';

type Props = { location: Location; className?: string };

// Standort-Karte (Splash, Mark-Success, Final-Success). Grösse über die Breite
// von aussen steuern, die Schrift skaliert per Container-Einheiten mit.
export default function LocationCard({ location, className = '' }: Props) {
  return (
    <div
      className={`@container relative aspect-[145/178.5] rounded-[3.2%] border-[0.5px] border-black bg-brand font-card font-extralight text-black ${className}`}
    >
      <span className="absolute top-[2%] right-[8%] text-[33cqw] leading-none">{location.id}</span>
      <span className="absolute bottom-[7%] left-[8%] text-[9.6cqw] leading-tight uppercase">
        {location.shortName}
      </span>
    </div>
  );
}
