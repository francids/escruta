import { Link } from "react-router";
import Logo from "../../shared/Logo";
import { useAuth } from "../../hooks/useAuth";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="py-8 md:py-12 px-6 md:px-24 border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo className="h-4 w-auto fill-black dark:fill-white" />
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link
              to="/app"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              {isAuthenticated() ? "Go to app" : "Login"}
            </Link>
            {!isAuthenticated() && (
              <Link
                to="/register"
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Register
              </Link>
            )}
            {/* <a
              href="#"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </a> */}
            {/* <a
              href="#"
              className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </a> */}
          </div>
        </div>

        <div className="mt-10 md:mt-20 text-center text-gray-400 dark:text-gray-500 text-sm">
          © {new Date().getFullYear()} Escruta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
