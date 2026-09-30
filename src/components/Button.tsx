import type { ButtonHTMLAttributes } from 'react';
import arrowBlack from '../assets/icons/arrow-black.svg';
import arrowWhite from '../assets/icons/arrow-white.svg';
import check from '../assets/icons/check.svg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'black' | 'white';
  icon?: 'arrow' | 'down' | 'check';
};

export default function Button({ variant = 'black', icon = 'arrow', children, className = '', ...rest }: Props) {
  return (
    <button
      type="button"
      className={`flex h-[60px] w-full shrink-0 items-center justify-between rounded-[10px] px-[15px] text-left text-[12px] disabled:opacity-40 ${
        variant === 'black' ? 'bg-black text-white' : 'bg-white text-black'
      } ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {icon === 'check' ? (
        <img alt="" src={check} />
      ) : (
        <img
          alt=""
          className={icon === 'down' ? 'rotate-90' : ''}
          src={variant === 'black' ? arrowWhite : arrowBlack}
        />
      )}
    </button>
  );
}
