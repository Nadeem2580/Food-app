import express from "express";
import {
  createRestaurantController,
  deleteContoller,
  getRestaurantControll,
  updateContoller,
} from "../Controller/Controller.js";
import authMiddleware from "../Middleware/authCheck.js";

const restaurantRoutes = express.Router();


restaurantRoutes.post( "/create-restaurant", authMiddleware,createRestaurantController)
restaurantRoutes.get("/vendor-restaurant", authMiddleware, getRestaurantControll);
restaurantRoutes.delete("/vendor-restaurant/:id", authMiddleware, deleteContoller);
restaurantRoutes.put("/vendor-restaurant/:id", authMiddleware, updateContoller);

export default restaurantRoutes

// createRestaurantController
