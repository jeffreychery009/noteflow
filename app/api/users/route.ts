import { NextResponse, NextRequest } from "next/server";

import connectToDatabase from "@/lib/db/mongodb";
import Folder from "@/lib/models/folder";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import {
  NotFoundError,
  ValidationError,
  ConflictError,
  RequestError,
} from "@/lib/utils/http-errors";
import { userSchema } from "@/lib/validation";

// Get all users
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await connectToDatabase();

    // Get all users
    const users = await User.find();

    // If no users are found, throw an error
    if (!users) {
      throw new NotFoundError("Users");
    }

    // Return the users
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// Create a new user
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectToDatabase();

    // Get the request body
    const body = await request.json();

    // Validate the request data
    const validateData = userSchema.safeParse(body);

    // If the request data is invalid, return a 400 error
    if (!validateData.success) {
      throw new ValidationError(validateData.error.flatten().fieldErrors);
    }

    // Get the email and username from the request data
    const { email, username } = validateData.data;

    // Check if the user already exists
    const exisitingUser = await User.findOne({ email });
    if (exisitingUser) throw new ConflictError("User with this email");

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new ConflictError("Username");

    // Create the user
    const user = await User.create(validateData.data);

    // Return the user
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
