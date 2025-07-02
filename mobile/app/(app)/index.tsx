import { View, Text, ScrollView } from "react-native";
import tw from "../../lib/tailwind";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Notebook from "../../interfaces/Notebook";
import NotebookCard from "../../components/NotebookCard";
import { IconButton } from "../../components/ui";
import { AddIcon } from "../../components/icons";

export default function AppPage() {
  const insets = useSafeAreaInsets();

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
    <View style={tw`flex flex-1`}>
      <Header
        title={<Logo style="w-28 h-8 text-white" />}
        action={<IconButton icon={<AddIcon />} variant="primary" size="sm" />}
      />
      <ScrollView
        style={tw`bg-neutral-950`}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          ...(dummyNotebooks.length === 0 && { flexGrow: 1 }),
        }}
      >
        {dummyNotebooks.length > 0 ? (
          <View style={tw`flex flex-col gap-4 p-4`}>
            {dummyNotebooks.map((notebook) => (
              <NotebookCard notebook={notebook} key={notebook.id} />
            ))}
          </View>
        ) : (
          <View style={tw`flex flex-1 items-center justify-center`}>
            <Text style={tw`text-neutral-400 text-center text-lg`}>
              No notebooks yet. Create your first one!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
