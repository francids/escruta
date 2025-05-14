import { Outlet } from "react-router";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import TokenExpirationModal from "./components/TokenExpirationModal";

export default function ProtectedRoute() {
  const { isAuthenticated, checkTokenValidity } = useAuth();
  const [showExpirationModal, setShowExpirationModal] = useState(false);

  const checkToken = useCallback(() => {
    if (isAuthenticated()) {
      const tokenValid = checkTokenValidity();

      if (!tokenValid) {
        setShowExpirationModal(true);
      } else {
        setShowExpirationModal(false);
      }

      return tokenValid;
    }

    setShowExpirationModal(false);
    return true;
  }, [isAuthenticated, checkTokenValidity]);

  useEffect(() => {
    checkToken();

    const interval = setInterval(() => {
      checkToken();
    }, 3000);

    return () => clearInterval(interval);
  }, [checkToken]);

  if (!isAuthenticated()) {
    return <LoginPage />;
  }

  if (showExpirationModal) {
    return (
      <main className="bg-white dark:bg-black h-screen w-screen overflow-hidden">
        <TokenExpirationModal isOpen={showExpirationModal} />
      </main>
    );
  }

  return <Outlet />;
}
