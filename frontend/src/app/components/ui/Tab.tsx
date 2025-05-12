import { useState } from "react";

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
      <div className="flex flex-grow border-b border-gray-300 dark:border-gray-700">
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex flex-grow justify-center items-center h-10 px-4 text-sm font-medium select-none transition-colors dark:focus:ring-offset-gray-900 ${
              activeTabId === tab.id
                ? "border-b-2 border-blue-500 text-blue-500 dark:text-blue-400"
                : "text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            }
            `}
          >
            <span
              className={`${activeTabId === tab.id ? "font-semibold" : ""}`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className="h-[calc(100%-3.5rem)] absolute inset-x-0 bottom-0 flex-grow max-h-full overflow-hidden mt-2 z-0">
        {activeTab?.content}
      </div>
    </div>
  );
}
