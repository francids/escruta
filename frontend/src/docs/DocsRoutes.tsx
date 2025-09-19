import { lazy } from "react";
import type { RouteObject } from "react-router";
import DocsLayout from "./DocsLayout";

const DocsHomePage = lazy(() => import("./index.mdx"));

export default [
  {
    Component: DocsLayout,
    children: [
      {
        index: true,
        Component: DocsHomePage,
      },
    ],
  },
] satisfies RouteObject[];
