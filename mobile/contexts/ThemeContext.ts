import { createContext } from "react";

export type ThemeOptions = "light" | "dark" | "device";

interface ThemeContextType {
  colorScheme: "light" | "dark";
  userPreference: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;
}

export default createContext<ThemeContextType | undefined>(undefined);
