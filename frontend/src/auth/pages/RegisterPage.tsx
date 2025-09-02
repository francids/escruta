import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks";
import PatternBackground from "@/shared/PatternBackground";
import Logo from "@/shared/Logo";
import { motion, AnimatePresence } from "motion/react";
import { Toast } from "@/app/components/ui";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const checkPasswordStrength = (password: string) => {
    const criteria = [
      {
        valid: password.length >= 8,
        message: "Password must be at least 8 characters.",
      },
      {
        valid: /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter.",
      },
      {
        valid: /[a-z]/.test(password),
        message: "Password must contain at least one lowercase letter.",
      },
      {
        valid: /[0-9]/.test(password),
        message: "Password must contain at least one number.",
      },
    ];

    const failedCriterion = criteria.find((criterion) => !criterion.valid);

    return {
      isValid: !failedCriterion,
      errorMessage: failedCriterion ? failedCriterion.message : "",
      lengthCriteria: criteria[0].valid,
      uppercaseCriteria: criteria[1].valid,
      lowercaseCriteria: criteria[2].valid,
      numberCriteria: criteria[3].valid,
    };
  };

  useEffect(() => {
    fullNameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (passwordTouched) {
      const validationResult = checkPasswordStrength(password);
      setPasswordError(validationResult.errorMessage);
    }
  }, [password, passwordTouched]);

  useEffect(() => {
    const isEmailValid = email.trim() !== "" && /\S+@\S+\.\S+/.test(email);
    const isFullNameValid = fullName.trim() !== "";
    const passwordValidation = checkPasswordStrength(password);
    const isPasswordValid =
      passwordValidation.isValid && password.trim() !== "";
    const doPasswordsMatch =
      password === confirmPassword && confirmPassword !== "";

    setAllowSubmit(
      isEmailValid && isFullNameValid && isPasswordValid && doPasswordsMatch
    );
  }, [fullName, email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    const passwordValidation = checkPasswordStrength(password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await register(email, password, fullName);
      if (response.status === 201) {
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
          navigate("/app");
        }, 1500);
      }
    } catch (err: unknown) {
      const error = err as { status: number; message?: string };
      if (error.status) {
        setError(
          error.status === 409
            ? "This email is already registered."
            : "Registration error. Please try again."
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!passwordTouched) {
      setPasswordTouched(true);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <PatternBackground className="hidden sm:block" />
      <Toast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message="Registration successful! Redirecting..."
        type="success"
        position="bottom-right"
        duration={1500}
      />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col-reverse gap-8 bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            to="/"
            className="flex items-center p-4 bg-[#f9f9f9] dark:bg-[#131313] rounded-xs"
          >
            <Logo className="h-4 w-auto fill-black dark:fill-white" />
          </Link>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="relative w-full sm:max-w-sm bg-white dark:bg-gray-900 p-6 sm:rounded-xs sm:border border-gray-300 dark:border-gray-600 shadow-xs text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5,
          }}
        >
          <motion.h1
            className="text-2xl font-bold mb-6 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Register
          </motion.h1>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2 select-none"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xs focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="John Doe"
              required
              ref={fullNameInputRef}
            />
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
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
              autoComplete="email"
            />
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
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
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border ${
                passwordError
                  ? "border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-xs focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400`}
              required
              autoComplete="new-password"
            />
            <AnimatePresence mode="wait">
              {passwordError && (
                <motion.p
                  className="mt-1 text-sm text-red-500"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {passwordError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2 select-none"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                password !== confirmPassword && confirmPassword
                  ? "border-red-400"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-xs focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400`}
              required
              autoComplete="new-password"
            />
            <AnimatePresence mode="wait">
              {password !== confirmPassword && confirmPassword && (
                <motion.p
                  className="mt-1 text-sm text-red-500"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Passwords do not match.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded-xs overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading || !allowSubmit || showSuccessToast}
            className={`w-full ${
              allowSubmit
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            } text-white px-4 py-2 rounded-xs transition duration-300 select-none disabled:bg-blue-300`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            whileHover={{ scale: allowSubmit ? 1.02 : 1 }}
            whileTap={{ scale: allowSubmit ? 0.98 : 1 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <motion.span
                  className="inline-block h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </motion.button>

          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Log in
            </Link>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
