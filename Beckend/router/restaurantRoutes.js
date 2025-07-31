import express from "express";
import {
  createFoodRestaurantController,
  createRestaurantController,
  deleteContoller,
  deleteFoodDataControl,
  foodItem_edit_contoller,
  getFoodDataControll,
  getRestaurantControll,
  getRestaurantHomeControll,
  isOpenContoller,
  updateContoller,
} from "../Controller/Controller.js";
import authMiddleware from "../Middleware/authCheck.js";

const restaurantRoutes = express.Router();

restaurantRoutes.post(
  "/create-restaurant",
  authMiddleware,
  createRestaurantController
);
restaurantRoutes.post(
  "/create-restaurant-food",
  authMiddleware,
  createFoodRestaurantController
);
restaurantRoutes.get(
  "/vendor-restaurant",
  authMiddleware,
  getRestaurantControll
);
restaurantRoutes.delete(
  "/vendor-restaurant/:id",
  authMiddleware,
  deleteContoller
);
restaurantRoutes.put("/vendor-restaurant/:id", authMiddleware, updateContoller);
restaurantRoutes.patch(
  "/vendor-restaurant-isOpen-status/:id",
  authMiddleware,
  isOpenContoller
);

restaurantRoutes.get(
  "/vendor-restaurant-get-food-data",
  authMiddleware,
  getFoodDataControll
);

restaurantRoutes.delete(
  "/vendor-restaurant-food-delete/:id",
  authMiddleware,
  deleteFoodDataControl
);

restaurantRoutes.put("/vendor-restaurant-food-edit/:id", authMiddleware, foodItem_edit_contoller)

// --------- for Home cards ---------
restaurantRoutes.get(
  "/vendor-restaurant-home",
  getRestaurantHomeControll
);













export default restaurantRoutes;
