import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "danger";
};

type MenuProps = {
  items: MenuItem[];
  trigger: React.ReactNode;
  align?: "left" | "right";
  className?: string;
};

export default function Menu({
  items,
  trigger,
  align = "right",
  className = "",
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div onClick={toggleMenu} ref={triggerRef}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute z-10 mt-2 rounded-xs bg-white shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-600",
            {
              "right-0": align === "right",
              "left-0": align === "left",
            }
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                className={cn(
                  "flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
                  {
                    "text-red-600 dark:text-red-400": item.variant === "danger",
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  item.onClick();
                }}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
