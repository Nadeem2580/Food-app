import RestaurantModel from "../Model/RestaurantSchema.js";
import userModel from "../Model/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    const restaurantObj = {
      ...body,
      createBy: userId,
    };
    const response = await RestaurantModel.create(restaurantObj);

    res.json({
      status: true,
      data: response,
      message: "successfully created! wait for the Admin Approval",
    });
  } catch (error) {
    res.json({
      status: false,
      data: null,
      message: error.message || "something went wrong",
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

    if (!getSingle.isApproved) {
      res.json({
        message: "Wait for admin approval",
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
