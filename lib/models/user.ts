import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  name: string;
  avatar?: string;
  providers: Array<{
    provider: string;
    providerAccountId: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    theme: string;
    syncMode: "online" | "offline" | "hybrid";
  };
}

// Create the schema
const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    providers: [
      {
        provider: {
          type: String,
          required: true,
        },
        providerAccountId: {
          type: String,
          required: true,
        },
      },
    ],
    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      syncMode: {
        type: String,
        enum: ["online", "offline", "hybrid"],
        default: "online",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
