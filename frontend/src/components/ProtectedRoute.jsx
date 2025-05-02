import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;