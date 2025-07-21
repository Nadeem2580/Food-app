import express from "express";
import {
  loginController,
  signUpController,
  singleUserControl,
} from "../Controller/Controller.js";
import authMiddleware from "../Middleware/authCheck.js";

const authRoutes = express.Router();

authRoutes.post("/login", loginController);
authRoutes.post("/signup", signUpController);
authRoutes.get("/login.sigleUser", authMiddleware, singleUserControl);

export default authRoutes;
