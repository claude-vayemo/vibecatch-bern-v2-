import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from '../components/Button';
import LocationCard from '../components/LocationCard';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import { locations, TOTAL } from '../data/locations';

type Props = { onBack: () => void };

export default function FinalSuccess({ onBack }: Props) {
  const grid = useRef<HTMLDivElement>(null);

  // Die Karten erscheinen eine nach der anderen.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.final-card', {
        opacity: 0,
        y: 14,
        scale: 0.9,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.09,
        delay: 0.2,
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <Screen footer={<Button onClick={onBack}>VIEW THE MAP</Button>}>
      <ScreenHeader title="MISSION COMPLETE" />
      <div className="text-center font-display font-bold">
        <p className="text-[16px]">
          {TOTAL} / {TOTAL}
        </p>
        <p className="mt-2 text-[28px] leading-[1.05]">
          WE CAUGHT
          <br />
          THE VIBE
          <br />
          OF BERNE.
        </p>
      </div>
      <div ref={grid} className="grid w-full grid-cols-4 gap-2 pb-8">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} className="final-card" />
        ))}
      </div>
    </Screen>
  );
}
