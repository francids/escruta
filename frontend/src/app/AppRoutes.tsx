import { type RouteObject } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

const appRoutes: RouteObject[] = [
  {
    path: "app",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
    ],
  },
];

export default appRoutes;
