import { Schema, model, models } from "mongoose";

const listingSchema = new Schema(
  {
    // Basic listing information
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ["Flat", "House", "Studio", "Shared Room"],
    },

    // Location details
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nearbyStations: {
      type: [String],
    },

    // Property specizfications
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    area: {
      type: String,
    },
    amenities: {
      type: [String],
    },

    images: {
      type: [String],
    },

    // Ownership details
    owner: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Listing = models.Listing || model("Listing", listingSchema);