import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    await connectDB();

    // 🔐 Get token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔐 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Find user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 📦 Get request body
    const body = await req.json();

    const {
      name,
      email,
      mode,
      language,
      current_password,
      new_password,
      user_type,
    } = body;

    // ✏️ Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (mode) user.mode = mode;
    if (language) user.language = language;
    if (user_type) user.userType = user_type;

    // 🔐 PASSWORD CHANGE LOGIC
    if (new_password) {
      if (!current_password) {
        return NextResponse.json(
          { message: "Current password required" },
          { status: 400 }
        );
      }

      // check old password
      const isMatch = await bcrypt.compare(
        current_password,
        user.password
      );

      if (!isMatch) {
        return NextResponse.json(
          { message: "Current password is wrong" },
          { status: 400 }
        );
      }

      // hash new password
      user.password = await bcrypt.hash(new_password, 10);
    }

    // 💾 Save user
    await user.save();

    return NextResponse.json({
      message: "Settings updated successfully",
      user: {
        name: user.name,
        email: user.email,
        mode: user.mode,
        language: user.language,
         userType: user.userType,
      },
    });

  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}