import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<Mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    cached = global.mongoose = {
      conn: null,
      promise: mongoose
        .connect(MONGODB_URI, {
          bufferCommands: true,
          maxPoolSize: 10, // Maintain up to 10 socket connections
        })
        .then((mongoose) => mongoose as unknown as Mongoose),
    };
  }

  // Add connection event handlers
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  try {
    if (!cached) throw new Error("Connection not initialized");
    const conn = await cached.promise;
    cached.conn = conn;
    return conn as Mongoose;
  } catch (e) {
    if (cached) cached.promise = null;
    throw e;
  }
}

// Graceful shutdown handler
const gracefulShutdown = (msg: string, callback: () => void) => {
  mongoose.connection
    .close()
    .then(() => {
      console.log(`MongoDB disconnected through ${msg}`);
      callback();
    })
    .catch((err) => {
      console.error("Error shutting down MongoDB connection:", err);
    });
};

// If running in a Node environment (not client-side)
if (typeof process !== "undefined") {
  process.on("SIGINT", () => {
    gracefulShutdown("app termination", () => {
      process.exit(0);
    });
  });
}

export default connectToDatabase;
