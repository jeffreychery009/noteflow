import mongoose, { Schema } from "mongoose";

export interface INote extends mongoose.Document {
  owner: mongoose.Types.ObjectId;
  folder: mongoose.Types.ObjectId;
  title?: string;
  content?: string;
  tags?: string[];
  sharedWith: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    sharedWith: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Note: mongoose.Model<INote> =
  mongoose.models.Note || mongoose.model<INote>("Note", noteSchema);

export default Note;
