import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useCookie from "../../hooks/useCookie";
import PatternBackground from "../../shared/PatternBackground";
import Logo from "../../shared/Logo";

export default function LoginPage() {
  const [savedEmail, setSavedEmail] = useCookie("savedEmail", { email: "" });
  const [email, setEmail] = useState(savedEmail.email || "");
  const [password, setPassword] = useState("");
  const [rememberEmail, setRememberEmail] = useState(!!savedEmail.email);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      if (rememberEmail) {
        setSavedEmail({ email });
      } else if (savedEmail.email) {
        setSavedEmail({ email: "" });
      }
      navigate("/app");
    } catch (err: unknown) {
      const error = err as { status: number };
      if (error.status) {
        setError(
          error.status === 401
            ? "Invalid email or password."
            : "Login error. Please try again."
        );
      } else {
        setError(
          "Cannot connect to the server. Please check your connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <PatternBackground className="hidden sm:block" />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col-reverse gap-8 bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent">
        <Logo className="h-4 w-auto fill-black dark:fill-white" />
        <form
          onSubmit={handleSubmit}
          className="relative w-full sm:max-w-sm bg-white dark:bg-gray-900 p-6 sm:rounded-xs sm:border border-gray-300 dark:border-gray-600 shadow-xs text-gray-800 dark:text-gray-200"
        >
          <h1 className="text-2xl font-bold mb-6 select-none">Login</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2 select-none"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xs focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2 select-none"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xs focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberEmail"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
              className="mr-2 size-4 text-blue-500 border-gray-300 rounded-xs shadow-none focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <label
              htmlFor="rememberEmail"
              className="text-gray-700 dark:text-gray-300 select-none text-sm"
            >
              Remember my email
            </label>
          </div>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-xs">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-xs hover:bg-blue-600 transition duration-300 select-none disabled:bg-blue-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
