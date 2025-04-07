import mongoose, { Document, Schema } from "mongoose";

export interface IWorkoutProgress extends Document {
  user: mongoose.Types.ObjectId;
  workout: mongoose.Types.ObjectId;
  date: Date;
  notes: string;
  metrics: {
    weight?: number;
    reps?: number;
    sets?: number;
    distance?: number;
    duration?: number;
    [key: string]: any; // For custom metrics
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IWorkoutProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workout: {
      type: Schema.Types.ObjectId,
      ref: "WorkoutPlan",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
    },
    metrics: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const WorkoutProgress = mongoose.model<IWorkoutProgress>("WorkoutProgress", ProgressSchema);
