import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "lib/tailwind";

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
        style={tw`flex-row bg-gray-900 rounded-sm border border-gray-700 mb-2 p-1`}
      >
        {items.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={tw.style(
              `flex-1 py-2 items-center rounded-sm`,
              activeTabId === tab.id ? "bg-gray-700" : ""
            )}
            onPress={() => handleTabClick(tab.id)}
            activeOpacity={0.7}
          >
            <Text
              style={tw.style(
                `text-gray-400 font-normal text-base`,
                activeTabId === tab.id ? "text-gray-100 font-medium" : ""
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
