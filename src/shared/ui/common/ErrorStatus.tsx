interface ErrorStatusProps {
  text?: string,
}

export default function ErrorStatus({ text }: ErrorStatusProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-caption text-red-500">
        {text ?? "오류가 발생했습니다"}
      </p>
    </div>
  );
}
