import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  // remove cookie
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // delete immediately
    path: "/",
  });

  return res;
}