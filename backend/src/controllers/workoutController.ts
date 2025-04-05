import { Request, Response } from "express";
import { WorkoutPlan } from "../models/WorkoutPlan";

// Get all workout plans for logged-in user
export const getWorkouts = async (req: any, res: Response) => {
  const workouts = await WorkoutPlan.find({ user: req.user._id });
  res.json(workouts);
};

// Create a workout plan
export const createWorkout = async (req: any, res: Response) => {
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
export const updateWorkout = async (req: any, res: Response) => {
  const workout = await WorkoutPlan.findById(req.params.id);

  if (!workout || workout.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Workout not found or unauthorized" });
  }

  const updated = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete workout
export const deleteWorkout = async (req: any, res: Response) => {
  const workout = await WorkoutPlan.findById(req.params.id);

  if (!workout || workout.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: "Workout not found or unauthorized" });
  }

  await workout.deleteOne();
  res.json({ message: "Workout deleted" });
};
