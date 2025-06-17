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

    await connectToDatabase();

    // Update user's presence status to offline
    const user = await User.findOneAndUpdate(
      { _id: session.user.id },
      {
        isOnline: false,
        lastSeen: new Date(),
      },
      { new: true }
    );

    if (!user) {
      throw new ValidationError({ user: ["User not found"] });
    }

    return NextResponse.json({
      success: true,
      message: "User marked as offline",
      user,
    });
  } catch (error) {
    return handleError(error);
  }
}
