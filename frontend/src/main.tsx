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

import MainLayout from "./MainLayout";
import LandingRoutes from "./landing/LandingRoutes";
import DocsRoutes from "./docs/DocsRoutes";
import AuthLayout from "./auth/AuthLayout";
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
          Component: MainLayout,
          children: LandingRoutes,
        },
        {
          path: "/docs",
          Component: MainLayout,
          children: DocsRoutes,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ]
    : [
        {
          Component: MainLayout,
          children: LandingRoutes,
        },
        {
          path: "/docs",
          Component: MainLayout,
          children: DocsRoutes,
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
