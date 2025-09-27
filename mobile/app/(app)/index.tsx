import { View, Text, ScrollView } from "react-native";
import tw from "lib/tailwind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Notebook } from "interfaces";
import NotebookCard from "components/NotebookCard";
import { FAB, Button } from "components/ui";
import { AddIcon } from "components/icons";
import Header from "components/Header";

export default function AppScreen() {
  const insets = useSafeAreaInsets();

  const currentUser = { fullName: "User" };

  const dummyNotebooks: Notebook[] = [
    {
      id: "1",
      // icon: "📚",
      title:
        "My Extremely Comprehensive and Overly Detailed Personal Notes Collection for All Life Matters",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
    },
    {
      id: "2",
      icon: "💼",
      title: "Work Projects",
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-18"),
    },
    {
      id: "3",
      icon: "🎓",
      title: "Study Materials",
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: "4",
      title: "Daily Journal",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-12"),
    },
    {
      id: "5",
      icon: "💡",
      title: "Ideas & Inspiration",
      createdAt: new Date("2023-12-20"),
      updatedAt: new Date("2024-01-08"),
    },
    {
      id: "6",
      icon: "🏠",
      title: "Home Organization",
      createdAt: new Date("2023-12-15"),
      updatedAt: new Date("2024-01-03"),
    },
  ];

  return (
    <View style={tw`flex flex-1 bg-white dark:bg-neutral-950`}>
      <Header
        title={`Welcome, ${currentUser?.fullName || "User"}!`}
        subtitle="Dashboard"
      />
      <ScrollView
        style={tw`flex-1 bg-gray-50 dark:bg-gray-950`}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 86,
          ...(dummyNotebooks.length === 0 && { flexGrow: 1 }),
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-1 p-4`}>
          {dummyNotebooks.length > 0 ? (
            <View style={tw`flex flex-col gap-3`}>
              {dummyNotebooks.map((notebook, index) => (
                <View key={index}>
                  <NotebookCard notebook={notebook} />
                </View>
              ))}
            </View>
          ) : (
            <View style={tw`flex-1 items-center justify-center px-6`}>
              <Text
                style={tw`text-neutral-400 dark:text-neutral-600 text-center`}
              >
                No notebooks. Create one!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <FAB
        icon={<AddIcon />}
        variant="primary"
        onPress={() => {
          console.log("FAB pressed");
        }}
      />
    </View>
  );
}
