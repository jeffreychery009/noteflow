import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import connectToDatabase from "@/lib/db/mongodb";
import Folder from "@/lib/models/folder";
import User from "@/lib/models/user";
import { handleError } from "@/lib/utils/error-handler";
import { ValidationError } from "@/lib/utils/http-errors";

const patchFolderSchema = z.object({
  title: z.string().min(1).optional(),
  // Add other fields that can be patched in the future
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    if (!id) throw new ValidationError({ folder: ["Not found"] });

    const session = await auth();
    if (!session?.user?.id)
      throw new ValidationError({ auth: ["Unauthorized"] });

    const folder = await Folder.findById(id);
    if (!folder) throw new ValidationError({ folder: ["Not found"] });

    if (folder.sharedWith && folder.sharedWith.length > 0) {
      await User.updateMany(
        { _id: { $in: folder.sharedWith } },
        { $pull: { folders: folder._id } }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { $pull: { folders: folder._id } },
      { new: true }
    );

    await Folder.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Folder deleted successfully",
      remainingFolders: updatedUser?.folders,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    const { id } = await params;
    if (!id) throw new ValidationError({ folder: ["Not found"] });

    const session = await auth();
    if (!session?.user?.id)
      throw new ValidationError({ auth: ["Unauthorized"] });

    const { title } = await request.json();
    const validated = patchFolderSchema.parse({ title });

    const updatedFolder = await Folder.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
        timestamps: true,
      }
    );

    console.log("Updated folder in DB:", updatedFolder);

    if (!updatedFolder) throw new ValidationError({ folder: ["Not found"] });

    return NextResponse.json({
      success: true,
      message: "Folder updated successfully",
      folder: updatedFolder,
    });
  } catch (error) {
    return handleError(error);
  }
}
