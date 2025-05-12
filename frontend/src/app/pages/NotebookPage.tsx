import CommonBar from "../components/CommonBar";
import { useLoaderData } from "react-router";
import useFetch from "../../hooks/useFetch";
import type NotebookContent from "../interfaces/NotebookContent";

export default function NotebookPage() {
  const notebookId: string = useLoaderData();
  const {
    data: notebook,
    loading,
    error,
  } = useFetch<NotebookContent>(`/notebooks/${notebookId}`);

  console.log("notebook", notebook);

  if (error) {
    return <div className="m-4">Error fetching notebook: {error.message}</div>;
  }

  if (loading) {
    return <div className="m-4">Loading notebook...</div>;
  }

  return (
    <div className="p-6 md:p-8">
      <CommonBar>
        <h1 className="text-2xl font-sans font-normal truncate">
          Notebook: <span className="font-semibold">{notebook?.title}</span>
        </h1>
      </CommonBar>
    </div>
  );
}
