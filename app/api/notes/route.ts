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

    // Handle the case where folderId is not provided (only create General folder if no folderId at all)
    let targetFolderId = folderId;
    if (!targetFolderId) {
      // Try to find an existing default folder for this user
      let defaultFolder = await Folder.findOne({
        title: "General",
        _id: { $in: user.folders },
      });

      if (!defaultFolder) {
        // Create a default folder if none exists
        defaultFolder = await Folder.create({ title: "General" });

        // Add the default folder to user's folders array
        await User.findByIdAndUpdate(
          user._id,
          {
            $push: { folders: defaultFolder._id },
          },
          { new: true }
        );
      }

      targetFolderId = defaultFolder._id;
    }

    const note = await Note.create({
      owner: user._id,
      folder: targetFolderId,
      title: title || "Untitled Note",
      content: content || "<p>Hello World!</p>",
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Folder.findByIdAndUpdate(
      targetFolderId,
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
