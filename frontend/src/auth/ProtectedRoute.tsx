import { Outlet } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <Outlet /> : <LoginPage />;
}
