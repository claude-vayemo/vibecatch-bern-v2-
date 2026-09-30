import type { ReactNode } from 'react';
import select from '../assets/icons/select.svg';
import selectActive from '../assets/icons/select-active.svg';

type Props = {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

// Zeile mit Auswahl-Kreis: Team in der Team-Auswahl, Mitglied in der Lobby.
export default function Item({ active = false, disabled, onClick, children }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-[60px] w-full items-center justify-between gap-3 rounded-[12px] border border-black pr-[11px] pl-[23px] text-left text-black disabled:opacity-40 ${
        active ? 'bg-white' : 'bg-brand'
      }`}
    >
      <span className="min-w-0">{children}</span>
      <img alt="" className="size-8 shrink-0" src={active ? selectActive : select} />
    </button>
  );
}
