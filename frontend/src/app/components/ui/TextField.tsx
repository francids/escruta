import { twMerge } from "tailwind-merge";

type TextFieldProps = {
  id: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
};

export default function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onKeyDown,
  className = "",
  placeholder,
  required = false,
  disabled = false,
  autoFocus = false,
}: TextFieldProps) {
  return (
    <div className={label ? twMerge(`mb-4 ${className}`) : className}>
      {label && (
        <label
          className="block text-gray-700 dark:text-gray-300 mb-2 select-none"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xs focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </div>
  );
}
