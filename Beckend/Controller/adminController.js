import userModel from "../Model/schema.js";
import RestaurantModel from "../Model/RestaurantSchema.js";

export const admin_AllVendorController = async (req, res) => {
  try {
    const vendors = await userModel.find({
      type: "vendor",
    });
    res.json({
      message: "All vendor fetched",
      status: true,
      data: vendors,
    });
  } catch (error) {
    res.json({
      message: error.message || "something went wrong",
      status: false,
      data: null,
    });
  }
};

export const admin_all_customer_Controller = async (req, res) => {
  try {
    const customers = await userModel.find({
      type: "customer",
    });
    res.json({
      message: "",
      status: true,
      data: customers,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};
export const admin_isArrove_Contoller = async (req, res) => {
  try {
    const id = req.params.id;
    const isVerifiedUpdate = {
      isVerified: req.body.isVerified,
    };

    const isVerifieResponse = await userModel.findByIdAndUpdate(
      id,
      isVerifiedUpdate,
      { key: true }
    );
    res.json({
      message: "vefication status updated",
      status: true,
      data: isVerifieResponse,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};

export const admin_all_restaurant_Controller = async (req, res) => {
  try {
    const allRestaurant = await RestaurantModel.find({});

    res.json({
      message: "Get all restaurant",
      status: true,
      data: allRestaurant,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};

export const admin_isArroved_Contoller = async (req, res) => {
  try {
    const id = req.params.id;
    const isVerifiedUpdate = {
      approvedStatus: req.body.approvedStatus,
    };

    const isVerifieResponse = await RestaurantModel.findByIdAndUpdate(
      id,
      isVerifiedUpdate,
      { key: true }
    );
    res.json({
      message: "vefication status updated",
      status: true,
      data: isVerifieResponse,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};
