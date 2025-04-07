import { Response } from "express";
import { WorkoutPlan } from "../models/WorkoutPlan"; // Updated import path
import { WorkoutProgress } from "../models/progressModel";
import { AuthRequest } from "../types/express";

// Get all workout plans for logged-in user
export const getWorkouts = async (req: AuthRequest, res: Response): Promise<void> => {
  const workouts = await WorkoutPlan.find({ user: req.user?._id });
  res.json(workouts);
};

// Get workout with progress
export const getWorkoutWithProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const workout = await WorkoutPlan.findOne({ 
    _id: req.params.id,
    user: req.user?._id 
  });

  if (!workout) {
    res.status(404).json({ message: "Workout not found" });
    return;
  }

  // Get related progress entries for this workout
  const progressEntries = await WorkoutProgress.find({
    user: req.user?._id,
    workout: req.params.id
  }).sort({ date: -1 });

  res.json({
    workout,
    progress: progressEntries
  });
};

// Create a workout plan
export const createWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, exercises, goalType } = req.body;
    
    // Basic validation
    if (!title || !goalType || !exercises || !Array.isArray(exercises)) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const newWorkout = await WorkoutPlan.create({
      user: req.user?._id,
      title,
      description,
      exercises,
      goalType,
    });

    res.status(201).json(newWorkout);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update workout
export const updateWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);

    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }
    
    if (workout.user.toString() !== req.user?._id.toString()) {
      res.status(403).json({ message: "Not authorized to update this workout" });
      return;
    }

    const updated = await WorkoutPlan.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: new Date() }, 
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete workout
export const deleteWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  const workout = await WorkoutPlan.findById(req.params.id);

  if (!workout || workout.user.toString() !== req.user?._id.toString()) {
    res.status(404).json({ message: "Workout not found or unauthorized" });
    return;
  }

  // Delete associated progress entries when deleting a workout
  await WorkoutProgress.deleteMany({ workout: req.params.id });
  
  await workout.deleteOne();
  res.json({ message: "Workout and associated progress deleted" });
};
