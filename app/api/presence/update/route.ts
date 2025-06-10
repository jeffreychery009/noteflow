// app/api/presence/update/route.ts
// Update current user's presence status

import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { NotFoundError, ValidationError } from "@/lib/utils/http-errors";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    await connectToDatabase();

    // Update user's presence status
    const user = await User.findOneAndUpdate(
      { _id: session?.user?.id },
      {
        isOnline: true,
        lastSeen: Date.now(),
      },
      { new: true }
    );

    // If user is not found, throw a custom NotFoundError
    if (!user) {
      throw new NotFoundError("User");
    }

    // Return the updated user
    return NextResponse.json({
      success: true,
      message: "Presence status updated",
      user,
    });
  } catch (error) {
    return handleError(error);
  }
}
