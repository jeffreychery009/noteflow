import { NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import Folder from "@/lib/models/folder";
import Note from "@/lib/models/note";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { NotFoundError } from "@/lib/utils/http-errors";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new NotFoundError("User");

    const notes = await Note.find({ owner: user._id });
    if (!notes) throw new NotFoundError("Notes");

    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new NotFoundError("User");

    const { title, content, tags, folderId } = await req.json();

    if (!folderId) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    const note = await Note.create({
      owner: user._id,
      folder: folderId,
      title: title || "Untitled Note",
      content: content || "<p>Hello World!</p>",
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Folder.findByIdAndUpdate(
      folderId,
      {
        $inc: { itemCount: 1 },
        $push: { notes: note._id },
      },
      { new: true }
    );

    // Add note to user's notes array
    await User.findByIdAndUpdate(
      user._id,
      {
        $push: { notes: note._id },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    console.error("Server error:", error);
    return handleError(error);
  }
}
