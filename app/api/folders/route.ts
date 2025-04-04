import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import Folder from "@/lib/models/folder";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { title } = body;

    if (!title) throw new ValidationError({ title: ["Required"] });

    const folder = await Folder.create({ title });
    const session = await auth();

    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $push: { folders: folder._id } },
      { new: true }
    ).populate({
      path: "folders",
      select: "title itemCount createdAt updatedAt",
    });

    return NextResponse.json(
      {
        success: true,
        data: { folder, user },
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const user = await User.findById(session.user.id).populate({
      path: "folders",
      select: "title itemCount createdAt updatedAt",
    });

    return NextResponse.json({
      success: true,
      data: user?.folders || [],
    });
  } catch (error) {
    return handleError(error);
  }
}
