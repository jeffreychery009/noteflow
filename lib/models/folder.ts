import mongoose, { Document, Model, Schema } from "mongoose";

import { IUser } from "./user";

export interface IFolder extends Document {
  title: string;
  itemCount: number;
  sharedWith: IUser[];
  createdAt: Date;
  updatedAt: Date;
}

export const folderSchema: Schema<IFolder> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    itemCount: {
      type: Number,
      default: 0,
    },
    sharedWith: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
      default: [],
    },
  },
  { timestamps: true, strict: true }
);

const Folder: Model<IFolder> =
  mongoose.models.Folder || mongoose.model<IFolder>("Folder", folderSchema);

export default Folder;
