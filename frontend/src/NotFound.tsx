import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-2">404 Not Found</h1>
      <p className="text-lg mb-4">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/home"
        className="bg-blue-500 text-white px-4 py-2 rounded-xs hover:bg-blue-600 transition duration-300 select-none"
      >
        Go back to the homepage
      </Link>
    </main>
  );
}
