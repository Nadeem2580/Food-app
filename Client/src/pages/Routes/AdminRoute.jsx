import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ userType }) => {
  if (userType === "admin") return <Outlet />;
  if (userType === "vendor") return <Navigate to="/vendor-Restaurant" />;
  if (userType === "customer") return <Navigate to="/user-dashboard" />;
  return <Navigate to="/" />;
};

export default AdminRoute;
