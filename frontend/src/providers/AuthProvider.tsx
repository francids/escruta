import { useCallback, useEffect, useState } from "react";
import authService from "../services/AuthService";
import useCookie from "../hooks/useCookie";
import { AUTH_TOKEN_KEY } from "../config";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenCookie, setTokenCookie] = useCookie(AUTH_TOKEN_KEY, {
    token: null,
  });
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    if (response.token) {
      setTokenCookie({
        token: response.token,
      });
    }
    return response;
  };

  const logout = () => {
    setTokenCookie({ token: null });
  };

  const isAuthenticated = useCallback(() => {
    return !!tokenCookie.token;
  }, [tokenCookie]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        isAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        token: tokenCookie.token,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
