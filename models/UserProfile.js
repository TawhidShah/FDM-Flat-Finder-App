import { Schema, model, models } from "mongoose";

const userProfileSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    country: {
      type: String,
      required: true,
    },
    preferences: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const UserProfile = models.UserProfile || model("UserProfile", userProfileSchema);