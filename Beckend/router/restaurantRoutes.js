import express from "express";
import {
  createFoodRestaurantController,
  createRestaurantController,
  deleteContoller,
  deleteFoodDataControl,
  getFoodDataControll,
  getRestaurantControll,
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

export default restaurantRoutes;
