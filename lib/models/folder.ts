import mongoose, { Document, Model, Schema } from "mongoose";

import { INote } from "./note";
import { IUser } from "./user";

export interface IFolder extends Document {
  title: string;
  itemCount: number;
  notes: INote[];
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
    notes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Note",
      default: [],
    },
  },
  {
    timestamps: true,
    strict: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        ret._id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Folder: Model<IFolder> =
  mongoose.models.Folder || mongoose.model<IFolder>("Folder", folderSchema);

export default Folder;
