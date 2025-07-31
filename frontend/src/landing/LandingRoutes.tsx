import type { RouteObject } from "react-router";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export default [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
] satisfies RouteObject[];
