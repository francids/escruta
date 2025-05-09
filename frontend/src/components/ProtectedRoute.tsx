import { type JSX } from "react";
import LoginPage from "../pages/auth/LoginPage";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? children : <LoginPage />;
}
