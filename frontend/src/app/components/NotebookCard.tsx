import type Notebook from "../interfaces/Notebook";
import { Menu } from "./ui";
import { NotebookIcon, DotsVerticalIcon } from "./icons";

type NotebookCardProps = {
  notebook: Notebook;
  onClick: (notebook: Notebook) => void;
};

export default function NotebookCard({ notebook, onClick }: NotebookCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(".", "");
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="h-40 w-full rounded-xs border p-4 cursor-pointer hover:shadow-sx transition-shadow flex flex-col justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
      onClick={() => onClick(notebook)}
      style={{ minWidth: "180px", maxWidth: "220px" }}
    >
      <div className="flex justify-between items-start">
        <NotebookIcon />
        <div onClick={handleMenuClick}>
          <Menu
            items={[
              {
                label: "Rename",
                onClick: () => console.log("Rename:", notebook.title),
              },
              {
                label: "Delete",
                onClick: () => console.log("Delete:", notebook.title),
                variant: "danger",
              },
            ]}
            trigger={
              <button className="p-1 rounded-xs hover:bg-gray-200 dark:hover:bg-gray-600">
                <DotsVerticalIcon />
              </button>
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1 truncate">
          {notebook.title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(notebook.updatedAt)}
        </p>
      </div>
    </div>
  );
}
