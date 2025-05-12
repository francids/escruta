export default function CommonBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600 ${className}`}
    >
      {children}
    </div>
  );
}
