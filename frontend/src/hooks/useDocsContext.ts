import { DocsContext } from "@/contexts";
import { useContext } from "react";

export default function useDocsContext() {
  const context = useContext(DocsContext);
  if (!context)
    throw new Error("useDocsContext must be used within DocsProvider");
  return context;
}
