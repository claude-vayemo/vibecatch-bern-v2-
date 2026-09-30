import Button from '../components/Button';
import type { Location } from '../data/locations';

type Props = { location: Location; onExplore: () => void; onClose: () => void };

// Bottom-Sheet über der Map.
export default function SpotPreview({ location, onExplore, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-black/20" onClick={onClose}>
      <div
        className="relative w-full max-w-[480px] rounded-t-[24px] bg-white px-[26px] pt-[34px] pb-[calc(29px+env(safe-area-inset-bottom))] text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-[43px] left-1/2 w-10 -translate-x-1/2 border-t border-black" />
        <h2 className="font-display text-[14px] font-bold uppercase">
          #{location.id} {location.name}
        </h2>
        <img
          alt=""
          className="mt-6 aspect-[340/191.6] w-full rounded-[5px] object-cover"
          src={location.image}
        />
        <div className="mt-8 flex flex-col gap-2 text-[14px]">
          <h3 className="font-display leading-[1.35] font-bold tracking-[0.28px] uppercase">{location.topic}</h3>
          <p className="leading-[1.5]">{location.description}</p>
        </div>
        <Button className="mt-8" icon="down" onClick={onExplore}>
          Explore this place
        </Button>
      </div>
    </div>
  );
}
