import { lazy } from "react";
import { Navigate } from "react-router";
import type { RouteObject } from "react-router";

import LandingLayout from "./LandingLayout";

const HomePage = lazy(() => import("./pages/HomePage"));

export default [
  {
    path: "/",
    Component: LandingLayout,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        Component: HomePage,
      },
    ],
  },
] satisfies RouteObject[];
