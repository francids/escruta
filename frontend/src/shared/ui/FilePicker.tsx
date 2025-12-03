import { cn } from "@/lib/utils";
import { useState } from "react";
import { UploadIcon } from "@/shared/icons";

type FilePickerProps = {
  id: string;
  label?: string;
  onChange: (file: File | null) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  value?: File | null;
};

export default function FilePicker({
  id,
  label,
  onChange,
  className = "",
  placeholder = "Choose a file...",
  disabled = false,
  accept,
  multiple = false,
  value,
}: FilePickerProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    } else {
      onChange(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  const baseStyles = cn(
    "relative w-full border-2 border-dashed rounded-xs transition-all duration-200 cursor-pointer",
    "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800",
    "hover:border-blue-400 hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-gray-700",
    {
      "opacity-50 cursor-not-allowed hover:border-gray-300 hover:bg-gray-50 dark:hover:border-gray-600 dark:hover:bg-gray-800":
        disabled,
      "border-blue-500 bg-blue-50 dark:bg-gray-700": dragOver,
    },
    className
  );

  return (
    <div className={label ? "mb-4" : ""}>
      {label && (
        <label
          className="block text-gray-700 dark:text-gray-300 mb-2 select-none"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <div
        className={baseStyles}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={id}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          disabled={disabled}
          accept={accept}
          multiple={multiple}
        />

        <div className="p-6 text-center pointer-events-none">
          <div className="mb-2">
            <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
          </div>

          {value ? (
            <div className="text-sm">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {value.name}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </div>
            </div>
          ) : (
            <div className="text-sm">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                Click to upload or drag and drop
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {placeholder}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
