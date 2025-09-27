import { PropsWithChildren, useState } from "react";
import { ThemeContext, ThemeOptions } from "contexts";
import tw from "lib/tailwind";
import { useAppColorScheme, useDeviceContext } from "twrnc";
import useStorage from "hooks/useStorage";
import { useColorScheme } from "react-native";

const THEME_STORAGE_KEY = "schemaPreference";

export default function ThemeProvider(props: PropsWithChildren) {
  const { getItem, setItem } = useStorage();
  const deviceColorScheme = useColorScheme();

  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: getItem<ThemeOptions>(THEME_STORAGE_KEY) || "device",
  });

  const [colorScheme, , setColorScheme] = useAppColorScheme(tw);
  const [userPreference, setUserPreference] = useState<ThemeOptions>(
    getItem<ThemeOptions>(THEME_STORAGE_KEY) || "device"
  );

  function setTheme(theme: ThemeOptions) {
    setItem(THEME_STORAGE_KEY, theme);
    setUserPreference(theme);
    if (theme === "device") {
      theme = deviceColorScheme === "dark" ? "dark" : "light";
    }
    setColorScheme(theme);
  }

  return (
    <ThemeContext.Provider
      key={tw.memoBuster}
      {...props}
      value={{ colorScheme, userPreference, setTheme }}
    />
  );
}
