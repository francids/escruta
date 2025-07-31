import type { RouteObject } from "react-router";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";

export default [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/pricing",
    Component: PricingPage,
  },
  {
    path: "/blog",
    Component: BlogPage,
  },
] satisfies RouteObject[];
