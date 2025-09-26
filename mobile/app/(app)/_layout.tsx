import { Stack } from "expo-router";
import Logo from "components/Logo";
import Header from "components/Header";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        header: ({ back, options }) => (
          <Header
            title={options.headerTitle}
            centerTitle={options.headerTitleAlign === "center"}
            showBackButton={back ? true : false}
            action={
              typeof options.headerRight === "function"
                ? options.headerRight({})
                : options.headerRight
            }
          />
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <Logo style="w-24 h-8 text-black dark:text-white" />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="notebook/[notebookId]/index"
        options={{
          headerTitle: "Notebook",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="notebook/[notebookId]/chat"
        options={{
          headerTitle: "Chat",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
