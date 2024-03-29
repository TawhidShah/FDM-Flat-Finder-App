import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Listing } from "@/models/Listing";
import { UserProfile } from "@/models/UserProfile";

export async function GET() {
  await mongooseConnect();
  const listings = await Listing.find();
  return NextResponse.json(listings);
}

export async function POST(request) {
  await mongooseConnect();

  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Error parsing request body" },
      { status: 400 },
    );
  }

  // Validate required fields
  const requiredFields = [
    "title",
    "description",
    "price",
    "propertyType",
    "availability",
    "country",
    "city",
    "address",
    "bedrooms",
    "bathrooms",
    "owner",
  ];
  const missingFields = requiredFields.filter((field) => !body[field]);
  console.log(missingFields);
  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", missingFields },
      { status: 400 },
    );
  }

  // find user id
  const user = await UserProfile.findOne({ username: body.owner });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  body.owner = user._id;

  // Data transformation
  if (body.price) body.price = parseFloat(body.price).toFixed(2);
  if (body.bedrooms) body.bedrooms = parseInt(body.bedrooms);
  if (body.bedroomsAvailable)
    body.bedroomsAvailable = parseInt(body.bedroomsAvailable);
  if (body.bathrooms) body.bathrooms = parseInt(body.bathrooms);

  console.log(body);

  try {
    const newListing = new Listing(body);
    await newListing.save();
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error(error); // Ensure to log errors for debugging, consider a more sophisticated logging mechanism for production
    return NextResponse.json(
      { error: "Error creating listing" },
      { status: 500 },
    );
  }
}
