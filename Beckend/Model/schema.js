import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { enum: ["male", "female"] },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean,default:false },
  type: { enum: ["admin", "user"] },
  createdAt: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;


