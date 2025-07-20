import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./configue/db.js";
import authRoutes from "./router/authRoutes.js";
import restaurantRoutes from "./router/restaurantRoutes.js";
import uploadImage from "./router/routesImageUpload.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 3000;
dbConnect()



app.use("/api",authRoutes)
app.use("/api",restaurantRoutes)
app.use("/api",uploadImage)
app.get("/", (req , res)=>res.send("Api is working"))

app.listen(PORT, () => console.log(`server running on ${PORT}`));
