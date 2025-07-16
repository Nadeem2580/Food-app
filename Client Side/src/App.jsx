import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Bounce, ToastContainer } from "react-toastify";
import {
  VandorRestaurant,
  VenderDashboard,
  VenderMenu,
  VendorOrder,
} from "./Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<HomePage />} />

        {/* Vendor Routes */}

        <Route path="/vendor-dahsboard" element={<VenderDashboard />} />
        <Route path="/vendor-Menu" element={<VenderMenu />} />
        <Route path="/vendor-Order" element={<VendorOrder />} />
        <Route path="/vendor-Restaurant" element={<VandorRestaurant />} />
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
