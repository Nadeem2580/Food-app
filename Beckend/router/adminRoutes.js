import express from "express"
import authMiddleware from "../Middleware/authCheck.js"
import { admin_AllVendorController } from "../Controller/adminController.js"

const adminRouter = express.Router()

adminRouter.get("/admin-all-vendor" , authMiddleware , admin_AllVendorController)



export default adminRouter