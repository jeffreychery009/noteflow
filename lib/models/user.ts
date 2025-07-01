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
  folders: mongoose.Types.ObjectId[];
  notes: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    theme: string;
    syncMode: "online" | "offline" | "hybrid";
  };
  isOnline: boolean;
  lastSeen: Date;
  friends: mongoose.Types.ObjectId[];
  friendRequests: Array<{
    from: mongoose.Types.ObjectId;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
    updatedAt: Date;
  }>;
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
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
          index: true,
        },
        _id: false,
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
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add compound index to prevent duplicate friend requests
userSchema.index({ "friendRequests.from": 1, _id: 1 }, { unique: true });

// Compound index for presence status
userSchema.index({ lastSeen: -1, isOnline: 1 });

// Add compound index to prevent duplicate friends
userSchema.index({ friends: 1, _id: 1 }, { unique: true });

// Create the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
