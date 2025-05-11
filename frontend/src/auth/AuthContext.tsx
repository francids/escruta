import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
