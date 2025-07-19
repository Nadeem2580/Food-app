import RestaurantModel from "../Model/RestaurantSchema.js";
import userModel from "../Model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path"; // if needed
import fs from "fs";
import cloudinary from "../configue/Cloudnary.js";
import { triggerAsyncId } from "async_hooks";
import ItemFoodSchema from "../Model/ItemCreateSchema.js";

// ------------ signUpController -------------
export const signUpController = async (req, res) => {
  try {
    const body = req.body;
    const response = await userModel.findOne({ email: body.email });

    if (response) {
      return res.json({
        status: "false",
        message: "User already exist",
        data: null,
      });
    }
    const hashPassowrd = await bcrypt.hash(body.password, 10);
    const userObg = {
      ...body,
      password: hashPassowrd,
    };

    const userCreate = await userModel.create(userObg);
    res.json({
      status: true,
      message: "User created successfully",
      data: userCreate,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message || "something went wrong",
      data: null,
    });
  }
};
// ------------ signUpController  end-------------

// ------------ LoginController  Start-------------

export const loginController = async (req, res) => {
  try {
    const body = req.body;

    const user = await userModel.findOne({ email: body.email });

    if (!user) {
      return res.json({
        status: false,
        message: "email or password is invalided",
        data: null,
      });
    }
    const comparePass = await bcrypt.compare(body.password, user.password);

    if (!comparePass) {
      return res.json({
        status: false,
        message: "email or password is invalids",
        data: null,
      });
    }

    const privateKey = process.env.PRIVATE_KEY;

    const token = jwt.sign({ id: user._id }, privateKey);
    res.json({
      status: true,
      message: "User successfully login",
      data: user,
      token,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

// ------------ LoginController  End-------------

// ------------ createRestaurantController  Start-------------

export const createRestaurantController = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    const parsedBody = JSON.parse(req.body.createRestaurant);
    let fileUrl = "";

    if (req.file) {
      fileUrl = req.file.path; // multer-storage-cloudinary gives file.path as secure_url
    }
    console.log(fileUrl, "fileUrl");
    const restaurantObj = {
      ...parsedBody,
      fileUrl,
      createBy: userId,
    };

    const response = await RestaurantModel.create(restaurantObj);
    console.log(response, "response create Restaurant");

    res.json({
      status: true,
      data: response,
      message: "Successfully created! Wait for admin approval.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

// ------------ createRestaurantController  End-------------

// ------------ getRestaurantControll  Start-------------

export const getRestaurantControll = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await RestaurantModel.find({
      createBy: userId,
      isDeleted: false,
    });

    res.json({ message: "Fetch restaurant", data: data, status: true });
  } catch (error) {
    res.json({ message: error.message, data: null, status: false });
  }
};

// ------------ getRestaurantControll  End-------------

// ------------ deleteContoller Start-------------

export const deleteContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDelete = {
      isDeleted: true,
    };
    const response = await RestaurantModel.findByIdAndUpdate(id, updateDelete);
    res.json({
      message: "Deleted Successfully",
      status: true,
      data: null,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// ------------ deleteContoller End-------------

// ------------ updateContoller Start-------------
export const updateContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await RestaurantModel.findByIdAndUpdate(id, req.body, {
      key: true,
    });
    res.json({
      message: "Deleted Successfully",
      status: true,
      data: null,
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};
// ------------ updateContoller End -------------

// ------------ IsOpenContoller Start -------------
export const isOpenContoller = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const getSingle = await RestaurantModel.findById(id);

    if (getSingle.approvedStatus === "pending") {
      res.json({
        message: "Restaurant is on pendiing Wait for admin approval",
        status: false,
        data: null,
      });
    } else if (getSingle.approvedStatus === "rejected") {
      res.json({
        message: "Restaurant is rejected by admin ",
        status: false,
        data: null,
      });
    }

    const updateObj = {
      isOpen: body.isOpen,
    };
    await RestaurantModel.findByIdAndUpdate(id, updateObj);
    return res.json({
      status: true,
      message: "restaurant status updated!",
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

// ------------ IsOpenContoller End -------------


export const uploadImageContoller =(req, res)=>{
  try {

console.log(req.files[0].path , "req")







res.json({
      message: "image Uploaded",
      status: true,
      data: null,
    });    
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
}






export const createFoodRestaurantController = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    const parsedBody = JSON.parse(req.body.createFoodItem);
    console.log(parsedBody, "parsedBody");
    console.log(userId, "userId");
    let fileUrl = "";
    if (req.file) {
      fileUrl = req.file.path;
    }

    console.log(fileUrl, "fileUrl");
    const restaurantObj = {
      ...parsedBody,
      fileUrl,
      createBy: userId,
    };

    const response = await ItemFoodSchema.create(restaurantObj);
    console.log(response, "response create Restaurant");

    return res.json({
      status: true,
      message: "restaurant food created",
    });
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const getFoodDataControll = async (req, res) => {
  try {
    const userID = req.user.id;
    const foodData = await ItemFoodSchema.find({
      createBy: userID,
      isDeleted: false,
    });

    res.json({
      message: "Get all food item",
      status: true,
      data: foodData,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};

export const deleteFoodDataControl = async (req, res) => {
  try {
    const id = req.params.id;
    const responseDelete = await ItemFoodSchema.findById(id);

    console.log(responseDelete);
    res.json({
      message: "Delete food item",
      status: true,
      data: null,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};
