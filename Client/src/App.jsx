import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";
import AdminLayout from "./Component/Layout/AdminLayout";
import VenderLayout from "./Component/Layout/VenderLayout";
import { useAppContext } from "./Context/userContext";
import {
  AdminDashboard,
  VandorRestaurant,
  VenderMenu,
  VendorOrder
} from "./Index";
import AdminCustomer from "./pages/Admin/adminCustomer/AdminCustomer";
import AdminRestaurant from "./pages/Admin/adminRestaurants/AdminRestaurant";
import AdminVendor from "./pages/Admin/adminVendor/AdminVendor";
import LoginPage from "./pages/Auth/Login";
import HomePage from "./pages/HomePage";
import AdminRoute from "./pages/Routes/AdminRoute";
import AuthRoutes from "./pages/Routes/AuthRoutes";
import UserRoutes from "./pages/Routes/UserRoutes";
import VendorRoutes from "./pages/Routes/VendorRoutes";
import UserDashboard from "./pages/users/userDashboard/UserDashboard";
function App() {

  const { token, userType } = useAppContext()

  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthRoutes userType={userType} />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
        </Route>

        {/* Vendor Routes */}

        <Route element={<VenderLayout > <VendorRoutes userType={userType} /> </VenderLayout>}>
          <Route path="/vendor-Restaurant" element={<VandorRestaurant />} />
          <Route path="/vendor-Menu" element={<VenderMenu />} />
          <Route path="/vendor-Order" element={<VendorOrder />} />
        </Route>

        {/* Admin Route */}
        <Route
          element={
            <AdminLayout >
              <AdminRoute userType={userType} />
            </AdminLayout>
          }
        >
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/vendors" element={<AdminVendor />} />
          <Route path="/customer" element={<AdminCustomer />} />
          <Route path="/all-Restaurant" element={<AdminRestaurant />} />
        </Route>

        {/* User Routes */}


        <Route element={<AdminLayout ><UserRoutes userType={userType} /></AdminLayout>}>
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
