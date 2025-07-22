import AdminCustomer from "../adminCustomer/AdminCustomer";
import AdminVendor from "../adminVendor/AdminVendor";

const AdminDashboard = () => {
  return (
    <>
      <AdminVendor />

      <AdminCustomer />
    </>
  );
};

export default AdminDashboard;
