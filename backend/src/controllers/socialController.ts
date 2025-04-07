import { Request, Response } from "express";
import { User } from "../models/User";
import { AuthRequest } from "../types/express";
import { Types } from "mongoose";

// Follow a user
export const followUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const targetId = req.params.id;
  const currentUser = req.user!;

  if (targetId === currentUser._id.toString()) {
    res.status(400).json({ message: "You can't follow yourself." });
    return;
  }

  const targetUser = await User.findById(targetId);
  if (!targetUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!targetUser.followers.includes(currentUser._id)) {
    targetUser.followers.push(currentUser._id);
    await targetUser.save();

    await User.findByIdAndUpdate(currentUser._id, {
      $addToSet: { following: targetUser._id },
    });

    res.status(200).json({ message: "User followed successfully." });
  } else {
    res.status(400).json({ message: "Already following user." });
  }
};

// Unfollow a user
export const unfollowUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const targetId = req.params.id;
  const currentUser = req.user!;

  await User.findByIdAndUpdate(targetId, {
    $pull: { followers: currentUser._id },
  });

  await User.findByIdAndUpdate(currentUser._id, {
    $pull: { following: targetId },
  });

  res.status(200).json({ message: "User unfollowed successfully." });
};

// Send a friend request
export const sendFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const targetId = req.params.id;
  const currentUser = req.user!;

  if (targetId === currentUser._id.toString()) {
    res.status(400).json({ message: "You can't friend yourself." });
    return;
  }

  const targetUser = await User.findById(targetId);
  if (!targetUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (targetUser.friendRequests.includes(currentUser._id)) {
    res.status(400).json({ message: "Friend request already sent." });
    return;
  }

  if (targetUser.friends.includes(currentUser._id)) {
    res.status(400).json({ message: "Already friends." });
    return;
  }

  targetUser.friendRequests.push(currentUser._id);
  await targetUser.save();

  res.status(200).json({ message: "Friend request sent." });
};

// Accept a friend request
export const acceptFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const senderId = req.params.id;
  const currentUser = await User.findById(req.user!._id);

  if (!currentUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const senderObjectId = new Types.ObjectId(senderId);

  if (!currentUser.friendRequests.some(id => id.equals(senderObjectId))) {
    res.status(400).json({ message: "No friend request from this user." });
    return;
  }

  currentUser.friends.push(senderObjectId);
  currentUser.friendRequests = currentUser.friendRequests.filter(
    id => !id.equals(senderObjectId)
  );

  await currentUser.save();

  await User.findByIdAndUpdate(senderId, {
    $addToSet: { friends: currentUser._id },
  });

  res.status(200).json({ message: "Friend request accepted." });
};

// Reject a friend request
export const rejectFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const senderId = req.params.id;
  const currentUser = await User.findById(req.user!._id);

  if (!currentUser) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const senderObjectId = new Types.ObjectId(senderId);
  currentUser.friendRequests = currentUser.friendRequests.filter(
    id => !id.equals(senderObjectId)
  );

  await currentUser.save();

  res.status(200).json({ message: "Friend request rejected." });
};

// Get social info
export const getSocialInfo = async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!._id)
    .populate("following", "name email")
    .populate("followers", "name email")
    .populate("friends", "name email")
    .populate("friendRequests", "name email");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    followers: user.followers,
    following: user.following,
    friends: user.friends,
    friendRequests: user.friendRequests,
  });
};
