import express from "express";
import {
  followUser,
  unfollowUser,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getSocialInfo,
} from "../controllers/socialController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getSocialInfo);

router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);

router.post("/friend-request/:id", protect, sendFriendRequest);
router.post("/accept-friend/:id", protect, acceptFriendRequest);
router.post("/reject-friend/:id", protect, rejectFriendRequest);

export default router;
