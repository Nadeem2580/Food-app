import userModel from "../Model/schema.js";

export const admin_AllVendorController = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const vendors = await userModel.find({
      type: "vendor",
    });
console.log(vendors , "vendors")
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
