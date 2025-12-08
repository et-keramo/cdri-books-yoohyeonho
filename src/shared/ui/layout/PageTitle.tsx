interface PageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <h2 className="mb-6 text-left text-title2 text-textTitle">
      {children}
    </h2>
  );
}
