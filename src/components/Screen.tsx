import type { ReactNode } from 'react';

type Props = {
  tone?: 'brand' | 'black';
  children: ReactNode;
  footer?: ReactNode;
};

export default function Screen({ tone = 'brand', children, footer }: Props) {
  return (
    <div
      className={`flex min-h-dvh flex-col px-6 pt-[calc(70px+env(safe-area-inset-top))] pb-[calc(24px+env(safe-area-inset-bottom))] ${
        tone === 'black' ? 'bg-black text-white' : 'bg-brand text-black'
      }`}
    >
      <div className="flex flex-1 flex-col items-center gap-8">{children}</div>
      {footer && <div className="flex flex-col items-center gap-[11px]">{footer}</div>}
    </div>
  );
}
