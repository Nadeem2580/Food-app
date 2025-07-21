import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = ({ userType }) => {
  if (userType === "customer") return <Outlet />;
  if (userType === "admin") return <Navigate to="/admin-dashboard" />;
  if (userType === "vendor") return <Navigate to="/vendor-dahsboard" />;
  return <Navigate to="/" />;
};

export default UserRoutes;
