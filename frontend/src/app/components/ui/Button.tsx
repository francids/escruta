type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
};

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  icon,
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xs px-4 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 select-none";

  const variantStyles = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700",
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed !hover:bg-inherit !dark:hover:bg-inherit";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? disabledStyles : ""
      } ${className}`}
      type="button"
      disabled={disabled}
    >
      {children}
      {icon && (
        <span className="ml-2 flex items-center justify-center w-4 h-4">
          {icon}
        </span>
      )}
    </button>
  );
}
