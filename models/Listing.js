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
      enum: ["Flat", "House", "Studio", "Shared Flat", "Shared House"],
    },
    availability: {
      type: String,
      required: true,
      enum: ["Available", "Unavailable"],
    },

    // Location details
    country: {
      type: String,
      required: true,
    },
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

    // Property specifications
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    bedroomsAvailable: {
      type: Number,
      min: 0,
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

    // Additional details
    images: {
      type: [String],
    },
    // for now just keep names of tenants
    tenants: {
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
