import React, { useEffect, useState } from "react";
import VenderLayout from "../../../Component/Layout/VenderLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import VendorModal from "../../../Component/Modal/Modal";
import axios from "axios";
import { BASE_URL, toaster } from "../../../Utils/Utility";
import Cookies from "js-cookie";
import RestaurantCard from "../../../Component/allCard/Card";
import EditModel from "../../../Component/Modal/EditModal";
import { useAppContext } from "../../../Context/userContext";

const VandorRestaurant = () => {
  //  ------------ Create Model -------------
  const [vendorModals, setVendorModals] = useState(false);

  //  ------------ Update Model -------------
  const [OpenModel, setOpenModel] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectRestaurant, setSelectRestaurant] = useState({});
     const {isRefresh ,setIsRefresh} = useAppContext()
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
    
    <>
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
            setOpenModel={setOpenModel}
            setSelectRestaurant={setSelectRestaurant}
          />
        ))}
      </Grid>

      <VendorModal
        open={vendorModals}
        setOpen={setVendorModals}
        isRefresh={isRefresh}
        setIsRefresh={setIsRefresh}
      />

      {OpenModel && (
        <EditModel
          open={OpenModel}
          setOpen={setOpenModel}
          restaurantData={restaurantData}
          selectRestaurant={selectRestaurant}
          isRefresh={isRefresh}
          setIsRefresh={setIsRefresh}
        />
      )}
   </>
  );
};

export default VandorRestaurant;
