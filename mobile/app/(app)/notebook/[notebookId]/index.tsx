import { router, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, Pressable } from "react-native";
import tw from "lib/tailwind";
import { Divider, Tab, Button, MenuButton, IconButton } from "components/ui";
import SourceCard from "components/SourceCard";
import NoteCard from "components/NoteCard";
import {
  AddIcon,
  DotsVerticalIcon,
  SendIcon,
  ToolIcon,
} from "components/icons";
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
    <View style={tw`flex flex-1 bg-neutral-950`}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <MenuButton
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
                    console.log(
                      `Delete notebook pressed for ID: ${notebookId}`
                    ),
                },
              ]}
              position="bottom-right"
              button={({ onPress }) => (
                <IconButton
                  icon={<DotsVerticalIcon />}
                  variant="ghost"
                  onPress={onPress}
                />
              )}
            />
          ),
        }}
      />
      <ScrollView style={tw`flex-1 px-4`} contentContainerStyle={tw`py-6`}>
        {/* Notebook Title */}
        <Text style={tw`text-white text-2xl font-bold`}>
          How traffic lights work?
        </Text>

        {/* Notebook Summary */}
        <Text style={tw`text-white text-lg mt-4`}>
          Summary of the notebook:
        </Text>
        <Text selectable style={tw`text-gray-300 text-lg mt-2`}>
          Traffic lights use timed cycles to control vehicle and pedestrian flow
          at intersections. Red stops traffic, green allows movement, and yellow
          warns of upcoming changes. Modern systems use sensors to adjust timing
          based on real-time conditions.
        </Text>

        <Divider style={tw`opacity-30`} />

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

        <Divider style={tw`opacity-30`} />

        <Tab
          items={[
            {
              id: "1",
              label: "Sources",
              content: (
                <View>
                  <Pressable
                    style={({ pressed }) => [
                      tw`bg-gray-900 rounded-none p-4 mb-3 border border-dashed border-gray-700 flex-row items-center justify-center opacity-70`,
                      pressed && tw`bg-gray-800/60`,
                    ]}
                    onPress={() => {
                      console.log("Add source pressed");
                    }}
                  >
                    <View
                      style={tw`flex-row items-center justify-center w-full`}
                    >
                      <Text
                        style={tw`text-gray-400 text-base font-normal text-center mr-2`}
                      >
                        Add source
                      </Text>
                      <AddIcon width={20} height={20} color="#9ca3af" />
                    </View>
                  </Pressable>
                  {dummySources.map((source) => (
                    <SourceCard key={source.id} source={source} />
                  ))}
                </View>
              ),
            },
            {
              id: "2",
              label: "Notes",
              content: (
                <View>
                  <Pressable
                    style={({ pressed }) => [
                      tw`bg-gray-900 rounded-none p-4 mb-3 border border-dashed border-gray-700 flex-row items-center justify-center opacity-70`,
                      pressed && tw`bg-gray-800/60`,
                    ]}
                    onPress={() => {
                      console.log("Add note pressed");
                    }}
                  >
                    <View
                      style={tw`flex-row items-center justify-center w-full`}
                    >
                      <Text
                        style={tw`text-gray-400 text-base font-normal text-center mr-2`}
                      >
                        Add note
                      </Text>
                      <AddIcon width={20} height={20} color="#9ca3af" />
                    </View>
                  </Pressable>
                  {dummyNotes.map((note) => (
                    <NoteCard key={note.id} note={note} />
                  ))}
                </View>
              ),
            },
          ]}
        />
      </ScrollView>
    </View>
  );
}
