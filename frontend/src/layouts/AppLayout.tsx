import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-white text-black dark:bg-black dark:text-white select-none">
      <SideMenu />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
