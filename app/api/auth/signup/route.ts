import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "../../../../lib/db/mongodb";
import User from "../../../../lib/models/user";
import { handleError } from "../../../../lib/utils/error-handler";
import { ValidationError } from "../../../../lib/utils/http-errors";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email, username, password, name } = body;

    // Validate required fields
    if (!email || !username || !password || !name) {
      throw new ValidationError({
        email: !email ? ["Required"] : [],
        username: !username ? ["Required"] : [],
        password: !password ? ["Required"] : [],
        name: !name ? ["Required"] : [],
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ValidationError({
        email: existingUser.email === email ? ["Already exists"] : [],
        username: existingUser.username === username ? ["Already exists"] : [],
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      name,
      providers: [], // No OAuth providers for credentials users
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
