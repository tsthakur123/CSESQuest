import { NextRequest, NextResponse } from "next/server";
import { queryData } from "@/lib/db";
import { comparePassword, generateJWT} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Fetch user from DB
    const users = await queryData<{ id: number; email: string; password: string }>`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = users[0];

    // Verify password
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Sign JWT
    const token = generateJWT({ id: user.id, email: user.email });

    // Set JWT in HttpOnly cookie (valid for 7 days)
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only use secure in prod
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return res;
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
