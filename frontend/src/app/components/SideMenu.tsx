import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks";
import { Tooltip, Button, Modal } from "@/shared/ui";
import { HomeIcon, SettingsIcon, LogoutIcon } from "@/shared/icons";
import { useState } from "react";
import AppIcon from "@/shared/AppIcon";
import { cn } from "@/lib/utils";

type SideItemMenuProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
};

function SideItemMenu({
  icon,
  label,
  onClick,
  isActive = false,
}: SideItemMenuProps) {
  return (
    <Tooltip text={label} position="right">
      <button
        onClick={onClick}
        className={cn(
          "w-10 h-10 p-2.5 rounded-xs flex items-center justify-center transition-all duration-300 select-none",
          {
            "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700":
              isActive,
            "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700":
              !isActive,
          }
        )}
        aria-label={label}
        type="button"
      >
        {icon}
      </button>
    </Tooltip>
  );
}

export default function SideMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/app", { replace: true });
    setShowLogoutModal(false);
  };

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-900/20 dark:border-gray-100/20 transition-all duration-300 w-16 min-w-16 max-w-16">
      <NavLink to="/app" className="w-16 h-16 grid place-items-center group">
        <AppIcon className="h-10 w-10 fill-gray-800 dark:fill-gray-50 transition-all duration-300 group-hover:fill-blue-500 dark:group-hover:fill-blue-400" />
      </NavLink>

      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        <SideItemMenu
          icon={<HomeIcon />}
          label="Notebooks"
          onClick={() => navigate("/app")}
          isActive={location.pathname === "/app"}
        />
        <SideItemMenu
          icon={<SettingsIcon />}
          label="Settings"
          onClick={() => navigate("/app/settings")}
          isActive={location.pathname === "/app/settings"}
        />
        <SideItemMenu
          icon={<LogoutIcon />}
          label="Logout"
          onClick={() => setShowLogoutModal(true)}
          isActive={location.pathname === "/app/logout"}
        />
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
