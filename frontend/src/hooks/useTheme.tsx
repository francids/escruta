import { useEffect, useState } from "react";
import useCookie from "./useCookie";

export enum ThemeOptions {
  System = "System",
  Light = "Light",
  Dark = "Dark",
}

const THEME_COOKIE_KEY = "themePreference";

export default function useTheme() {
  const [themePreference, setThemePreference] = useCookie<ThemeOptions>(
    THEME_COOKIE_KEY,
    ThemeOptions.System
  );

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(
    "light"
  );

  const determineEffectiveTheme = (
    preference: ThemeOptions
  ): "light" | "dark" => {
    if (preference === ThemeOptions.Light) return "light";
    if (preference === ThemeOptions.Dark) return "dark";

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  };

  const applyTheme = (theme: "light" | "dark") => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("dark", "light");

    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.add("light");
    }
    setEffectiveTheme(theme);
  };

  useEffect(() => {
    const theme = determineEffectiveTheme(
      themePreference || ThemeOptions.System
    );
    applyTheme(theme);
  }, [themePreference]);

  useEffect(() => {
    if (themePreference === ThemeOptions.System) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        const theme = e.matches ? "dark" : "light";
        applyTheme(theme);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [themePreference]);

  const setTheme = (newTheme: ThemeOptions) => {
    setThemePreference(newTheme);
    const effectiveTheme = determineEffectiveTheme(newTheme);
    applyTheme(effectiveTheme);
  };

  return {
    themePreference: themePreference || ThemeOptions.System,
    effectiveTheme,
    setTheme,
    ThemeOptions,
  };
}
