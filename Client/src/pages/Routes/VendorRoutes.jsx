import { Navigate, Outlet } from "react-router-dom";

const VendorRoutes = ({ userType }) => {
  if (userType === "vendor") return <Outlet />;
  if (userType === "admin") return <Navigate to="/admin-dashboard" />;
  if (userType === "customer") return <Navigate to="/user-dashboard" />;
  return <Navigate to="/" />;
};

export default VendorRoutes;
