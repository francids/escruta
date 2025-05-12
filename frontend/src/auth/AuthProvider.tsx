import { useCallback, useEffect, useState } from "react";
import authService from "./AuthService";
import useCookie from "../hooks/useCookie";
import { AUTH_TOKEN_KEY } from "../config";
import { AuthContext } from "./AuthContext";
import type User from "./interfaces/User";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenCookie, setTokenCookie] = useCookie(AUTH_TOKEN_KEY, {
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    if (response.token) {
      setTokenCookie({
        token: response.token,
      });
      await fetchUserData();
    }
    return response;
  };

  const logout = () => {
    setTokenCookie({ token: null });
    setCurrentUser(null);
  };

  const fetchUserData = useCallback(async () => {
    if (tokenCookie.token) {
      try {
        const userData = await authService.getUser();
        setCurrentUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [tokenCookie]);

  const isAuthenticated = useCallback(() => {
    return !!tokenCookie.token;
  }, [tokenCookie]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          await fetchUserData();
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, fetchUserData]);

  return (
    <AuthContext.Provider
      value={{
        token: tokenCookie.token,
        isAuthenticated,
        login,
        logout,
        loading,
        currentUser,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
