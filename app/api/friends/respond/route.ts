import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const { senderUsername, status } = await request.json();

    await connectToDatabase();

    // Validate inputs
    if (!senderUsername) {
      throw new ValidationError({ senderUsername: ["Username is required"] });
    }

    if (!status || !["accepted", "rejected"].includes(status)) {
      throw new ValidationError({
        status: ["Status must be either 'accepted' or 'rejected'"],
      });
    }

    const currentUserId = session.user.id;

    // Find the sender by username
    const sender = await User.findOne({ username: senderUsername });
    if (!sender) {
      throw new ValidationError({ sender: ["User not found"] });
    }

    const senderId = sender._id;

    // Find the current user with the specific pending friend request
    const currentUser = await User.findOne({
      _id: currentUserId,
      friendRequests: {
        $elemMatch: {
          from: senderId,
          status: "pending",
        },
      },
    });

    if (!currentUser) {
      throw new ValidationError({
        request: ["Friend request not found or already processed"],
      });
    }

    if (status === "accepted") {
      // Accept the friend request: update status and add to friends lists
      await Promise.all([
        // Update current user: change request status and add friend
        User.findOneAndUpdate(
          {
            _id: currentUserId,
            "friendRequests.from": senderId,
          },
          {
            $set: {
              "friendRequests.$.status": "accepted",
              "friendRequests.$.updatedAt": new Date(),
            },
            $addToSet: { friends: senderId },
          }
        ),
        // Add current user to sender's friends list
        User.findByIdAndUpdate(senderId, {
          $addToSet: { friends: currentUserId },
        }),
      ]);
    } else {
      // Reject the friend request: just update status
      await User.findOneAndUpdate(
        {
          _id: currentUserId,
          "friendRequests.from": senderId,
        },
        {
          $set: {
            "friendRequests.$.status": "rejected",
            "friendRequests.$.updatedAt": new Date(),
          },
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Friend request from ${senderUsername} ${status}`,
      data: {
        status: status,
        updatedAt: new Date(),
        from: senderUsername,
      },
    });
  } catch (error) {
    console.error("Error in friend request response:", error);
    return handleError(error);
  }
}
