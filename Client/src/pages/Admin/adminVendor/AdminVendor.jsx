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

const AdminVendor = () => {
  const [vendors, setVendors] = useState([]);
  const { isRefresh, setIsRefresh } = useAppContext()
  const fetchVendor = async () => {
    try {
      const vendorsGet = await axios.get(`${BASE_URL}/api/admin-all-vendor`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      setVendors(vendorsGet.data.data);
    } catch (error) {
      toaster({
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [isRefresh]);

  const isActiveHandling = async (user) => {
    try {
      const isVerifiedupdate = {
        isVerified: !user.isVerified,
      };
      await axios.patch(
        `${BASE_URL}/api/admin-isApprove/${user._id}`,
        isVerifiedupdate,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setIsRefresh(!isRefresh);
      toaster({
        message: "Vendor Verification status updated",
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
        All Vendors
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
            {vendors?.map((vendor) => (
              <TableRow key={vendor._id}>
                <TableCell align="center">{vendor.fullName}</TableCell>
                <TableCell align="center">{vendor.email}</TableCell>
                <TableCell align="center">{vendor._id}</TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    color={vendor.isVerified ? "secondary" : "error"}
                  >
                    {vendor.isVerified ? "True" : "False"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={vendor.isVerified}
                    onChange={() => isActiveHandling(vendor)}
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

export default AdminVendor;
