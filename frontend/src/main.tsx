import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { AuthProvider, ThemeProvider, ToastProvider } from "./providers";

import AuthLayout from "./auth/AuthLayout";
const LoginPage = lazy(() => import("./auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./auth/pages/RegisterPage"));
import AppRoutes from "./app/AppRoutes";
const ProtectedRoute = lazy(() => import("./auth/ProtectedRoute"));

import NotFound from "./NotFound";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/app"),
  },
  {
    path: "login",
    Component: AuthLayout,
    children: [{ index: true, Component: LoginPage }],
  },
  {
    path: "register",
    Component: AuthLayout,
    children: [{ index: true, Component: RegisterPage }],
  },
  {
    Component: ProtectedRoute,
    children: AppRoutes,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider
    children={
      <ThemeProvider
        children={
          <ToastProvider children={<RouterProvider router={router} />} />
        }
      />
    }
  />
);
