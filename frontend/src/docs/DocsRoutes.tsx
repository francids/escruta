import { lazy, useEffect, type JSX, type LazyExoticComponent } from "react";
import type { RouteObject } from "react-router";
import DocsLayout from "./DocsLayout";
import type { MDXProps } from "mdx/types";
import { useDocsContext } from "@/hooks";

interface MDXModuleProps {
  title: string;
}

function createDocsPage(
  LazyComponent: LazyExoticComponent<(props: MDXProps) => JSX.Element>,
  importPath: string
) {
  return () => {
    const { setTitle } = useDocsContext();
    useEffect(() => {
      import(importPath).then((module: MDXModuleProps) =>
        setTitle(module.title)
      );
    }, [setTitle]);
    return <LazyComponent />;
  };
}

const DocsHomePage = createDocsPage(
  lazy(() => import("./pages/index.mdx")),
  "./pages/index.mdx"
);
const AudioSummaryPage = createDocsPage(
  lazy(() => import("./pages/features/audio-summary.mdx")),
  "./pages/features/audio-summary.mdx"
);
const FlashCardsPage = createDocsPage(
  lazy(() => import("./pages/features/flashcards.mdx")),
  "./pages/features/flashcards.mdx"
);
const MindMapPage = createDocsPage(
  lazy(() => import("./pages/features/mind-map.mdx")),
  "./pages/features/mind-map.mdx"
);
const NotebooksPage = createDocsPage(
  lazy(() => import("./pages/features/notebooks.mdx")),
  "./pages/features/notebooks.mdx"
);
const NotesPage = createDocsPage(
  lazy(() => import("./pages/features/notes.mdx")),
  "./pages/features/notes.mdx"
);
const SourcesPage = createDocsPage(
  lazy(() => import("./pages/features/sources.mdx")),
  "./pages/features/sources.mdx"
);
const StudyGuidesPage = createDocsPage(
  lazy(() => import("./pages/features/study-guide.mdx")),
  "./pages/features/study-guide.mdx"
);
const DocsNotFoundPage = createDocsPage(
  lazy(() => import("./pages/404.mdx")),
  "./pages/404.mdx"
);

export default [
  {
    Component: DocsLayout,
    children: [
      {
        index: true,
        Component: DocsHomePage,
      },
      {
        path: "features/audio-summary",
        Component: AudioSummaryPage,
      },
      {
        path: "features/flashcards",
        Component: FlashCardsPage,
      },
      {
        path: "features/mind-map",
        Component: MindMapPage,
      },
      {
        path: "features/notebooks",
        Component: NotebooksPage,
      },
      {
        path: "features/notes",
        Component: NotesPage,
      },
      {
        path: "features/sources",
        Component: SourcesPage,
      },
      {
        path: "features/study-guide",
        Component: StudyGuidesPage,
      },
      {
        path: "*",
        Component: DocsNotFoundPage,
      },
    ],
  },
] satisfies RouteObject[];
