import { useState, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

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

export interface TabsRef {
  setActiveTab: (tabId: string) => void;
}

const Tabs = forwardRef<TabsRef, TabsProps>(
  ({ items, defaultActiveTab, onChange, className = "" }, ref) => {
    const [activeTabId, setActiveTabId] = useState<string>(
      defaultActiveTab || (items.length > 0 ? items[0].id : "")
    );

    useImperativeHandle(ref, () => ({
      setActiveTab: (tabId: string) => {
        setActiveTabId(tabId);
        if (onChange) {
          onChange(tabId);
        }
      },
    }));

    const handleTabClick = (tabId: string) => {
      setActiveTabId(tabId);
      if (onChange) {
        onChange(tabId);
      }
    };

    if (items.length === 0) return null;

    const activeTab = items.find((tab) => tab.id === activeTabId);

    return (
      <div className={cn("w-full relative", className)}>
        <div className="flex w-full justify-start p-1 bg-gray-50 dark:bg-gray-800/80 rounded-xs border border-gray-200 dark:border-gray-600">
          {items.map((tab, index) => (
            <div key={index} className="relative w-full group">
              {activeTabId === tab.id && (
                <motion.div
                  className="absolute inset-0 bg-white dark:bg-gray-700/90 rounded-xs border border-gray-200/50 dark:border-gray-600/50"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              )}
              {activeTabId !== tab.id && (
                <motion.div
                  className="absolute inset-0 bg-gray-100/40 dark:bg-gray-700/40 rounded-xs opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
              )}
              <button
                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "w-full px-6 py-1.5 text-sm font-medium rounded-xs transition-all duration-150 relative group-hover:scale-[1.02]",
                  {
                    "transform-none": activeTabId === tab.id,
                  }
                )}
              >
                <span
                  className={cn("text-sm transition-all duration-150", {
                    "text-gray-800 dark:text-gray-100 font-semibold":
                      activeTabId === tab.id,
                    "text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-800 dark:group-hover:text-gray-200":
                      activeTabId !== tab.id,
                  })}
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              className="h-full"
            >
              {activeTab?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
