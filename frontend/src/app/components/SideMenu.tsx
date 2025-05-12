import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Tooltip, Button } from "./ui";
import Modal from "./ui/Modal";
import { HomeIcon, SettingsIcon, LogoutIcon } from "./icons";
import type User from "../../auth/interfaces/User";
import useCookie from "../../hooks/useCookie";
import { useState } from "react";

export default function SideMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [, setUser] = useCookie<User | null>("user", null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setUser(null);
    logout();
    navigate("/app", { replace: true });
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-900/20 dark:border-gray-100/20 transition-all duration-300 w-16 min-w-16 max-w-16">
      <NavLink to="/app" className="p-4 flex justify-start items-center">
        <img src="/favicon.svg" alt="Logo Escruta" className="h-8 w-8" />
      </NavLink>

      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        <Tooltip text="Notebooks" position="right">
          <NavLink
            to="/app"
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <HomeIcon />
          </NavLink>
        </Tooltip>
        <Tooltip text="Settings" position="right">
          <NavLink
            to="/app/settings"
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <SettingsIcon />
          </NavLink>
        </Tooltip>
        <Tooltip text="Logout" position="right">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <LogoutIcon />
          </button>
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
