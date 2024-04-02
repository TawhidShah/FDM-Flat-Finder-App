import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import { Listing } from "../../../../models/Listing";
import { getAuth } from "@clerk/nextjs/server";
import { UserProfile } from "@/models/UserProfile";

export async function DELETE(request, context) {
  await mongooseConnect();
  const { id } = context.params;

  const { userId } = getAuth(request);

  const listing = await Listing.findById(id);

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const owner = await UserProfile.findOne({ _id: listing.owner })
    .select("clerkId")
    .lean();
  const ownerClerkId = owner.clerkId;

  if (ownerClerkId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await Listing.deleteOne({ _id: id });
    await UserProfile.findByIdAndUpdate(listing.owner, {
      $pull: { listings: listing._id },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting listing" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request, context) {
  await mongooseConnect();
  const { id } = context.params;
  const { userId } = getAuth(request);

  const listing = await Listing.findById(id);

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  const owner = await UserProfile.findOne({ _id: listing.owner })
    .select("clerkId")
    .lean();
  const ownerClerkId = owner.clerkId;

  if (ownerClerkId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    title,
    description,
    price,
    availability,
    nearbyStations,
    bedrooms,
    bedroomsAvailable,
    bathrooms,
    area,
    amenities,
    images,
    tenants,
  } = await request.json();

  try {
    await Listing.updateOne(
      { _id: id },
      {
        title,
        description,
        price,
        availability,
        nearbyStations,
        bedrooms,
        bedroomsAvailable,
        bathrooms,
        area,
        amenities,
        images,
        tenants,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating listing" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
