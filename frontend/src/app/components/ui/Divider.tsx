import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
  label?: string;
};

export default function Divider({
  className = "",
  orientation = "horizontal",
  label,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "inline-block h-full w-px bg-gray-200 dark:bg-gray-700",
          className
        )}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("relative flex items-center py-2", className)}>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
      </div>
    );
  }

  return (
    <hr
      className={cn(
        "border-t border-gray-200 dark:border-gray-700 my-2",
        className
      )}
    />
  );
}
