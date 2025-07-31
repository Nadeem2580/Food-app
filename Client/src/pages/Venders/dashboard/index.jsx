import React, { useEffect, useState } from "react";
import VenderLayout from "../../../Component/Layout/VenderLayout";
import RestaurantTabs from "../../../Component/Layout/Tabs";
import ItemModal from "../../../Component/Modal/ItemModel";
import { Button } from "@mui/material";
import axios from "axios";
import { BASE_URL, toaster } from "../../../Utils/Utility";
import Cookies from "js-cookie";
import FoodEditModal from "../../../Component/Modal/FoodEdit";
import { useAppContext } from "../../../Context/userContext";
const VenderDashboard = () => {
  const [fooditemModel, setFooditemModel] = useState(false);
  const [dataFood, setDataFood] = useState([]);
  const { isRefresh, setIsRefresh } = useAppContext()
  const FoodCardsData = async () => {
    try {
      const foodData = await axios.get(
        `${BASE_URL}/api/vendor-restaurant-get-food-data`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setDataFood(foodData.data.data);
    } catch (error) {
      toaster({
        message: error.message || "Something went wrong",
        type: "error",
      });
    }
  };
  useEffect(() => {
    FoodCardsData();
  }, [isRefresh]);

  return (
    <>
      {/* ----Create item button --------- */}
      <Button
        variant="contained"
        sx={{ float: "right" }}
        onClick={() => setFooditemModel(true)}
      >
        Create food item
      </Button>
      {/* ----Create item button --------- */}
      {/* ----Restaurant Tabs button --------- */}
      <RestaurantTabs
        dataFood={dataFood}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
      />
      {/* ----Restaurant Tabs button --------- */}
      {/* ----Item Modal --------- */}
      <ItemModal
        open={fooditemModel}
        setOpen={setFooditemModel}
        setIsRefresh={setIsRefresh}
        isRefresh={isRefresh}
      />
      {/* ----Item Modal --------- */}

    </>
  );
};

export default VenderDashboard;
