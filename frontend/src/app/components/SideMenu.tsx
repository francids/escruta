import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Tooltip } from "./ui";
import { HomeIcon, SettingsIcon, LogoutIcon } from "./icons";

export default function SideMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-900/20 dark:border-gray-100/20 transition-all duration-300 w-16 min-w-16 max-w-16">
      <NavLink to="/app" className="p-4 flex justify-start items-center">
        <img src="/favicon.svg" alt="Logo Escruta" className="h-8 w-8" />
      </NavLink>

      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        <Tooltip text="Notebooks">
          <NavLink
            to="/app"
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <HomeIcon />
          </NavLink>
        </Tooltip>
        <Tooltip text="Settings">
          <NavLink
            to="/app/settings"
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <SettingsIcon />
          </NavLink>
        </Tooltip>
        <Tooltip text="Logout">
          <button
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <LogoutIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
