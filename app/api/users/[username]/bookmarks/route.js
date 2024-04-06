import { getAuth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

import { mongooseConnect } from "@/lib/mongoose";

import { UserProfile } from "@/models/UserProfile";

export async function GET(request, context) {
  await mongooseConnect();

  const { username } = context.params;

  const { userId } = getAuth(request);

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const user = await UserProfile.findOne({ username }).select({
    bookmarks: 1,
    clerkId: 1,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.clerkId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ bookmarks: user.bookmarks }, { status: 200 });
}

export async function POST(request, context) {
  await mongooseConnect();

  const { username } = context.params;

  const { userId } = getAuth(request);

  if (!username) {
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
    q;
  }

  if (!body.listingId) {
    return NextResponse.json({ error: "Missing listingId" }, { status: 400 });
  }

  if (!body.action) {
    return NextResponse.json({ error: "Missing action" }, { status: 400 });
  }

  const user = await UserProfile.findOne({ username }).select({
    bookmarks: 1,
    clerkId: 1,
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.clerkId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const listingId = body.listingId;
  const isBookmarkExists = user.bookmarks.includes(listingId);

  if (body.action === "add") {
    if (!isBookmarkExists) {
      user.bookmarks.push(listingId);
    } else {
      return NextResponse.json(
        { message: "Bookmark already exists" },
        { status: 200 },
      );
    }
  } else if (body.action === "remove") {
    if (isBookmarkExists) {
      user.bookmarks = user.bookmarks.filter(
        (bookmark) => bookmark.toString() !== listingId,
      );
    } else {
      return NextResponse.json(
        { message: "Bookmark does not exist" },
        { status: 200 },
      );
    }
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  await user.save();

  return NextResponse.json({ message: "Bookmark updated" }, { status: 200 });
}
