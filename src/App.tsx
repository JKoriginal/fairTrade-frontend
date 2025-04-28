import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout } from "./components/Layout";
import { useAuthStore } from "./store/authStore";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";
import WasteManagement from "./pages/SupportManagement";
import ProductDetail from "./pages/ProductDetail";
import WasteProducts from "./pages/SupportProducts";

// Lazy load pages
const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const DeliveryDashboard = React.lazy(() => import("./pages/DeliveryDashboard"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));

// Protected Route Component
const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Component to determine which home page to render based on user role
const HomeRoute = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Render different home pages based on user role
  switch (user?.role) {
    case "admin":
      return <Home />;
    case "user":
      return <UserHome />;
    case "delivery":
      return <DeliveryDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/" element={<HomeRoute />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <UserHome />
                </ProtectedRoute>
              }
            />

            <Route
              path="/waste-products"
              element={
                <ProtectedRoute>
                  <WasteProducts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:productId"
              element={
                <ProtectedRoute>
                  <ProductDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Waste"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <WasteManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/deliveries"
              element={
                <ProtectedRoute allowedRoles={["delivery"]}>
                  <DeliveryDashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </React.Suspense>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
