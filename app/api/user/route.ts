import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) return NextResponse.json({ loggedIn: false });

    // Verify the JWT and type the payload
    const payload = verifyJWT(token) as { id: number; email: string };

    return NextResponse.json({
      loggedIn: true,
      userId: payload.id,
      email: payload.email,
    });
  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}
