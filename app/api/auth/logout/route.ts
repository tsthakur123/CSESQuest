import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });

  // Clear the auth cookie
  res.cookies.set({
    name: "auth_token",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return res;
}
