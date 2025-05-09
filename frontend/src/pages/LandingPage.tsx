import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="text-lg mb-8">Your one-stop solution for all your needs.</p>
      <Link
        to="/app"
        className="bg-blue-500 text-white px-4 py-2 rounded-xs hover:bg-blue-600 transition duration-300 select-none"
      >
        Go to App
      </Link>
    </div>
  );
}
