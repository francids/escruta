import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import LandingPage from "./landing/LandingPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";

// App
import AppLayout from "./layouts/AppLayout.tsx";
import HomePage from "./pages/app/HomePage.tsx";

import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
