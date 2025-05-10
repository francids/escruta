import type Notebook from "../interfaces/Notebook";

const NotebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.0049 2C21.1068 2 22 2.89821 22 3.9908V20.0092C22 21.1087 21.1074 22 20.0049 22H4V18H2V16H4V13H2V11H4V8H2V6H4V2H20.0049ZM8 4H6V20H8V4ZM20 4H10V20H20V4Z"></path>
  </svg>
);

const DotsVerticalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="w-5 h-5 text-gray-500"
  >
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM12 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export default function NotebookCard({
  notebook,
  onClick,
}: {
  notebook: Notebook;
  onClick: (notebook: Notebook) => void;
}) {
  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(".", "");
  };

  return (
    <div
      className="h-40 w-full rounded-xs border p-4 cursor-pointer hover:shadow-sx transition-shadow flex flex-col justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600"
      onClick={() => onClick(notebook)}
      style={{ minWidth: "180px", maxWidth: "220px" }}
    >
      <div className="flex justify-between items-start">
        <NotebookIcon />
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Options clicked for:", notebook.title);
          }}
          className="p-1 rounded-xs hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <DotsVerticalIcon />
        </button>
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
