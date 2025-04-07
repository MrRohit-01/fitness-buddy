import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  fitnessGoal?: string;
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  friendRequests: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fitnessGoal: { type: String },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
