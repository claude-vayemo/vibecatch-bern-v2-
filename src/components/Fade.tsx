import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

// Blendet einen Screen beim Erscheinen weich ein. Pro Screen mit eigenem `key`
// verwenden, damit der Wechsel die Animation auslöst.
export default function Fade({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out', clearProps: 'opacity' },
    );
    return () => {
      tween.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
