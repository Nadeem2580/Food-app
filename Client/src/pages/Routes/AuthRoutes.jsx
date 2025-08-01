import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = ({ userType }) => {
  if (userType === "vendor") return <Navigate to="/vendor-Restaurant" />;
  if (userType === "customer") return <Navigate to="/user-dashboard" />;
  if (userType === "admin") return <Navigate to="/admin-dashboard" />;
  return <Outlet />;
};

export default AuthRoutes;
