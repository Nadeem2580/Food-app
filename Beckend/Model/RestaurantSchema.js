import mongoose from "mongoose";

const schema = new mongoose.Schema({
  restaurantName: String,
  details: String,
  address: String,
  contactNumber: String,
  email: String,
  imageUrl: { type: String, default: null },
  category: String,
  isOpen: {
    type: Boolean,
    default: false,
  },
  approvedStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  createBy: String, // create user relation using ref

  createAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const RestaurantModel = mongoose.model("restaurant", schema);

export default RestaurantModel;
