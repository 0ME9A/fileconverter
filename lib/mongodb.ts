import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.DB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI/DB_URI environment variable inside .env.local",
  );
}

// Fix for ECONNREFUSED on some networks (e.g., Windows/WSL)
import dns from "dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  console.log("Custom DNS servers set for MongoDB connection");
} catch (e) {
  console.warn("Failed to set custom DNS servers for MongoDB:", e);
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "fileconverter",
    };

    console.log("Attempting to connect to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("MongoDB connection error details:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
