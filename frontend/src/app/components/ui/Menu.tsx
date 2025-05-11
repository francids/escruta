import { useRef, useState, useEffect } from "react";

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
    <div className={`relative ${className}`}>
      <div onClick={toggleMenu} ref={triggerRef}>
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute z-10 mt-2 rounded-xs bg-white shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-600 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                className={`flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 ${
                  item.variant === "danger"
                    ? "text-red-600 dark:text-red-400"
                    : ""
                }`}
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
