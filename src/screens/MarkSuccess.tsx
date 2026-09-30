import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import LocationCard from '../components/LocationCard';
import { TOTAL, type Location } from '../data/locations';

type Props = { location: Location; count: number; onDone: () => void };

// Die Karte fällt herein, bleibt kurz liegen und fällt wieder hinaus,
// danach geht es automatisch zurück zur Map.
export default function MarkSuccess({ location, count, onDone }: Props) {
  const root = useRef<HTMLButtonElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const drop = window.innerHeight * 1.3;
      gsap.set('.success-card', { xPercent: -50, yPercent: -50, rotation: -23.5 });

      gsap
        .timeline({ onComplete: () => onDoneRef.current() })
        .from('.success-text', { opacity: 0, y: -12, duration: 0.35, ease: 'power2.out' })
        .from('.success-card', { y: -drop, rotation: -60, duration: 0.7, ease: 'back.out(1.1)' }, 0)
        .to('.success-card', { y: drop, rotation: 10, duration: 0.55, ease: 'power2.in' }, '+=0.7')
        .to('.success-text', { opacity: 0, duration: 0.3 }, '-=0.3');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={root}
      type="button"
      onClick={onDone}
      className="relative block h-dvh w-full overflow-hidden bg-brand text-black"
    >
      <h1 className="success-text absolute inset-x-0 top-[19%] text-center font-display text-[16px] font-bold">
        {String(count).padStart(2, '0')} / {TOTAL}
        <br />
        <br />
        VIBE CAUGHT
      </h1>
      <div className="success-card absolute top-[59%] left-[45.5%] w-[74.5%]">
        <LocationCard location={location} />
      </div>
      <p className="success-text absolute inset-x-0 bottom-[calc(24px+env(safe-area-inset-bottom))] text-center">
        Back to map
      </p>
    </button>
  );
}
