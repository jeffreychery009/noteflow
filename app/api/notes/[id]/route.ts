import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import Folder from "@/lib/models/folder";
import Note from "@/lib/models/note";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const noteId = params.id;
    if (!noteId) throw new ValidationError({ note: ["Not found"] });

    const note = await Note.findOne({
      _id: noteId,
      owner: session.user.id,
    });

    if (!note) throw new ValidationError({ note: ["Not found"] });

    return NextResponse.json({
      success: true,
      data: note,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const noteId = params.id;
    if (!noteId) throw new ValidationError({ note: ["Not found"] });

    const { title, content } = await request.json();

    const note = await Note.findOneAndUpdate(
      {
        _id: noteId,
        owner: session.user.id,
      },
      {
        $set: {
          title,
          content,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!note) throw new ValidationError({ note: ["Not found"] });

    return NextResponse.json({
      success: true,
      data: note,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session?.user?.id) {
      throw new ValidationError({ auth: ["Unauthorized"] });
    }

    const noteId = params.id;
    if (!noteId) throw new ValidationError({ note: ["Not found"] });

    // First find the note to get its folder ID
    const note = await Note.findOne({
      _id: noteId,
      owner: session.user.id,
    });

    if (!note) throw new ValidationError({ note: ["Not found"] });

    const folderId = note.folder;

    // Delete the note
    await Note.findByIdAndDelete(noteId);

    // Update the folder's itemCount and notes array
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      {
        $pull: { notes: noteId },
        $inc: { itemCount: -1 },
      },
      { new: true }
    );

    if (!updatedFolder) {
      console.error("Failed to update folder after note deletion");
    }

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
      folder: updatedFolder, // Return the updated folder for verification
    });
  } catch (error) {
    console.error("Error in note deletion:", error);
    return handleError(error);
  }
}
