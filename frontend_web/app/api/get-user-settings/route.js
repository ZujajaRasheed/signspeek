import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    // 1. Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // 2. Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user in DB
    const user = await User.findById(decoded.id).select(
      "name email gender mode language user_type"
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 4. Return user data
    return NextResponse.json({
      name: user.name,
      email: user.email,
      gender: user.gender,
      mode: user.mode,
      language: user.language,
      user_type: user.user_type,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}