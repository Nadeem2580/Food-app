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
import upload from "../Middleware/MulterMiddleware.js";

const restaurantRoutes = express.Router();

restaurantRoutes.post(
  "/create-restaurant",
  upload.single("file"),
  authMiddleware,
  createRestaurantController
);
restaurantRoutes.post(
  "/create-restaurant-food",
  upload.single("file"),
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
  "/vendor-restaurant-get-food-data/:id",
  authMiddleware,
  deleteFoodDataControl
);

export default restaurantRoutes;
