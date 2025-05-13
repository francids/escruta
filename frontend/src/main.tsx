import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import LandingLayout from "./landing/LandingLayout.tsx";
import LandingRoutes from "./landing/LandingRoutes.tsx";
import LoginPage from "./auth/pages/LoginPage.tsx";
import AppRoutes from "./app/AppRoutes.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";

import NotFound from "./NotFound.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    Component: LandingLayout,
    children: LandingRoutes,
  },
  {
    path: "login",
    Component: LoginPage,
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
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
