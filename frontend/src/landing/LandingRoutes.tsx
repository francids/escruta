import { lazy } from "react";
import { Navigate } from "react-router";
import type { RouteObject } from "react-router";

import LandingLayout from "./LandingLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));

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
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "pricing",
        Component: PricingPage,
      },
      {
        path: "blog",
        Component: BlogPage,
      },
    ],
  },
] satisfies RouteObject[];
