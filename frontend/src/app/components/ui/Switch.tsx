import { twMerge } from "tailwind-merge";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  id?: string;
};

export default function Switch({
  checked,
  onChange,
  disabled = false,
  className = "",
  label,
  id,
}: SwitchProps) {
  return (
    <label
      className={twMerge(
        "inline-flex items-center cursor-pointer select-none gap-3",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      htmlFor={id}
    >
      {label && (
        <span className="text-base font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <span className="relative inline-block w-11 h-6">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span
          className={twMerge(
            `absolute left-0 top-0 w-11 h-6 rounded-full transition-colors duration-200
                        border border-gray-300 dark:border-gray-600
                        bg-gray-200 dark:bg-gray-700
                        peer-checked:bg-blue-500 peer-checked:dark:bg-blue-600
                        peer-focus:ring-2 peer-focus:ring-gray-700 dark:peer-focus:ring-gray-200
                        peer-checked:peer-focus:ring-blue-500 peer-focus:ring-offset-2
                        dark:peer-focus:ring-offset-gray-900`
          )}
        />
        <span
          className={twMerge(
            `absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white dark:bg-gray-200 shadow
                        transition-transform duration-200
                        peer-checked:translate-x-5`
          )}
        />
      </span>
    </label>
  );
}
