import { Response } from "express";
import { WorkoutPlan } from "../models/WorkoutPlan";
import { AuthRequest } from "../types/express";

// Get all workout plans for logged-in user
export const getWorkouts = async (req: AuthRequest, res: Response): Promise<void> => {
  const workouts = await WorkoutPlan.find({ user: req.user._id });
  res.json(workouts);
};

// Create a workout plan
export const createWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, exercises, goalType } = req.body;

  const newWorkout = await WorkoutPlan.create({
    user: req.user._id,
    title,
    description,
    exercises,
    goalType,
  });

  res.status(201).json(newWorkout);
};

// Update workout
export const updateWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  const workout = await WorkoutPlan.findById(req.params.id);

  if (!workout || workout.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ message: "Workout not found or unauthorized" });
    return;
  }

  const updated = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete workout
export const deleteWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  const workout = await WorkoutPlan.findById(req.params.id);

  if (!workout || workout.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ message: "Workout not found or unauthorized" });
    return;
  }

  await workout.deleteOne();
  res.json({ message: "Workout deleted" });
};
