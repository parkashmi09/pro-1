import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import { AuthProvider } from "./context/AuthContext";
import WithoutAuthLayout from "./layouts/WithoutAuthLayout";
import WithAuthLayout from "./layouts/WithAuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes with auth layout */}
          <Route element={<WithoutAuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes with different layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<WithAuthLayout />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Welcome />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
