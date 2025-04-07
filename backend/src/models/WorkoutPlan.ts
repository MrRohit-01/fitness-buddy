import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      rest: { type: String },
      weight: { type: Number },
      notes: { type: String },
    },
  ],
  goalType: { 
    type: String, 
    required: true,
    enum: ['weightLoss', 'muscleGain', 'staminaBuilding', 'general'] // Adding enum for validation
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add a pre-save hook to update the 'updatedAt' field
workoutPlanSchema.pre('save', function(next) {
  this.updatedAt = new Date(Date.now());
  next();
});

export const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);
