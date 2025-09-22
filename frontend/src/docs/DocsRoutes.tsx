import { lazy } from "react";
import type { RouteObject } from "react-router";
import DocsLayout from "./DocsLayout";

export default [
  {
    Component: DocsLayout,
    children: [
      {
        index: true,
        Component: lazy(() => import("./pages/index.mdx")),
      },
      {
        path: "features/audio-summary",
        Component: lazy(() => import("./pages/features/audio-summary.mdx")),
      },
      {
        path: "features/flashcards",
        Component: lazy(() => import("./pages/features/flashcards.mdx")),
      },
      {
        path: "features/mind-map",
        Component: lazy(() => import("./pages/features/mind-map.mdx")),
      },
      {
        path: "features/notebooks",
        Component: lazy(() => import("./pages/features/notebooks.mdx")),
      },
      {
        path: "features/notes",
        Component: lazy(() => import("./pages/features/notes.mdx")),
      },
      {
        path: "features/sources",
        Component: lazy(() => import("./pages/features/sources.mdx")),
      },
      {
        path: "features/study-guide",
        Component: lazy(() => import("./pages/features/study-guide.mdx")),
      },
      {
        path: "*",
        Component: lazy(() => import("./pages/404.mdx")),
      },
    ],
  },
] satisfies RouteObject[];
