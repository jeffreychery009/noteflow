import { NextRequest, NextResponse } from "next/server";

import connectToDatabase from "@/lib/db/mongodb";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import {
  RequestError,
  NotFoundError,
  ValidationError,
} from "@/lib/utils/http-errors";
import { userSchema } from "@/lib/validation";

// GET a single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    if (!id) {
      throw new NotFoundError("User ID");
    }

    const user = await User.findById(id).populate({
      path: "folders",
      select: "title itemCount createdAt updatedAt",
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return handleError(error);
  }
}

// Delete a user by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) {
    throw new Error("User ID was not found! Try again.");
  }

  try {
    await connectToDatabase();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, message: "User deleted successfully", data: user },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

// PUT Method to update a user by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User ID");

  try {
    await connectToDatabase();

    const body = await request.json();

    const validateData = userSchema.partial().parse(body);

    const upadatedUser = await User.findByIdAndUpdate(id, validateData, {
      new: true,
      runValidators: true,
    });
    if (!upadatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully",
        data: upadatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
