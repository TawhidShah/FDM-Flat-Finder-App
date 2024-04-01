import { Schema, model, models } from "mongoose";

const userProfileSchema = new Schema(
  {
    // Personal identification
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
    },

    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true
    },

    // Personal interests and preferences
    hobbies: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    preferences: {
      type: [String],
      default: [],
    },

    // Geographic information
    country: {
      type: String,
      required: true,
    },
    
    // Listing references
    listings: {
      type: [Schema.Types.ObjectId],
      ref: "Listing",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const UserProfile =
  models.UserProfile || model("UserProfile", userProfileSchema);
