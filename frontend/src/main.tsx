import { lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  AuthProvider,
  ModalProvider,
  ThemeProvider,
  ToastProvider,
} from "./providers";

import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const LandingLayout = lazy(() => import("./landing/LandingLayout"));
import LandingRoutes from "./landing/LandingRoutes";
const LoginPage = lazy(() => import("./auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("./auth/pages/RegisterPage"));
import AppRoutes from "./app/AppRoutes";
const ProtectedRoute = lazy(() => import("./auth/ProtectedRoute"));

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
      <ThemeProvider>
        <ToastProvider>
          <RouterProvider router={router} />
          <SpeedInsights />
          <Analytics />
        </ToastProvider>
      </ThemeProvider>
    </ModalProvider>
  </AuthProvider>
);
