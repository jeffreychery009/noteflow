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
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();
    await connectToDatabase();

    await User.findOneAndUpdate(
      { email: session.user.email },
      { isOnline: status },
      { new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Presence update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
