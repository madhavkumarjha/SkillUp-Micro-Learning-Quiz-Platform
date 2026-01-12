import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";


const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // if (initializing) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (roles.length){
    if(!user) return <Loader/>;
    if (!roles.includes(user.role)) return <Navigate to="/" replace />;
  }

  // Support both nested and direct usage
  return children ? children : <Outlet />;
};

export default ProtectedRoute;