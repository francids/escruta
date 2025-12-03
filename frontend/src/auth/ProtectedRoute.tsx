import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { Modal, Button } from "@/shared/ui";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, checkTokenValidity, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    setIsModalOpen(false);
    logout();
    navigate("/app", { replace: true });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkSession = () => {
      if (isAuthenticated() && !checkTokenValidity()) {
        setIsModalOpen(true);
      }
    };

    if (isAuthenticated()) {
      checkSession();
      intervalId = setInterval(checkSession, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated, checkTokenValidity]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleLogout}
          closeOnOutsideClick={false}
          closeOnEscape={false}
          title="Session expired"
          width="sm"
          actions={
            <Button onClick={handleLogout} variant="primary">
              Login again
            </Button>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              Your session has expired due to inactivity. Please log in again to
              continue using the application.
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
