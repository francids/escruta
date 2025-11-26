import { cn } from "@/lib/utils";

type IconButtonProps = {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  ariaLabel?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tabIndex?: number;
};

export default function IconButton({
  icon,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  ariaLabel,
  size = "md",
  tabIndex,
}: IconButtonProps) {
  const baseStyles =
    "flex items-center justify-center rounded-xs transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";

  const variantStyles = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700",
    ghost:
      "bg-transparent text-gray-800 hover:bg-gray-200/60 focus:ring-gray-400 dark:text-gray-200 dark:hover:bg-gray-600",
  };

  const sizeStyles = {
    xs: "w-6 h-6 p-1",
    sm: "w-8 h-8 p-1.5",
    md: "w-10 h-10 p-2.5",
    lg: "w-12 h-12 p-3",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed !hover:bg-inherit !dark:hover:bg-inherit";

  return (
    <button
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        {
          [disabledStyles]: disabled,
        },
        className
      )}
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      {icon}
    </button>
  );
}
