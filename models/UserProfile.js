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

    languages: {
      type: [String],
      default: [],
      required: true
    },

    //Employement information
    type: {
      type: String,
      required: true
    },

    period: {
      type: String,
      required: true
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
<<<<<<< Updated upstream
=======

    // Bookmark references
    bookmarks: {
      type: [Schema.Types.ObjectId],
      ref: "Listing",
      default: [],
    }
>>>>>>> Stashed changes
  },
  {
    timestamps: true,
  },
);

export const UserProfile =
  models.UserProfile || model("UserProfile", userProfileSchema);
