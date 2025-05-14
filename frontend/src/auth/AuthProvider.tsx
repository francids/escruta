import { useCallback, useEffect, useState } from "react";
import authService from "./AuthService";
import useCookie from "../hooks/useCookie";
import { AUTH_TOKEN_KEY } from "../config";
import { AuthContext } from "./AuthContext";
import type User from "./interfaces/User";
import type Token from "./interfaces/Token";
import useFetch from "../hooks/useFetch";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenCookie, setTokenCookie] = useCookie<Token>(AUTH_TOKEN_KEY, {
    token: null,
    expiresIn: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useCookie<User | null>(
    "user",
    null
  ) as [User | null, (value: User | null) => void];

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    if (response.token) {
      setTokenCookie({
        token: response.token,
        expiresIn: response.expiresIn,
        createdAt: Date.now(),
      });
      await fetchUserData();
    }
    return response;
  };

  const logout = () => {
    setTokenCookie({ token: null, expiresIn: 0, createdAt: undefined });
    setCurrentUser(null);
    useFetch.clearCache();
  };

  const fetchUserData = useCallback(async () => {
    if (tokenCookie!.token) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenCookie]);

  const isAuthenticated = useCallback(() => {
    return !!tokenCookie!.token;
  }, [tokenCookie]);

  const checkTokenValidity = useCallback(() => {
    if (
      tokenCookie!.expiresIn &&
      tokenCookie!.token &&
      tokenCookie!.createdAt
    ) {
      return (
        Date.now() - (tokenCookie!.createdAt || 0) < tokenCookie!.expiresIn
      );
    }
    return false;
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
        token: tokenCookie!.token,
        isAuthenticated,
        checkTokenValidity,
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
