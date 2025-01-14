import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectToDatabase() {
  try {
    // Check if already connected
    if (connection.isConnected) {
      return;
    }

    // Attempt to connect to MongoDB
    const db = await mongoose.connect(process.env.MONGO_URI!, {
      serverSelectionTimeoutMS: 15000, // 15 seconds timeout
    });

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
    }
  } catch {
    throw new Error("Failed to connect to the database");
  }
}

export default connectToDatabase;
