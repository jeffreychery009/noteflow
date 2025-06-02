import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Validate query
    if (!query || query.length < 2) {
      throw new ValidationError({
        query: ["Search query must be at least 2 characters long"],
      });
    }

    await connectToDatabase();

    // Get current user to exclude from results
    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    // Search for users by username or name, excluding the current user
    const users = await User.find({
      $and: [
        { _id: { $ne: session.user.id } }, // Exclude current user
        {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("_id username name avatar")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await User.countDocuments({
      $and: [
        { _id: { $ne: session.user.id } },
        {
          $or: [
            { username: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
