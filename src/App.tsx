import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import CreateAppointment from "./components/CreateAppointment";
import ManageAppointments from "./components/ManageAppointments";
import Dashboard from "./components/Dashboard";
import type React from "react"; // Added import for React

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/create-appointment"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <CreateAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-appointments"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <ManageAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
