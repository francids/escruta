import { createContext } from "react";

export default createContext<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
} | null>(null);
