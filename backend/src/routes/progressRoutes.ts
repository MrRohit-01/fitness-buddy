import express from "express";
import {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
} from "../controllers/progressController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getProgress).post(protect, createProgress);
router.route("/:id").put(protect, updateProgress).delete(protect, deleteProgress);

export default router;
