import CommonBar from "../components/CommonBar";
import { useLoaderData } from "react-router";

export default function NotebookPage() {
  const notebookId = useLoaderData();

  return (
    <div className="p-6 md:p-8">
      <CommonBar>
        <h1 className="text-2xl font-sans font-normal">
          Notebook: <span className="font-semibold">{notebookId}</span>
        </h1>
      </CommonBar>
    </div>
  );
}
