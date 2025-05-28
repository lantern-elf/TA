import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in? Redirect to login.
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
