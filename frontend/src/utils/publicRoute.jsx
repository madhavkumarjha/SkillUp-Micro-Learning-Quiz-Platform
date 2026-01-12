import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

const PublicRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();



  const localToken = localStorage.getItem("token");

  const activeToken = token || localToken;

  // ✅ Only redirect if user is on a public page
  const publicPaths = ["/login", "/register", "/"];
  const isPublicPage = publicPaths.includes(location.pathname);

  if (activeToken && user && isPublicPage) {
    switch (user.role) {
      case "student":
        return <Navigate to="/student" replace />;
      case "instructor":
        return <Navigate to="/instructor" replace />;
      case "admin":
        return <Navigate to="/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PublicRoute;