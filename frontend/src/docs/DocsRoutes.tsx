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
const JokePage = createDocsPage(
  lazy(() => import("./pages/joke.mdx")),
  "./pages/joke.mdx"
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
        path: "joke",
        Component: JokePage,
      },
      {
        path: "*",
        Component: DocsNotFoundPage,
      },
    ],
  },
] satisfies RouteObject[];
