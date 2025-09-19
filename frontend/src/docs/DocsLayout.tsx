import { Outlet } from "react-router";

export default function DocsLayout() {
  return (
    <div className="flex h-screen select-none">
      <div className="flex-grow overflow-hidden prose prose-invert max-w-none">
        <div className="h-full mx-8 md:mx-16 lg:mx-32 overflow-auto py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
