import { type ReactNode, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext, ThemeOptions } from "../contexts";

const THEME_STORAGE_KEY = "themePreference";

const determineEffectiveTheme = (
  preference: ThemeOptions
): "light" | "dark" => {
  if (preference === ThemeOptions.Light) return "light";
  if (preference === ThemeOptions.Dark) return "dark";

  // For system preference, use Appearance API
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === "dark" ? "dark" : "light";
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [themePreference, setThemePreference] = useState<ThemeOptions>(
    ThemeOptions.System
  );
  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(() => {
    return determineEffectiveTheme(ThemeOptions.System);
  });

  // Load theme preference from storage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme && Object.values(ThemeOptions).includes(storedTheme as ThemeOptions)) {
          const preference = storedTheme as ThemeOptions;
          setThemePreference(preference);
          setEffectiveTheme(determineEffectiveTheme(preference));
        }
      } catch (error) {
        console.warn("Failed to load theme preference:", error);
      }
    };

    loadTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themePreference === ThemeOptions.System) {
        const newTheme = colorScheme === "dark" ? "dark" : "light";
        setEffectiveTheme(newTheme);
      }
    });

    return () => subscription.remove();
  }, [themePreference]);

  const setTheme = async (newTheme: ThemeOptions) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemePreference(newTheme);
      const effectiveTheme = determineEffectiveTheme(newTheme);
      setEffectiveTheme(effectiveTheme);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  };

  const value = {
    themePreference,
    effectiveTheme,
    setTheme,
    ThemeOptions,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}