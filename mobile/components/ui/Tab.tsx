import { useState } from "react";
import { View, Text, Pressable } from "react-native";
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
        style={tw`flex-row bg-neutral-100 dark:bg-gray-900 border-neutral-200 dark:border-gray-700 rounded-sm border mb-2 p-1`}
      >
        {items.map((tab) => (
          <Pressable
            key={tab.id}
            style={({ pressed }) => [
              tw.style(
                `flex-1 py-2 items-center rounded-sm`,
                activeTabId === tab.id ? "bg-white dark:bg-gray-700" : "",
                pressed && activeTabId !== tab.id
                  ? "bg-neutral-50 dark:bg-gray-800"
                  : ""
              ),
            ]}
            onPress={() => handleTabClick(tab.id)}
          >
            <Text
              style={tw.style(
                "text-neutral-600 dark:text-gray-400 font-normal text-base",
                activeTabId === tab.id
                  ? "text-black dark:text-gray-100 font-medium"
                  : ""
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={tw`flex-1 w-full mt-2`}>{activeTab?.content}</View>
    </View>
  );
}
