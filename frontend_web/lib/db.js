import mongoose from "mongoose";

// We create a cache to prevent multiple connections in development
let isConnected = false; 

export async function connectDB() {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    // 1. Ensure the variable name is EXACTLY as it appears in Vercel (mongo_url)
    const db = await mongoose.connect(process.env.mongo_url);
    
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("DB connection error:", err);
    // 2. CRITICAL: You must throw the error so the Login API knows it failed
    throw new Error("Database connection failed");
  }
}