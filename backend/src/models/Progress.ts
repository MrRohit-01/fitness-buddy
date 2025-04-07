import mongoose, { Document, Schema } from "mongoose";

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  note: String,
  completedWorkouts: Number,
  workout: { type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan" },
  completed: { type: Boolean, default: false }, // Mark if workout was fully completed
  completionTime: Number, // Time taken to complete in minutes
});

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  note?: string;
  completedWorkouts?: number;
  workout?: mongoose.Types.ObjectId;
  completed?: boolean;
  completionTime?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const Progress = mongoose.model<IProgress>("Progress", progressSchema);
