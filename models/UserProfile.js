import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

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

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    profilePicture: {
      type: String,
      required: true,
    },

    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    //Employee info
    employmentType: {
      type: String,
      required: true,
    },

    periodType: {
      type: String,
      required: true,
    },

    languages: {
      type: [String],
      default: [],
    },

    // Personal interests and preferences
    hobbies: {
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

    // Bookmark references
    bookmarks: {
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
