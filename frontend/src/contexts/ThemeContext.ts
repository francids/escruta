import { createContext } from "react";

export enum ThemeOptions {
  System = "System",
  Light = "Light",
  Dark = "Dark",
}

interface ThemeContextType {
  themePreference: ThemeOptions;
  effectiveTheme: "light" | "dark";
  setTheme: (theme: ThemeOptions) => void;
  ThemeOptions: typeof ThemeOptions;
}

export default createContext<ThemeContextType | undefined>(undefined);
