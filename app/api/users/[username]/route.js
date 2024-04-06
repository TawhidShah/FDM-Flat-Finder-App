import { NextResponse } from "next/server";

import { mongooseConnect } from "@/lib/mongoose";

import { UserProfile } from "@/models/UserProfile";

export async function GET(request, context) {
  await mongooseConnect();

  const { username } = context.params;

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }
  const user = await UserProfile.findOne({ username })//.populate("listings");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(request, context) {
  await mongooseConnect();

  const { username } = context.params;

  if (!username.trim()) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  let body;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Error parsing request body" },
      { status: 400 },
    );
  }

  if (
    (body.country && body.country.trim() === "") ||
    (body.username && body.username.trim() === "")
  ) {
    return NextResponse.json(
      { error: "Empty username or country" },
      { status: 400 },
    );
  }

  const result = await UserProfile.updateOne({ username }, body);
  if (result.modifiedCount > 0) {
    return NextResponse.json({ message: "User updated" });
  } else if (result.matchedCount > 0) {
    return NextResponse.json({ error: "No changes made" }, { status: 400 });
  } else {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
