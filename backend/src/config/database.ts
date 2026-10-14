import mongoose from "mongoose";
import { setMockMode } from "./db-adapter";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/medicare";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  // Check if we should use mock mode (no MongoDB available)
  const useMock = process.env.USE_MOCK_DB === "true";
  
  if (useMock) {
    setMockMode(true);
    console.log("✅ Running in mock database mode");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error: any) {
    console.warn("⚠️  MongoDB connection failed:", error.message);
    console.warn("⚠️  Falling back to mock database mode");
    setMockMode(true);
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  readyState: mongoose.connection.readyState,
});

export const disconnectDB = async () => {
  await mongoose.disconnect();
  isConnected = false;
};