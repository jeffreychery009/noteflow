// ===== FRIEND REQUEST API =====
// POST /api/friends/request
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import User, { IUser } from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const senderId = session.user.id;
    const { receiverUsername } = await request.json();

    if (!receiverUsername) {
      throw new ValidationError({ receiverUsername: ["Username is required"] });
    }

    await connectToDatabase();

    // Find the receiver by username
    const receiver = await User.findOne({ username: receiverUsername }).lean();
    if (!receiver) {
      throw new ValidationError({ receiver: ["User not found"] });
    }

    const receiverId = receiver._id.toString();
    const receiverObjectId = new Types.ObjectId(receiverId);

    // Prevent self-friending
    if (senderId === receiverId) {
      throw new ValidationError({
        receiver: ["You cannot send a friend request to yourself"],
      });
    }

    // Check if they are already friends
    const areFriends = await User.findOne({
      _id: senderId,
      friends: receiverObjectId,
    });

    if (areFriends) {
      throw new ValidationError({
        request: ["You are already friends with this user"],
      });
    }

    // Check for existing friend requests in either direction
    const existingRequest = await User.findOne({
      _id: receiverObjectId,
      "friendRequests.from": senderId,
    });

    if (existingRequest) {
      throw new ValidationError({
        request: ["A friend request already exists"],
      });
    }

    // Check if receiver has already sent a request
    const reverseRequest = await User.findOne({
      _id: senderId,
      "friendRequests.from": receiverObjectId,
    });

    if (reverseRequest) {
      throw new ValidationError({
        request: ["This user has already sent you a friend request"],
      });
    }

    // Create the friend request
    const updatedReceiver = await User.findByIdAndUpdate(
      receiverObjectId,
      {
        $push: {
          friendRequests: {
            from: senderId,
            status: "pending",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!updatedReceiver) {
      throw new ValidationError({
        request: ["Failed to send friend request"],
      });
    }

    return NextResponse.json({
      success: true,
      message: `Friend request sent to ${receiverUsername}`,
    });
  } catch (error) {
    return handleError(error);
  }
}
