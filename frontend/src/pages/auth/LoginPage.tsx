import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import PatternBackground from "../../landing/components/PatternBackground";
import Logo from "../../landing/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/app");
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Login error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <PatternBackground />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col gap-8">
        <Logo className="h-5 w-auto fill-black dark:fill-white" />
        <div className="relative min-w-96 flex flex-col items-center justify-center text-gray-800 dark:text-gray-200">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-xs border border-gray-300 dark:border-gray-600 shadow-xs"
          >
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
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
    </div>
  );
}
