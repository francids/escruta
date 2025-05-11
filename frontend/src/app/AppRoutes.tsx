import { type RouteObject } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";

const appRoutes: RouteObject[] = [
  {
    path: "app",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
];

export default appRoutes;
