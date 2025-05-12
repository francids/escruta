import { createContext } from "react";
import type User from "./interfaces/User";

interface AuthContextType {
  token: string | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
  loading: boolean;
  currentUser: User | null;
  fetchUserData: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
