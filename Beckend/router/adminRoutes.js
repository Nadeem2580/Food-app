import express from "express"
import authMiddleware from "../Middleware/authCheck.js"
import { admin_all_customer_Controller, admin_all_restaurant_Controller, admin_AllVendorController, admin_isArrove_Contoller, admin_isArroved_Contoller } from "../Controller/adminController.js"

const adminRouter = express.Router()

adminRouter.get("/admin-all-vendor" , authMiddleware , admin_AllVendorController)
adminRouter.get("/admin-all-customer" , authMiddleware , admin_all_customer_Controller)
adminRouter.get("/admin-all-restaurant" , authMiddleware , admin_all_restaurant_Controller)
adminRouter.patch("/admin-isApprove/:id" , authMiddleware , admin_isArrove_Contoller)
adminRouter.patch("/admin-Approval-request/:id" , authMiddleware , admin_isArroved_Contoller)



export default adminRouter