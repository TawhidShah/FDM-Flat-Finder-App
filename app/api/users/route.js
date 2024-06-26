import { clerkClient } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import { mongooseConnect } from "@/lib/mongoose";

import { UserProfile } from "@/models/UserProfile";

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

  const requiredFields = ["username", "clerkId", "country"];

  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", missingFields },
      { status: 400 },
    );
  }

  try {
    const newUser = new UserProfile(body);
    await newUser.save();

    await clerkClient.users.updateUserMetadata(newUser.clerkId, {
      publicMetadata: {
        profileCreated: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
