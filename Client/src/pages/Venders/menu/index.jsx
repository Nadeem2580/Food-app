import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import RestaurantTabs from '../../../Component/Layout/Tabs';
import { useAppContext } from '../../../Context/userContext';
import { BASE_URL, toaster } from '../../../Utils/Utility';
const VenderMenu = () => {

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
      setDataFood(foodData.data.data)
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
      <RestaurantTabs dataFood={dataFood} />
    </>


  )
}

export default VenderMenu