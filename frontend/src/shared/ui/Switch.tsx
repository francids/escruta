import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { CheckIcon, CloseIcon } from "@/shared/icons";

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
      className={cn(
        "group relative inline-flex items-center cursor-pointer select-none gap-3",
        "transition-all duration-200 ease-in-out",
        {
          "opacity-50 cursor-not-allowed pointer-events-none": disabled,
        },
        className
      )}
      htmlFor={id}
    >
      {label && (
        <span
          className={cn(
            "text-base font-medium text-gray-700 dark:text-gray-300",
            "transition-colors duration-200",
            "flex items-center"
          )}
        >
          {label}
        </span>
      )}

      <div className="relative inline-block w-12 h-7">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />

        {/* Track/Background */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-200 ease-in-out",
            "border border-gray-300 dark:border-gray-600",
            "bg-gray-100 dark:bg-gray-700",
            "peer-checked:bg-blue-500 peer-checked:dark:bg-blue-600",
            "peer-checked:border-transparent",
            "peer-focus:ring-1 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-400"
          )}
        />

        {/* Thumb */}
        <div
          className={cn(
            "absolute rounded-full transition-all duration-200 ease-in-out",
            "bg-white dark:bg-gray-200",
            "border border-gray-200 dark:border-gray-300",
            "w-5 h-5 top-1 left-1",
            "peer-checked:translate-x-5",
            "peer-checked:bg-white peer-checked:border-white",
            "flex items-center justify-center"
          )}
        >
          <AnimatePresence mode="wait">
            {checked ? (
              <motion.div
                key="check"
                initial={{ scale: 0.8, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, rotate: 20 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="w-3 h-3 text-blue-500"
              >
                <CheckIcon />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ scale: 0.8, rotate: 20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.8, rotate: -20 }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
                className="w-3 h-3 text-gray-500"
              >
                <CloseIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </label>
  );
}
