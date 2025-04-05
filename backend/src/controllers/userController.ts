import { Request, Response } from "express";
import { User } from "../models/User";

export const getUsersByGoal = async (req: Request, res: Response): Promise<void> => {
  const { goal } = req.query;
  if (!goal) {
    res.status(400).json({ message: "Goal is required" });
    return;
  }

  const users = await User.find({ fitnessGoal: goal }).select("-password");
  res.json(users);
};
