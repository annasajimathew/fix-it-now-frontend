import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role, requireApproval = false }) {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const userRole = user?.role; // ✅ FIX HERE

  // 🔒 Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role mismatch
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Worker approval check
  if (
    requireApproval &&
    userRole === "worker" &&
    user.isApproved !== true
  ) {
    return <Navigate to="/worker/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
