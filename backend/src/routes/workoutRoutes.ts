import express from "express";
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutWithProgress
} from "../controllers/workoutController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getWorkouts).post(protect, createWorkout);
router.route("/:id").put(protect, updateWorkout).delete(protect, deleteWorkout);
router.get("/:id/with-progress", protect, getWorkoutWithProgress); // New endpoint

export default router;
