import { MenuItem, Select, Switch, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Cookies from "js-cookie";
import AdminLayout from "../../../Component/Layout/AdminLayout";
import { BASE_URL, toaster } from "../../../Utils/Utility";
import { useState } from "react";
import { useEffect } from "react";
const AdminRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const fetchRestaurants = async () => {
    try {
      const getRestaurants = await axios.get(
        `${BASE_URL}/api/admin-all-restaurant`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log(getRestaurants, "getRestaurants");

      setRestaurants(getRestaurants.data.data);
    } catch (error) {
      toaster({
        message: error.message,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [isRefresh]);


  const handleApprovalChange = async (restaurantId, newStatus) => {
    try {
      const isVerifiedupdate = {
        approvedStatus: newStatus,
      };
      console.log(isVerifiedupdate);
      await axios.patch(
        `${BASE_URL}/api/admin-Approval-request/${restaurantId}`,
        isVerifiedupdate,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setIsRefresh(!isRefresh);
      toaster({
        message: "Restaurant Verification status updated",
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
        All Restaurants
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="vendor table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Restaurant Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Vendor ID</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Isopen</TableCell>
              <TableCell align="center"> IsApprove</TableCell>
              <TableCell align="center">isApprove Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {restaurants?.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell align="center">
                  {restaurant.restaurantName}
                </TableCell>
                <TableCell align="center">{restaurant.email}</TableCell>
                <TableCell align="center">{restaurant._id}</TableCell>
                <TableCell align="center">{restaurant.contactNumber}</TableCell>
                <TableCell align="center">{restaurant.category}</TableCell>

                <TableCell align="center">
                  <Typography
                    variant="body2"
                    color={restaurant.isVerified ? "primary" : "error"}
                  >
                    {restaurant.isVerified ? "True" : "False"}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography
                    variant="body2"
                    color={
                      restaurant.approvedStatus == "approved"
                      ? "primary"
                      : "error"
                    }
                  >
                    {restaurant.approvedStatus.slice(0,1).toUpperCase() +restaurant.approvedStatus.slice(1) }
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Select
                    value={restaurant.approvedStatus}
                    onChange={(e) =>
                      handleApprovalChange(restaurant._id, e.target.value)
                    }
                    size="small"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
                    </>
  );
};

export default AdminRestaurant;
