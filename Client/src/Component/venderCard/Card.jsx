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
    isApproved,
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
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          marginTop: "30px",
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <RestaurantIcon color="primary" />
              <Typography variant="h6">{restaurantName}</Typography>
            </Stack>
            <Box>
              <DeleteIcon
                color="error"
                onClick={() => deleteHandler(restaurant._id)}
              />
              <EditIcon
                onClick={() => {
                  setSelectRestaurant(restaurant);
                  setOpenModel(true);
                }}
                sx={{ cursor: "pointer", ml: 1 }}
              />
            </Box>
          </Stack>

          <Divider />

          <Box
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              margin: "10px 0",
            }}
          >
            <Chip
              label={category}
              color="info"
              variant="outlined"
              size="small"
            />
            <Chip
              label={isApproved ? "Approved" : "Pending"}
              color={isApproved ? "success" : "warning"}
              icon={isApproved ? <CheckCircleIcon /> : <CancelIcon />}
              size="small"
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2">{email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon fontSize="small" color="action" />
              <Typography variant="body2">{contactNumber}</Typography>
            </Stack>
          </Box>

          <Divider />

          <Box mt={2}>
            <Typography variant="h6">{details}</Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={isOpenStatus}
            size="small"
            variant="outlined"
            color={isOpen ? "success" : "error"}
          >
            {isOpen ? "Open" : "Closed"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
