import { createContext } from "react";

export default createContext<{
  title: string;
  setTitle: (title: string) => void;
} | null>(null);
