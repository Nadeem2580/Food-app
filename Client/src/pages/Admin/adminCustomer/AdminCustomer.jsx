import { Switch, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BASE_URL, toaster } from "../../../Utils/Utility";
import { useAppContext } from "../../../Context/userContext";

const AdminCustomer = () => {
  const [customers, setcustomers] = useState([]);
  const {isRefresh , setIsRefresh} = useAppContext()
  const fetchCustomer = async () => {
    try {
      const customersGet = await axios.get(
        `${BASE_URL}/api/admin-all-customer`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setcustomers(customersGet.data.data);
    } catch (error) {
      toaster({
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [isRefresh]);
  const isActiveHandling = async (customer) => {
    try {
      const isVerifiedupdate = {
        isVerified: !customer.isVerified,
      };
      await axios.patch(
        `${BASE_URL}/api/admin-isApprove/${customer._id}`,
        isVerifiedupdate,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setIsRefresh(!isRefresh);
      toaster({
        message: "customer Verification status updated",
        type: "success",
      });
    } catch (error) {
      toaster({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        textAlign="center"
        sx={{
          padding: "20px 0",
          boxShadow: "0 1px 3px black",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        All Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="vendor table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Vendor ID</TableCell>
              <TableCell align="center">isVerified</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers?.map((customer) => (
              <TableRow key={customer._id}>
                <TableCell align="center">{customer.fullName}</TableCell>
                <TableCell align="center">{customer.email}</TableCell>
                <TableCell align="center">{customer._id}</TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    color={customer.isVerified ? "secondary" : "error"}
                  >
                    {customer.isVerified ? "True" : "False"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={customer.isVerified}
                    onChange={() => isActiveHandling(customer)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>

  );
};

export default AdminCustomer;
