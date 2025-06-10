// app/api/presence/online/route.ts
// Retrieve all online users

import { NextResponse, NextRequest } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const session = await auth();

    if (!session) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    // Consider user online if they have been online in the last 5 minutes
    const onlineThreshold = Date.now() - 5 * 60 * 1000;
    const easternTime = new Date(onlineThreshold).toLocaleString("en-US", {
      timeZone: "America/New_York",
    });

    // Used for debugging and verifying the query results
    console.log("=== PRESENCE DEBUG ===");
    console.log("Current user:", session?.user?.name);
    console.log("Online threshold:", easternTime);

    const CACHE_DURATION = 30 * 1000; // 30 seconds
    let cachedUsers = null;
    let lastCacheTime = 0;

    // Check if cache is valid
    if (cachedUsers && Date.now() - lastCacheTime < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        users: cachedUsers,
        fromCache: true,
      });
    }

    // Get pagination parameters from the request
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1"); // Get the page number from the request
    const limit = parseInt(searchParams.get("limit") || "20"); // Default limit of 20 users
    const skip = (page - 1) * limit; // Calculate the number of users to skip

    const users = await User.find({
      _id: { $ne: session.user.id },
      isOnline: true,
      lastSeen: { $gte: onlineThreshold },
    })
      .select("name username avatar lastSeen isOnline")
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({
      isOnline: true,
      lastSeen: { $gte: onlineThreshold },
    });

    cachedUsers = users;
    lastCacheTime = Date.now();

    // Used for debugging and verifying the query results
    console.log("Query results:");
    console.log("- Online users found:", users.length);
    console.log("- Total online users:", total);
    console.log(
      "- User details:",
      users.map((u) => ({
        name: u.name,
        lastSeen: new Date(u.lastSeen).toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
        isOnline: u.isOnline,
      }))
    );
    console.log("====================");

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
