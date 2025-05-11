import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import Tooltip from "./ui/Tooltip";

export default function SideMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-900/20 dark:border-gray-100/20 transition-all duration-300 w-16">
      <NavLink to="/app" className="p-4 flex justify-start items-center">
        <img src="/favicon.svg" alt="Logo Escruta" className="h-8 w-8" />
      </NavLink>

      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        <Tooltip text="Landing">
          <NavLink
            to="/"
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
            </svg>
          </NavLink>
        </Tooltip>
        <Tooltip text="Settings">
          <NavLink
            to="/app/settings"
            className="w-10 h-10 p-2.5 rounded-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center select-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path>
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
