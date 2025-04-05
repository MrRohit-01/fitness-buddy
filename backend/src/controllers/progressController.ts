import { Response } from "express";
import { Progress } from "../models/Progress";
import { AuthRequest } from "../types/express";

// Get progress logs
export const getProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const progress = await Progress.find({ user: req.user._id });
  res.json(progress);
};

// Add new progress
export const createProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const { note, completedWorkouts } = req.body;

  const newProgress = await Progress.create({
    user: req.user._id,
    note,
    completedWorkouts,
  });

  res.status(201).json(newProgress);
};

// Update progress
export const updateProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const progress = await Progress.findById(req.params.id);

  if (!progress || progress.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ message: "Progress not found or unauthorized" });
    return;
  }

  const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete progress
export const deleteProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  const progress = await Progress.findById(req.params.id);

  if (!progress || progress.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ message: "Progress not found or unauthorized" });
    return;
  }

  await progress.deleteOne();
  res.json({ message: "Progress deleted" });
};
