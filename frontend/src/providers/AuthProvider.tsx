import { useCallback, useEffect, useState } from "react";
import { AuthService } from "@/services";
import { useCookie, useFetch } from "@/hooks";
import { AUTH_TOKEN_KEY } from "@/config";
import { AuthContext } from "@/contexts";
import type { Token, User } from "@/interfaces";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    const response = await AuthService.login(email, password);
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

  const register = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const response = await AuthService.register(email, password, fullName);
    if (response.status === 201 && response.data.token) {
      setTokenCookie({
        token: response.data.token,
        expiresIn: response.data.expiresIn,
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
    if (tokenCookie?.token) {
      try {
        const userData = await AuthService.getUser();
        setCurrentUser(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [tokenCookie?.token]);

  const isAuthenticated = useCallback(() => {
    return !!tokenCookie?.token;
  }, [tokenCookie]);

  const checkTokenValidity = useCallback(() => {
    if (
      tokenCookie?.expiresIn &&
      tokenCookie?.token &&
      tokenCookie?.createdAt
    ) {
      return Date.now() - (tokenCookie.createdAt || 0) < tokenCookie.expiresIn;
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
        token: tokenCookie?.token || null,
        isAuthenticated,
        checkTokenValidity,
        login,
        register,
        logout,
        loading,
        currentUser,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
