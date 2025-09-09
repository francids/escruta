import { twMerge } from "tailwind-merge";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        `bg-gray-50 dark:bg-gray-800/80 p-4 rounded-xs border border-gray-200 dark:border-gray-600`,
        className
      )}
    >
      {children}
    </div>
  );
}
