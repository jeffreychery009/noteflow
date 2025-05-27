import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
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
