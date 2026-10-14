import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import close from '../assets/icons/close.svg';
import Button from '../components/Button';
import type { Location } from '../data/locations';

type Props = { location: Location; caught: boolean; onMark: () => void; onUnmark: () => void; onClose: () => void };

// Sheet über der Map: erst die Spot-Vorschau (halbe Höhe), nach „Explore this
// area“ fährt es auf die volle Höhe und zeigt das Spot-Detail.
export default function SpotSheet({ location, caught, onMark, onUnmark, onClose }: Props) {
  const backdrop = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const previewHeight = useRef(0);
  const closing = useRef(false);
  const [expanded, setExpanded] = useState(false);

  // Von unten hereinfahren.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(backdrop.current, { opacity: 0, duration: 0.3 });
      gsap.from(panel.current, { yPercent: 100, duration: 0.45, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  // Auf volle Höhe fahren, der Inhalt wechselt zum Detail.
  useLayoutEffect(() => {
    if (!expanded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panel.current,
        { height: previewHeight.current, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
        {
          height: window.innerHeight,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => gsap.set(panel.current, { height: '100dvh' }),
        },
      );
      gsap.from(content.current, { opacity: 0, y: 24, duration: 0.4, delay: 0.15, ease: 'power2.out' });
    });
    return () => ctx.revert();
  }, [expanded]);

  // Nach unten wegfahren, dann schliessen.
  const dismiss = () => {
    if (closing.current) return;
    closing.current = true;
    gsap.to(backdrop.current, { opacity: 0, duration: 0.3 });
    gsap.to(panel.current, { yPercent: 100, duration: 0.35, ease: 'power2.in', onComplete: onClose });
  };

  const explore = () => {
    previewHeight.current = panel.current?.offsetHeight ?? 0;
    setExpanded(true);
  };

  const title = (
    <h2 className="font-display text-[14px] font-bold uppercase">
      #{location.id} {location.name}
    </h2>
  );
  const image = <img alt="" className="aspect-[340/191.6] w-full rounded-[5px] object-cover" src={location.image} />;

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center">
      <div ref={backdrop} className="absolute inset-0 bg-black/20" onClick={dismiss} />
      <div
        ref={panel}
        className="relative max-h-dvh w-full max-w-[480px] overflow-y-auto rounded-t-[24px] bg-white text-black"
      >
        {expanded ? (
          <div
            ref={content}
            className="flex min-h-full flex-col px-[26px] pt-[calc(24px+env(safe-area-inset-top))] pb-[calc(29px+env(safe-area-inset-bottom))]"
          >
            <div className="flex items-center justify-between">
              {title}
              <button
                type="button"
                aria-label="Schliessen"
                className="flex size-6 items-center justify-center"
                onClick={dismiss}
              >
                <img alt="" src={close} />
              </button>
            </div>
            <a className="mt-3 mb-[30px] self-start underline" href={location.mapsUrl} target="_blank" rel="noreferrer">
              In Google Maps öffnen ↗
            </a>
            {image}
            <div className="mt-10 flex flex-col gap-2 text-[14px]">
              <h3 className="font-display font-bold tracking-[0.7px]">OBSERVE &amp; DOCUMENT</h3>
              <p className="leading-[1.5]">{location.task}</p>
            </div>
            <p className="mt-auto pt-10 text-[14px] leading-[1.5]">
              Halte fest, was dich überrascht – als Foto, Video oder Notiz. Welche Idee nimmst du für deinen Brand
              mit?
            </p>
            {caught ? (
              <button type="button" className="mt-9 h-[60px] self-center underline" onClick={onUnmark}>
                unmark
              </button>
            ) : (
              <Button className="mt-9" icon="check" onClick={onMark}>
                Mark as caught
              </Button>
            )}
          </div>
        ) : (
          <div className="relative px-[26px] pt-[34px] pb-[calc(29px+env(safe-area-inset-bottom))]">
            <div className="absolute top-[43px] left-1/2 w-10 -translate-x-1/2 border-t border-black" />
            {title}
            <div className="mt-6">{image}</div>
            <div className="mt-8 flex flex-col gap-2 text-[14px]">
              <h3 className="font-display leading-[1.35] font-bold tracking-[0.28px] uppercase">{location.topic}</h3>
              <p className="leading-[1.5]">{location.description}</p>
            </div>
            <Button className="mt-8" icon="down" onClick={explore}>
              Explore this area
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
