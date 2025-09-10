import { type ReactNode, useEffect, useState } from "react";
import { ThemeContext, ThemeOptions } from "@/contexts";
import { useCookie } from "@/hooks";

const THEME_COOKIE_KEY = "themePreference";

const determineEffectiveTheme = (
  preference: ThemeOptions
): "light" | "dark" => {
  if (preference === ThemeOptions.Light) return "light";
  if (preference === ThemeOptions.Dark) return "dark";

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
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
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [themePreference, setThemePreference] = useCookie<ThemeOptions>(
    THEME_COOKIE_KEY,
    ThemeOptions.System
  );

  const [effectiveTheme, setEffectiveTheme] = useState<"light" | "dark">(() => {
    const preference = themePreference || ThemeOptions.System;
    return determineEffectiveTheme(preference);
  });

  useEffect(() => {
    const currentPreference = themePreference || ThemeOptions.System;
    const theme = determineEffectiveTheme(currentPreference);
    applyTheme(theme);
    setEffectiveTheme(theme);
  }, [themePreference]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const currentPreference = themePreference || ThemeOptions.System;
      if (currentPreference === ThemeOptions.System) {
        const newTheme = e.matches ? "dark" : "light";
        applyTheme(newTheme);
        setEffectiveTheme(newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [themePreference]);

  const setTheme = (newTheme: ThemeOptions) => {
    setThemePreference(newTheme);
    const effectiveTheme = determineEffectiveTheme(newTheme);
    applyTheme(effectiveTheme);
    setEffectiveTheme(effectiveTheme);
  };

  const value = {
    themePreference: themePreference || ThemeOptions.System,
    effectiveTheme,
    setTheme,
    ThemeOptions,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
