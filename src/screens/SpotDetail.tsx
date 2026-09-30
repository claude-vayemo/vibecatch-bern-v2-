import close from '../assets/icons/close.svg';
import Button from '../components/Button';
import type { Location } from '../data/locations';

type Props = { location: Location; canMark: boolean; onMark: () => void; onClose: () => void };

export default function SpotDetail({ location, canMark, onMark, onClose }: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-white px-[26px] pt-[calc(24px+env(safe-area-inset-top))] pb-[calc(29px+env(safe-area-inset-bottom))] text-black">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[14px] font-bold uppercase">
          #{location.id} {location.name}
        </h1>
        <button type="button" aria-label="Schliessen" className="flex size-6 items-center justify-center" onClick={onClose}>
          <img alt="" src={close} />
        </button>
      </div>
      <a className="mt-3 self-start underline" href={location.mapsUrl} target="_blank" rel="noreferrer">
        Zum Standort via Google Maps
      </a>
      <img
        alt=""
        className="mt-[30px] aspect-[340/191.6] w-full rounded-[5px] object-cover"
        src={location.image}
      />
      <div className="mt-10 flex flex-col gap-2 text-[14px]">
        <h2 className="font-display font-bold tracking-[0.7px]">OBSERVE &amp; DOCUMENT</h2>
        <p className="leading-[1.5]">{location.task}</p>
      </div>
      {canMark && (
        <>
          <p className="mt-auto pt-10 text-[14px] leading-[1.5]">
            Wenn ihr fertig dokumentiert habt, könnt ihr den Ort als markiert abhaken und den nächsten Spot
            anschauen.
          </p>
          <Button className="mt-9" icon="check" onClick={onMark}>
            Mark as caught
          </Button>
        </>
      )}
    </div>
  );
}
