import { Request, Response } from "express";
import { User } from "../models/User";

export const getUsersByGoal = async (req: Request, res: Response) => {
  const { goal } = req.query;
  if (!goal) return res.status(400).json({ message: "Goal is required" });

  const users = await User.find({ fitnessGoal: goal }).select("-password");
  res.json(users);
};
