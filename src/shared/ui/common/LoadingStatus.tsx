interface LoadingStatusProps {
  text?: string,
}

export default function LoadingStatus({ text }: LoadingStatusProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-caption text-textSecondary">{text ?? "로딩중..."}</p>
    </div>
  );
}
