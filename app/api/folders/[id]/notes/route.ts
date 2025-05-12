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

    const folderId = params.id;
    if (!folderId) throw new ValidationError({ folder: ["Not found"] });

    const folder = await Folder.findById(folderId);
    if (!folder) throw new ValidationError({ folder: ["Not found"] });

    // Find notes that belong to both the folder and the authenticated user
    const notes = await Note.find({
      _id: { $in: folder.notes },
      owner: session.user.id,
    });

    return NextResponse.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    return handleError(error);
  }
}
