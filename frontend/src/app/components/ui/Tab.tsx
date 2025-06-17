import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
};

export default function Tabs({
  items,
  defaultActiveTab,
  onChange,
  className = "",
}: TabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultActiveTab || (items.length > 0 ? items[0].id : "")
  );

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  if (items.length === 0) return null;

  const activeTab = items.find((tab) => tab.id === activeTabId);

  return (
    <div className={`w-full relative ${className}`}>
      <div className="flex w-full justify-start p-1 bg-gray-50 dark:bg-gray-800 rounded-xs border border-gray-200 dark:border-gray-600">
        {items.map((tab, index) => (
          <div key={index} className="relative w-full">
            {activeTabId === tab.id && (
              <motion.div
                className="absolute inset-0 bg-gray-100 dark:bg-gray-700 rounded-xs"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <button
              onClick={() => handleTabClick(tab.id)}
              className={`w-full px-6 py-1.5 text-sm font-medium rounded-xs transition-all duration-300 relative ${
                activeTabId === tab.id
                  ? ""
                  : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <span
                className={`${
                  activeTabId === tab.id
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-600 dark:text-gray-400"
                }
                  font-semibold text-sm transition-all duration-200`}
              >
                {tab.label}
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className="h-[calc(100%-3.5rem)] absolute inset-x-0 bottom-0 flex-grow max-h-full overflow-hidden mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
