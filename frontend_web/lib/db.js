import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.mongo_url);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.log("DB error:", err);
  }
}