import arrowBlack from '../assets/icons/arrow-small-black.svg';
import arrowWhite from '../assets/icons/arrow-small-white.svg';

type Props = { tone?: 'black' | 'white'; onClick: () => void };

export default function BackLink({ tone = 'black', onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-[17px] flex h-6 items-center gap-2 ${tone === 'white' ? 'text-white' : 'text-black'}`}
    >
      <img alt="" className="rotate-180" src={tone === 'white' ? arrowWhite : arrowBlack} />
      Back
    </button>
  );
}
