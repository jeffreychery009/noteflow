import { NextResponse } from "next/server";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
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

    const notes = await Note.find({ userId: user._id });
    if (!notes) throw new NotFoundError("Notes");

    return NextResponse.json(notes);
  } catch (error) {
    return handleError(error);
  }
}
