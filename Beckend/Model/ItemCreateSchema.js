import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
  description: { type: String },
  category: { type: String },
  fileUrl: { type: String, default: null },
  image: { type: String },
  isApprovedStatus: { enum: ["approved", "pending", "rejected"] },
  isavailable: { type: Boolean, default: false },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  createBy: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const ItemFoodSchema = mongoose.model("food", Schema);

export default ItemFoodSchema;
