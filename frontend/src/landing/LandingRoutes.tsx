import type { RouteObject } from "react-router";
import LandingPage from "./LandingPage";

const landingRoutes: RouteObject[] = [
  {
    path: "/",
    Component: LandingPage,
  },
];

export default landingRoutes;
