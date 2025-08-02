import mongoose, { Document, Schema } from "mongoose";

export interface IChatMessage extends Document {
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  userId: string;
}

const chatMessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage =
  mongoose.models.ChatMessage ||
  mongoose.model<IChatMessage>("ChatMessage", chatMessageSchema);

export default ChatMessage;
