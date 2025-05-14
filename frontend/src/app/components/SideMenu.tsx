import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Tooltip, Button, Modal, IconButton } from "./ui";
import { HomeIcon, SettingsIcon, LogoutIcon } from "./icons";
import { useState } from "react";
import AppIcon from "../../shared/AppIcon";

export default function SideMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/app", { replace: true });
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-900/20 dark:border-gray-100/20 transition-all duration-300 w-16 min-w-16 max-w-16">
      <NavLink to="/app" className="w-16 h-16 grid place-items-center">
        <AppIcon className="h-10 w-10" />
      </NavLink>

      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        <Tooltip text="Notebooks" position="right">
          <IconButton
            icon={<HomeIcon />}
            size="md"
            ariaLabel="See notebooks"
            variant="secondary"
            onClick={() => navigate("/app")}
          />
        </Tooltip>
        <Tooltip text="Settings" position="right">
          <IconButton
            icon={<SettingsIcon />}
            size="md"
            ariaLabel="See settings"
            variant="secondary"
            onClick={() => navigate("/app/settings")}
          />
        </Tooltip>
        <Tooltip text="Logout" position="right">
          <IconButton
            icon={<LogoutIcon />}
            size="md"
            ariaLabel="Logout"
            variant="secondary"
            onClick={() => setShowLogoutModal(true)}
          />
        </Tooltip>
      </div>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logout"
        width="sm"
        actions={
          <>
            <Button
              onClick={() => setShowLogoutModal(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to log out?
        </p>
      </Modal>
    </div>
  );
}
