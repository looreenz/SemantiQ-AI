import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// ProtectedRoute blocks access to routes unless the user is authenticated
function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user); // Get user from Redux

  // If user is authenticated, render the child components
  // Otherwise, redirect to the login page
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
