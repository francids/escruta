import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw, { themed } from "lib/tailwind";
import useTheme from "../../hooks/useTheme";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  style?: object;
};

export default function Tabs({
  items,
  defaultActiveTab,
  onChange,
  style = {},
}: TabsProps) {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === "dark";
  
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
    <View style={[tw`w-full flex-1`, style]}>
      <View
        style={tw`flex-row ${themed(
          "bg-neutral-100 border-neutral-200",
          "bg-gray-900 border-gray-700",
          isDark
        )} rounded-sm border mb-2 p-1`}
      >
        {items.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={tw.style(
              `flex-1 py-2 items-center rounded-sm`,
              activeTabId === tab.id 
                ? themed("bg-white", "bg-gray-700", isDark)
                : ""
            )}
            onPress={() => handleTabClick(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={tw.style(
                themed(
                  "text-neutral-600 font-normal text-base",
                  "text-gray-400 font-normal text-base",
                  isDark
                ),
                activeTabId === tab.id 
                  ? themed(
                      "text-black font-medium",
                      "text-gray-100 font-medium",
                      isDark
                    )
                  : ""
              )}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`flex-1 w-full mt-2`}>{activeTab?.content}</View>
    </View>
  );
}
