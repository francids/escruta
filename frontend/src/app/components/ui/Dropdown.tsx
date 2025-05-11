type DropdownProps<T extends string> = {
  options: T[];
  selectedOption: T;
  onSelect: (option: T) => void;
  label?: string;
  className?: string;
};

export default function Dropdown<T extends string>({
  options,
  selectedOption,
  onSelect,
  label,
  className = "",
}: DropdownProps<T>) {
  return (
    <div className="flex items-center gap-2">
      {label && (
        <label className="text-base font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={selectedOption}
          onChange={(e) => onSelect(e.target.value as T)}
          className={`block w-full h-10 px-4 py-2 text-base text-gray-900 bg-white border border-gray-300 rounded-xs
          hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:border-blue-500 
          dark:focus:ring-blue-500 dark:focus:ring-offset-gray-900 select-none ${className}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
