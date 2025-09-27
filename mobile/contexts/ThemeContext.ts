import { createContext } from "react";

interface ThemeContextType {
  colorScheme: "light" | "dark";
  userPreference: "light" | "dark" | "device";
  setTheme: (theme: "light" | "dark" | "device") => void;
}

export default createContext<ThemeContextType | undefined>(undefined);
