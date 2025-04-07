import { Response } from "express";
import { Progress } from "../models/Progress";
import { WorkoutPlan } from "../models/WorkoutPlan";
import { AuthRequest } from "../types/express";

// Get progress logs
export const getProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const progress = await Progress.find({ user: req.user?._id })
    .populate("workout", "title description");
  res.json(progress);
};

// Add new progress
export const createProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const { note, completedWorkouts, workout, completed, completionTime } = req.body;

  // Verify workout exists and belongs to user if workout ID is provided
  if (workout) {
    const workoutPlan = await WorkoutPlan.findById(workout);
    if (!workoutPlan) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }
    if (workoutPlan.user.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "You can only track progress for your own workouts" });
      return;
    }
  }

  const newProgress = await Progress.create({
    user: req.user?._id,
    note,
    completedWorkouts,
    workout,
    completed,
    completionTime
  });

  const populatedProgress = await Progress.findById(newProgress._id)
    .populate("workout", "title description");

  res.status(201).json(populatedProgress);
};

// Update progress
export const updateProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const progress = await Progress.findById(req.params.id);

  if (!progress || progress.user.toString() !== req.user?._id.toString()) {
    res.status(404).json({ message: "Progress not found or unauthorized" });
    return;
  }

  // Verify workout exists and belongs to user if workout ID is provided or updated
  if (req.body.workout) {
    const workoutPlan = await WorkoutPlan.findById(req.body.workout);
    if (!workoutPlan) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }
    if (workoutPlan.user.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "You can only track progress for your own workouts" });
      return;
    }
  }

  const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate("workout", "title description");
  
  res.json(updated);
};

// Delete progress
export const deleteProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const progress = await Progress.findById(req.params.id);

  if (!progress || progress.user.toString() !== req.user?._id.toString()) {
    res.status(404).json({ message: "Progress not found or unauthorized" });
    return;
  }

  await progress.deleteOne();
  res.json({ message: "Progress deleted" });
};
