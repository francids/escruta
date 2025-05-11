import NotebookCard from "../components/NotebookCard";
import type Notebook from "../interfaces/Notebook";
import useFetch from "../../hooks/useFetch";
import Logo from "../../shared/Logo";

export default function HomePage() {
  const { data, loading, error } = useFetch<Notebook[]>("/notebooks");

  if (loading) {
    return <div className="m-4">Loading...</div>;
  }

  if (error) {
    return <div className="m-4">Error fetching notebooks: {error.message}</div>;
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-xs border border-gray-200 dark:border-gray-600">
        <h1 className="text-3xl font-sans font-normal flex flex-row gap-2 items-center">
          <span className="leading-none mb-1">Welcome to </span>
          <Logo className="h-4.5 w-auto" />
        </h1>
      </div>
      <div className="flex flex-wrap gap-4">
        {data?.map((notebook) => (
          <NotebookCard
            key={notebook.id}
            notebook={notebook}
            onClick={() => {
              console.log("Clicked notebook:", notebook.title);
            }}
          />
        ))}
      </div>
    </div>
  );
}
