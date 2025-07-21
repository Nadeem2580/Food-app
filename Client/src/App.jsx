import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Bounce, ToastContainer } from "react-toastify";
import {
  AdminDashboard,
  VandorRestaurant,
  VenderDashboard,
  VenderMenu,
  VendorOrder,
} from "./Index";
import AuthRoutes from "./pages/Routes/AuthRoutes";
import VendorRoutes from "./pages/Routes/VendorRoutes";
import UserRoutes from "./pages/Routes/UserRoutes";
import UserDashboard from "./pages/users/userDashboard/UserDashboard";
import AdminRoute from "./pages/Routes/AdminRoute";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./Utils/Utility";
import { useEffect, useState } from "react";
import AdminVendor from "./pages/Admin/adminVendor/AdminVendor";
import AdminCustomer from "./pages/Admin/adminCustomer/AdminCustomer";
import AdminRestaurant from "./pages/Admin/adminRestaurants/AdminRestaurant";
function App() {
  const token = Cookies.get("token");
  const [userType, setUserType] = useState(null);
  const [isRefresh, setIsRefresh] = useState(null);
  useEffect(() => {
    if (token) fetchUser();
    else setUserType("unauthorized");
  }, [isRefresh]);
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/login.sigleUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.data;
      setUserType(user?.type || "unauthorized");
    } catch (err) {
      setUserType("unauthorized");
    }
  };

  console.log(userType, "userType");
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthRoutes userType={userType} />}>
          <Route
            path="/"
            element={
              <HomePage isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
            }
          />
          <Route path="/signup" element={<HomePage />} />
        </Route>

        {/* Vendor Routes */}
        <Route element={<VendorRoutes userType={userType} />}>
          <Route path="/vendor-dahsboard" element={<VendorRoutes />} />
          <Route path="/vendor-Menu" element={<VenderMenu />} />
          <Route path="/vendor-Order" element={<VendorOrder />} />
          <Route path="/vendor-Restaurant" element={<VandorRestaurant />} />
        </Route>

        {/* Admin Route */}
        <Route element={<AdminRoute userType={userType} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/vendors" element={<AdminVendor />} />
          <Route path="/customer" element={<AdminCustomer />} />
          <Route path="/all-Restaurant" element={<AdminRestaurant />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserRoutes userType={userType} />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
