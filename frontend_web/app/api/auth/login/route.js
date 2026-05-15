import { connectDB } from "../../../../lib/db";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      user,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
   return NextResponse.json(
      { message: err.message, stack: err.stack }, // This will tell you EXACTLY what failed
      { status: 500 }
    );
  }
}