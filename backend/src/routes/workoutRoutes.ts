import express from "express";
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getWorkouts).post(protect, createWorkout);
router.route("/:id").put(protect, updateWorkout).delete(protect, deleteWorkout);

export default router;
