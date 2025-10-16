import { twMerge } from "tailwind-merge";

type ChipVariants = "default" | "primary";

interface ChipProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: ChipVariants;
  icon?: React.ReactNode;
  title?: string;
}

export default function Chip({
  children,
  onClick,
  className = "",
  variant = "default",
  icon,
  title,
}: ChipProps) {
  const base =
    "inline-flex items-center gap-2 rounded-xs px-3 py-1 text-sm font-medium transition-colors select-none";

  const variantStyles: Record<ChipVariants, string> = {
    default:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      title={title}
      className={twMerge(base, variantStyles[variant], className)}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span className="truncate">{children}</span>
    </div>
  );
}
