import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;