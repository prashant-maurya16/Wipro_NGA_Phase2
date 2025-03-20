import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem('role');

  if (!role |
 !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // Or a login page
  }

  return children;
};

export default ProtectedRoute;