import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  exercises: [
    {
      name: String,
      sets: Number,
      reps: Number,
      rest: String,
    },
  ],
  goalType: { type: String, required: true }, // Same as fitnessGoal
});

export const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);
