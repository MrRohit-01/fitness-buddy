import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  note: String,
  completedWorkouts: Number,
});

export const Progress = mongoose.model("Progress", progressSchema);
