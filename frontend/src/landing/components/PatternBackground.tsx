export default function PatternBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 bg-gray-100 dark:bg-gray-900 opacity-80 bg-[linear-gradient(var(--color-blue-100)_2px,transparent_2px),linear-gradient(90deg,var(--color-blue-100)_2px,transparent_2px),linear-gradient(var(--color-blue-100)_1px,transparent_1px),linear-gradient(90deg,var(--color-blue-100)_1px,var(--color-blue-50)_1px)] dark:bg-[linear-gradient(var(--color-blue-950)_2px,transparent_2px),linear-gradient(90deg,var(--color-blue-950)_2px,transparent_2px),linear-gradient(var(--color-blue-950)_1px,transparent_1px),linear-gradient(90deg,var(--color-blue-950)_1px,var(--color-blue-900)_1px)] bg-[length:50px_50px,50px_50px,10px_10px,10px_10px] ${className}`}
    ></div>
  );
}
