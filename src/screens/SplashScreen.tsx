import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
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

const rotationOf = (i: number) => layout[i % layout.length][2];

type Props = { onStart: () => void };

export default function SplashScreen({ onStart }: Props) {
  const root = useRef<HTMLButtonElement>(null);

  // Karten fallen von oben auf den Stapel, bleiben kurz liegen und fallen
  // dann unten aus dem Bild. Dahinter erscheint der Text.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.splash-card');
      const drop = window.innerHeight * 1.4;
      gsap.set(cards, { xPercent: -50, yPercent: -50, rotation: rotationOf });

      gsap
        .timeline()
        .from(cards, {
          y: -drop,
          rotation: (i) => rotationOf(i) + (i % 2 ? 35 : -35),
          duration: 0.9,
          ease: 'power3.out',
          stagger: { each: 0.07, from: 'end' },
        })
        .to(
          cards,
          {
            y: drop,
            rotation: (i) => rotationOf(i) + (i % 2 ? -30 : 30),
            duration: 0.8,
            ease: 'power2.in',
            stagger: { each: 0.05, from: 'end' },
          },
          '+=0.5',
        )
        .from('.splash-text', { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out', stagger: 0.15 }, '-=0.7');
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={root}
      type="button"
      onClick={onStart}
      className="relative block h-dvh w-full overflow-hidden bg-brand text-black"
    >
      <h1 className="splash-text absolute inset-x-0 top-[45%] text-center font-display text-[16px] font-bold">
        LET’S CATCH
        <br />
        THE VIBE OF BERNE
      </h1>
      <p className="splash-text absolute inset-x-0 bottom-[calc(24px+env(safe-area-inset-bottom))] text-center">
        Tap to start
      </p>
      {locations.map((location, i) => {
        const [x, y] = layout[i % layout.length];
        return (
          <div key={location.id} className="splash-card absolute w-[36.9%]" style={{ left: `${x}%`, top: `${y}%` }}>
            <LocationCard location={location} />
          </div>
        );
      })}
    </button>
  );
}
