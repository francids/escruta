import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

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
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#e5e5e52e_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e52e_1px,transparent_1px)] bg-[size:24px_24px] bg-gray-200 dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[size:24px_24px] dark:bg-gray-950"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-gray-800 dark:text-gray-200">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white dark:bg-gray-900 p-6 rounded-xs shadow-md"
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
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
              className="block text-gray-700 dark:text-gray-300 mb-2"
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
  );
}
