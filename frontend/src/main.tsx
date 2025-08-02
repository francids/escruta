import { createRoot } from "react-dom/client";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ModalProvider } from "./app/contexts/ModalContext.tsx";

import LandingLayout from "./landing/LandingLayout.tsx";
import LandingRoutes from "./landing/LandingRoutes.tsx";
import LoginPage from "./auth/pages/LoginPage.tsx";
import RegisterPage from "./auth/pages/RegisterPage.tsx";
import AppRoutes from "./app/AppRoutes.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";

import NotFound from "./NotFound.tsx";

import "./index.css";
import { justLanding } from "./config.ts";

const router = createBrowserRouter(
  justLanding
    ? [
        {
          Component: LandingLayout,
          children: LandingRoutes,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ]
    : [
        {
          Component: LandingLayout,
          children: LandingRoutes,
        },
        {
          path: "login",
          Component: LoginPage,
        },
        {
          path: "register",
          Component: RegisterPage,
        },
        {
          Component: ProtectedRoute,
          children: AppRoutes,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ]
);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </AuthProvider>
);
