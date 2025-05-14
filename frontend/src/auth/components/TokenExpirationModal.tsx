import { useNavigate } from "react-router";
import { Modal, Button } from "../../app/components/ui";
import { useAuth } from "../../hooks/useAuth";

type TokenExpirationModalProps = {
  isOpen: boolean;
};

export default function TokenExpirationModal({
  isOpen,
}: TokenExpirationModalProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/app", { replace: true });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleLogout}
      title="Session Expired"
      width="sm"
      actions={
        <Button onClick={handleLogout} variant="primary">
          Login Again
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
  );
}
