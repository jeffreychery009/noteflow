// POST /api/friends/request
// This route is used to send a friend request to a user
// Default status is pending

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

    const senderId = session.user.id;
    const { receiverId } = await request.json();

    if (!receiverId) {
      throw new ValidationError({ receiverId: ["Receiver ID is required"] });
    }

    await connectToDatabase();

    // Prevent self-friending
    if (senderId === receiverId) {
      throw new ValidationError({
        receiver: ["You cannot send a friend request to yourself"],
      });
    }

    // Check if the receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      throw new ValidationError({ receiver: ["User not found"] });
    }

    // Check if they are already friends
    const areFriends = await User.findOne({
      _id: senderId,
      friends: receiverId,
    });

    if (areFriends) {
      throw new ValidationError({
        request: ["You are already friends with this user"],
      });
    }

    // Check for existing friend requests in either direction
    const existingRequest = await User.findOne({
      _id: receiverId,
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
      "friendRequests.from": receiverId,
    });

    if (reverseRequest) {
      throw new ValidationError({
        request: ["This user has already sent you a friend request"],
      });
    }

    // Create the friend request
    const updatedReceiver = await User.findByIdAndUpdate(
      receiverId,
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
      message: "Friend request sent successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
