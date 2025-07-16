import React, { useEffect, useState } from "react";
import VenderLayout from "../../../Component/Layout/VenderLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import VendorModal from "../../../Component/Modal/Modal";
import axios from "axios";
import { BASE_URL, toaster } from "../../../Utils/Utility";
import Cookies from "js-cookie";
import RestaurantCard from "../../../Component/venderCard/Card";
import UpdateModal from "../../../Component/Modal/UpdateModel";

const VandorRestaurant = () => {
  const [vendorModals, setVendorModals] = useState(false); // for Create
  const [updateModalOpen, setUpdateModalOpen] = useState(false); // for Update
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [isRefresh]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/vendor-restaurant`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setRestaurantData(res.data.data);
    } catch (error) {
      toaster({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <VenderLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Vendor Restaurant</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setVendorModals(true);
          }}
        >
          Create Your Restaurant
        </Button>
      </Box>

      <Grid container spacing={2} mt={2}>
        {restaurantData?.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            restaurant={restaurant}
            setIsRefresh={setIsRefresh}
            isRefresh={isRefresh}
            setUpdateModalOpen={setUpdateModalOpen}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        ))}
      </Grid>

     <VendorModal
  open={vendorModals}
  setOpen={setVendorModals}
  isRefresh={isRefresh}
  setIsRefresh={setIsRefresh}
/>

<UpdateModal
  open={updateModalOpen}
  setOpen={setUpdateModalOpen}
  restaurant={selectedRestaurant}
  setIsRefresh={setIsRefresh}
  isRefresh={isRefresh}
/>
    </VenderLayout>
  );
};

export default VandorRestaurant;
