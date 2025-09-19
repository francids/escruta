import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="min-h-screen text-white bg-gray-900">
      <div className="md:min-h-[calc(100vh-80px)]">
        <Outlet />
      </div>
    </div>
  );
}
