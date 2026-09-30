import type { InputHTMLAttributes } from 'react';

export default function TextInput({ className = '', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={`h-[60px] w-full rounded-[12px] border border-black bg-white px-[15px] text-black outline-none placeholder:text-black ${className}`}
      {...rest}
    />
  );
}
