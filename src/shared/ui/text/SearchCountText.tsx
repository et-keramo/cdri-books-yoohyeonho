interface SearchCountTextProps {
  title: string;
  count: number;
}

export default function SearchCountText({ title, count }: SearchCountTextProps) {
  return (
    <p className="flex items-center gap-4 mb-9 text-left text-[16px] leading-[24px] font-medium text-textPrimary">
      <span>{title}</span>
      <span>
        총 <span className="font-bold text-primary">{count}</span>건
      </span>
    </p>
  );
}
