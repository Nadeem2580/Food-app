import express from "express";
import { loginController, signUpController } from "../Controller/Controller.js";


const authRoutes = express.Router();


authRoutes.post("/login", loginController);
authRoutes.post("/signup", signUpController);



export default authRoutes;
