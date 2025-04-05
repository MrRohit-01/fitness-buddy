import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fitnessGoal: { type: String, required: true }, // e.g., "weight loss", "muscle gain"
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
