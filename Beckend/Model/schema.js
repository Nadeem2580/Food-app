import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  type: {
    type: String,
    enum: ["admin", "vendor", "customer"],
    default: "customer",
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
