import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider, ModalProvider } from "./providers";

import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import LandingLayout from "./landing/LandingLayout";
import LandingRoutes from "./landing/LandingRoutes";
import LoginPage from "./auth/pages/LoginPage";
import RegisterPage from "./auth/pages/RegisterPage";
import AppRoutes from "./app/AppRoutes";
import ProtectedRoute from "./auth/ProtectedRoute";

import NotFound from "./NotFound";

import "./index.css";
import { justLanding } from "./config";

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
      <SpeedInsights />
      <Analytics />
    </ModalProvider>
  </AuthProvider>
);
