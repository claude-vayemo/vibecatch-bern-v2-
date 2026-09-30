type Props = { title: string; subtitle?: string };

export default function ScreenHeader({ title, subtitle }: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-3 text-center">
      <h1 className="font-display text-[16px] font-bold whitespace-pre-line">{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
