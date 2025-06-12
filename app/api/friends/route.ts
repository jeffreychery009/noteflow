import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    await connectToDatabase();

    console.log("Debug - User ID:", session.user.id);

    // Convert string ID to ObjectId
    const userObjectId = new Types.ObjectId(session.user.id);

    // Get the current user with populated friends and friend requests
    const user = await User.findById(userObjectId)
      .populate("friends", "name username email avatar isOnline lastSeen")
      .populate(
        "friendRequests.from",
        "name username email avatar isOnline lastSeen"
      )
      .lean();

    if (!user) {
      throw new ValidationError({ user: ["User not found"] });
    }

    console.log("Debug - User found:", {
      id: user._id,
      friendsCount: user.friends?.length || 0,
      requestsCount: user.friendRequests?.length || 0,
      friends: user.friends,
    });

    // Ensure arrays exist and are properly initialized
    const friends = user.friends || [];
    const friendRequests = user.friendRequests || [];

    // Separate friend requests into pending and sent
    const pendingRequests = friendRequests.filter(
      (request) => request.status === "pending"
    );

    // Get sent requests (where current user is the sender)
    const sentRequests = await User.find({
      "friendRequests.from": userObjectId,
      "friendRequests.status": "pending",
    })
      .select("friendRequests.$")
      .populate(
        "friendRequests.from",
        "name username email avatar isOnline lastSeen"
      )
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        friends,
        pendingRequests,
        sentRequests: sentRequests.map((user) => user.friendRequests[0]) || [],
      },
    });
  } catch (error: any) {
    console.error("Friends route error:", {
      name: error?.name || "Unknown error",
      message: error?.message || "No error message",
      stack: error?.stack || "No stack trace",
    });
    return handleError(error);
  }
}
