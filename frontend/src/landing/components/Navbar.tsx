import { Link } from "react-router";
import Logo from "../../shared/Logo";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-950 fixed w-full z-10 top-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <Logo className="h-3.5 w-auto fill-black dark:fill-white" />
            </Link>
          </div>

          <Link
            to="/app"
            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xs bg-blue-500 px-4 font-medium text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900 select-none"
          >
            <span className="group-hover:pl-2 transition-all duration-200">
              {isAuthenticated() ? "Go to App" : "Get Started"}
            </span>
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
