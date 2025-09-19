import { createContext } from "react";

export default createContext<{
  title: string;
  setTitle: (title: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
} | null>(null);
