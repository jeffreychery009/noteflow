import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/http-errors";
import { userSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email } = await request.json();

    const validatedData = userSchema.partial().safeParse({ email });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const user = await User.findOne({ email });

    if (!user) throw new NotFoundError("User");

    return NextResponse.json({
      success: true,
      data: user,
      message: "Email fetched successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
