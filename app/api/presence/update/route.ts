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

    // Get status from request body, handle empty bodies gracefully
    let status = false;
    try {
      const body = await request.json();
      status = !!body.status; // Convert to boolean
    } catch (e) {
      console.log("No request body or invalid JSON, defaulting to offline");
      status = false;
    }

    console.log("Updating presence status:", {
      userId: session.user.id,
      status,
    });

    await connectToDatabase();

    // Update user's presence status
    const user = await User.findOneAndUpdate(
      { _id: session?.user?.id },
      {
        $set: {
          isOnline: status,
          lastSeen: new Date(),
        },
      },
      { new: true }
    );

    // If user is not found, throw a custom NotFoundError
    if (!user) {
      throw new NotFoundError("User");
    }

    console.log("Updated user status:", {
      userId: user._id,
      isOnline: user.isOnline,
    });

    // Return the updated user
    return NextResponse.json({
      success: true,
      message: "Presence status updated",
      user,
    });
  } catch (error) {
    console.error("Presence update error:", error);
    return handleError(error);
  }
}
