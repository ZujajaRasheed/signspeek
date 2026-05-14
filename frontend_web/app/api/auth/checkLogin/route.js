import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({ loggedIn: true });

  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}