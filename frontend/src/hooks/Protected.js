import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();
  if (!authUser) {
    // Redirect to signup if user is not authenticated
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedRoute;
