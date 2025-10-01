import { useState, useRef } from "react";
import { View, Text, Pressable, Animated, Easing } from "react-native";
import tw from "lib/tailwind";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  style?: object;
};

export default function Tabs({
  tabs,
  defaultActiveTab,
  onChange,
  style = {},
}: TabsProps) {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultActiveTab || (tabs.length > 0 ? tabs[0].id : "")
  );
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTabClick = (tabId: string) => {
    if (tabId === activeTabId) return;

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setActiveTabId(tabId);
      if (onChange) {
        onChange(tabId);
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  if (tabs.length === 0) return null;

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <View style={[tw`w-full flex-1`, style]}>
      <View
        style={tw`flex-row bg-gray-100/35 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm border mb-2 p-1`}
      >
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.id}
            style={({ pressed }) => [
              tw.style(
                `flex-1 py-2 items-center rounded-sm`,
                index === 0
                  ? "mr-0.5"
                  : index === tabs.length - 1
                    ? "ml-0.5"
                    : "mx-0.5",
                activeTabId === tab.id ? "bg-white dark:bg-gray-700" : "",
                pressed && activeTabId !== tab.id
                  ? "bg-gray-50/50 dark:bg-gray-800"
                  : ""
              ),
            ]}
            onPress={() => handleTabClick(tab.id)}
          >
            <Text
              style={tw.style(
                "text-gray-600 dark:text-gray-400 font-normal text-base",
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
      <Animated.View style={[tw`flex-1 w-full mt-2`, { opacity: fadeAnim }]}>
        {activeTab?.content}
      </Animated.View>
    </View>
  );
}
