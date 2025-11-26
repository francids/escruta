import { cn } from "@/lib/utils";

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ToolCard({
  icon,
  title,
  description,
  onClick,
  disabled = false,
  className,
}: ToolCardProps) {
  const baseClasses = `
    group relative overflow-hidden rounded-xs border cursor-pointer 
    transition-all duration-300 ease-out select-none
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 
    dark:focus:ring-offset-gray-900
    bg-white dark:bg-gray-800
    border-gray-200 dark:border-gray-600
    hover:bg-blue-50 dark:hover:bg-gray-700
    hover:border-blue-300 dark:hover:border-gray-500
    hover:scale-[101%]
  `;

  const disabledClasses = `
    opacity-50 cursor-not-allowed 
    !hover:scale-100
    !hover:bg-white !dark:hover:bg-gray-800
    !hover:border-gray-200 !dark:hover:border-gray-600
  `;

  return (
    <div
      className={cn(baseClasses, { [disabledClasses]: disabled }, className)}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-disabled={disabled}
    >
      <div className="relative p-4 h-full flex flex-col">
        {/* Icon container */}
        <div className="flex items-start justify-between mb-3">
          <div className="p-3 rounded-xs transition-all duration-300 bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-800">
            <div className="w-5 h-5 transition-all duration-300 transform group-hover:scale-110 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight mb-1 group-hover:text-blue-900 dark:group-hover:text-blue-100 transition-colors duration-300">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
