import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated, initializing } = useSelector(
    (state) => state.auth
  );

  if (initializing) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(user.role))
    return <Navigate to="/" replace />;

  // Support both nested and direct usage
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
