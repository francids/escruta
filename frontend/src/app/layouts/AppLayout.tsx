import { useAuth } from "../../hooks/useAuth";
import SideMenu from "../components/SideMenu";
import { Outlet } from "react-router";
import { useEffect } from "react";
import useCookie from "../../hooks/useCookie";
import type User from "../../auth/interfaces/User";

export default function AppLayout() {
  const { currentUser, fetchUserData } = useAuth();
  const [, setUserData] = useCookie<User | null>("user", null);

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser, setUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="flex h-screen bg-white text-black dark:bg-black dark:text-white select-none">
      <SideMenu />
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
