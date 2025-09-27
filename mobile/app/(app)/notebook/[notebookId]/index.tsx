import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import tw from "lib/tailwind";
import { Tab, Button } from "components/ui";
import SourceCard from "components/SourceCard";
import NoteCard from "components/NoteCard";
import Header from "components/Header";
import { AddIcon, SendIcon, ToolIcon } from "components/icons";
import type { Source, Note } from "interfaces";

export default function NotebookScreen() {
  const { notebookId } = useLocalSearchParams();

  const dummySources: Source[] = [
    {
      id: "1",
      notebookId: "1",
      title: "Wikipedia",
      content: "General information about traffic lights.",
      link: "https://es.wikipedia.org/wiki/Sem%C3%A1foro",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      notebookId: "1",
      title: "Traffic Manual",
      content: "Traffic rules and signals.",
      link: "https://manualtrafico.com/semaforos",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      notebookId: "1",
      title: "Engineering Blog",
      content: "Technical analysis of smart traffic light systems.",
      link: "https://ingenieria.com/semaforos-inteligentes",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      notebookId: "1",
      title: "Road Magazine",
      content: "Statistics on accidents and traffic lights.",
      link: "https://revistavial.com/accidentes-semaforos",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const dummyNotes: Note[] = [
    {
      id: "1",
      notebookId: "1",
      title: "Basic operation",
      content:
        "The traffic light alternates between red, yellow, and green to control the flow.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      notebookId: "1",
      title: "Sensors",
      content: "Some modern traffic lights use sensors to adjust the timing.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      notebookId: "1",
      title: "Energy efficiency",
      content:
        "LED traffic lights consume less energy and require less maintenance.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      notebookId: "1",
      title: "Pedestrian interaction",
      content:
        "Crosswalk buttons allow pedestrians to request a green light at intersections.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <View style={tw`flex flex-1 bg-white dark:bg-neutral-950`}>
      <Header
        title="How traffic lights work?"
        subtitle="Notebook"
        showBackButton={true}
        menuItems={[
          {
            text: "Edit title",
            onPress: () => console.log("Edit title pressed"),
          },
          {
            text: "Regenerate summary",
            onPress: () => console.log("Regenerate summary pressed"),
          },
          {
            text: "Delete notebook",
            onPress: () =>
              console.log(`Delete notebook pressed for ID: ${notebookId}`),
          },
        ]}
      />
      <ScrollView
        style={tw`flex-1 bg-gray-50 dark:bg-gray-950`}
        contentContainerStyle={tw`py-6`}
      >
        {/* Notebook Summary Section */}
        <View style={tw`px-4 mb-6`}>
          <Text
            style={tw`text-black dark:text-white text-lg font-semibold mb-3`}
          >
            Summary
          </Text>
          <View
            style={tw`bg-white dark:bg-gray-900 rounded-sm p-4 border border-gray-200 dark:border-gray-700`}
          >
            <Text
              selectable
              style={tw`text-neutral-700 dark:text-gray-300 text-base leading-6`}
            >
              Traffic lights use timed cycles to control vehicle and pedestrian
              flow at intersections. Red stops traffic, green allows movement,
              and yellow warns of upcoming changes. Modern systems use sensors
              to adjust timing based on real-time conditions.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={tw`px-4 mb-6`}>
          <View style={tw`flex-col gap-3`}>
            <Button
              text="Chat"
              icon={<SendIcon width={16} height={16} />}
              fullWidth
              onPress={() => {
                router.push(`/notebook/${notebookId}/chat`);
              }}
            />
            <Button
              text="Tools"
              variant="secondary"
              icon={<ToolIcon width={16} height={16} />}
              fullWidth
            />
          </View>
        </View>

        <View style={tw`px-4`}>
          <Tab
            items={[
              {
                id: "1",
                label: `Sources (${dummySources.length})`,
                content: (
                  <View style={tw`mt-4`}>
                    <Pressable
                      style={({ pressed }) => [
                        tw`bg-white dark:bg-gray-900 rounded-sm p-4 mb-4 border border-dashed border-neutral-300 dark:border-gray-700 flex-row items-center justify-center`,
                        pressed && tw`bg-neutral-100 dark:bg-gray-800/60`,
                      ]}
                      onPress={() => {
                        console.log("Add source pressed");
                      }}
                    >
                      <View
                        style={tw`flex-row items-center justify-center w-full`}
                      >
                        <Text
                          style={tw`text-neutral-600 dark:text-gray-400 text-base font-medium text-center mr-2`}
                        >
                          Add source
                        </Text>
                        <AddIcon width={20} height={20} color="#9ca3af" />
                      </View>
                    </Pressable>
                    <View style={tw`flex-col gap-3`}>
                      {dummySources.map((source) => (
                        <SourceCard key={source.id} source={source} />
                      ))}
                    </View>
                  </View>
                ),
              },
              {
                id: "2",
                label: `Notes (${dummyNotes.length})`,
                content: (
                  <View style={tw`mt-4`}>
                    <Pressable
                      style={({ pressed }) => [
                        tw`bg-white dark:bg-gray-900 rounded-sm p-4 mb-4 border border-dashed border-neutral-300 dark:border-gray-700 flex-row items-center justify-center`,
                        pressed && tw`bg-neutral-100 dark:bg-gray-800/60`,
                      ]}
                      onPress={() => {
                        console.log("Add note pressed");
                      }}
                    >
                      <View
                        style={tw`flex-row items-center justify-center w-full`}
                      >
                        <Text
                          style={tw`text-neutral-600 dark:text-gray-400 text-base font-medium text-center mr-2`}
                        >
                          Add note
                        </Text>
                        <AddIcon width={20} height={20} color="#9ca3af" />
                      </View>
                    </Pressable>
                    <View style={tw`flex-col gap-3`}>
                      {dummyNotes.map((note) => (
                        <NoteCard key={note.id} note={note} />
                      ))}
                    </View>
                  </View>
                ),
              },
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
}
