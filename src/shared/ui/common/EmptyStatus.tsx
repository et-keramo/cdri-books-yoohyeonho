interface EmptyStatusProps {
  icon: string,
  text: string,
}

export default function EmptyStatus({ icon, text }: EmptyStatusProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src={icon}
        alt="빈 아이콘"
        className="w-20 h-20 mb-4"
      />
      <p className="text-caption text-textSecondary">
        {text}
      </p>
    </div>
  );
}
