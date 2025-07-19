import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Stack,
  Chip,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, toaster } from "../../Utils/Utility";

export default function RestaurantCard({
  restaurant,
  setIsRefresh,
  isRefresh,
  setOpenModel,
  setSelectRestaurant,
}) {
  const {
    restaurantName,
    details,
    contactNumber,
    address,
    email,
    category,
    isOpen,
    fileUrl,
    approvedStatus,
  } = restaurant || {};

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/vendor-restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")} `,
        },
      });
      toaster({ message: "Restaurant deleted", type: "success" });
      setIsRefresh(!isRefresh);
    } catch (err) {
      toaster({ message: err.message, type: "error" });
    }
  };

  const isOpenStatus = async () => {
    try {
      const id = restaurant._id;
      const updateObj = {
        isOpen: !isOpen,
      };
      const response = await axios.patch(
        `${BASE_URL}/api/vendor-restaurant-isOpen-status/${id}`,
        updateObj,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.data.status) {
        return toaster({ message: response.data.message, type: "error" });
      }
      setIsRefresh(!isRefresh);

      toaster({ message: "Restaurant Status Update", type: "success" });
      setIsRefresh(!isRefresh);
    } catch (error) {
      toaster({ message: error.message, type: "error" });
    }
  };

  return (
    <>
<Card
  sx={{
    width: "100%",
    borderRadius: 4,
    boxShadow: 6,
    mt: 4,
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    '&:hover': {
      transform: "scale(1.01)",
      boxShadow: 10,
    },
    backgroundColor: "#f9fafb", // Light background
  }}
>
  {/* Image Section */}
  <Box
    component="img"
    src={fileUrl}
    alt={restaurantName}
    sx={{
      width: { xs: "100%", sm: 300 },
      height: { xs: 200, sm: 250},
      objectFit: "cover",
    }}
  />

  {/* Main Content */}
  <Box
    sx={{
      flex: 1,
      p: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    {/* Restaurant Name and Category */}
    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
      <RestaurantIcon color="primary" />
      <Typography variant="h5" fontWeight={600}>
        {restaurantName}
      </Typography>
    </Stack>

    {/* Chips */}
    <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
      <Chip label={category} color="info" variant="filled" />
      <Chip
        label={approvedStatus}
        color={
          approvedStatus === "approved"
            ? "success"
            : approvedStatus === "rejected"
            ? "error"
            : "warning"
        }
        icon={
          approvedStatus === "approved" ? (
            <CheckCircleIcon />
          ) : (
            <CancelIcon />
          )
        }
        size="small"
      />
    </Stack>

    {/* Contact Info */}
    <Stack direction="row" spacing={3} flexWrap="wrap" mb={2}>
      <Stack direction="row" spacing={1} alignItems="center">
        <EmailIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <PhoneIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {contactNumber}
        </Typography>
      </Stack>
    </Stack>

    {/* Details & Toggle */}
    <Typography variant="body2" color="text.primary" mb={2}>
      {details}
    </Typography>

    <Button
      onClick={isOpenStatus}
      size="small"
      variant="contained"
      sx={{ width: "fit-content" }}
      color={isOpen && approvedStatus === "approved" ? "success" : "error"}
    >
      {isOpen && approvedStatus === "approved" ? "Open" : "Closed"}
    </Button>
  </Box>

  {/* Action Icons */}
  <Box
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      backgroundColor: "#f1f5f9",
    }}
  >
    <Stack direction="row" spacing={1}>
      <IconButton onClick={() => deleteHandler(restaurant._id)} color="error">
        <DeleteIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          setSelectRestaurant(restaurant);
          setOpenModel(true);
        }}
        color="primary"
      >
        <EditIcon />
      </IconButton>
    </Stack>
  </Box>
</Card>





    </>
  );
}
