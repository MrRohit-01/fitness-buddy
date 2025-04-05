import express from "express";
import { getUsersByGoal } from "../controllers/userController";

const router = express.Router();
router.get("/match", getUsersByGoal);

export default router;
