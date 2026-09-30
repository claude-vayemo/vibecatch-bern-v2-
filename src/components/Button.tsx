import type { ButtonHTMLAttributes } from 'react';
import arrowBlack from '../assets/icons/arrow-black.svg';
import arrowWhite from '../assets/icons/arrow-white.svg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'black' | 'white';
};

export default function Button({ variant = 'black', children, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`flex h-[60px] w-full items-center justify-between rounded-[10px] px-[15px] text-left disabled:opacity-40 ${
        variant === 'black' ? 'bg-black text-white' : 'bg-white text-black'
      } ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <img alt="" src={variant === 'black' ? arrowWhite : arrowBlack} />
    </button>
  );
}
