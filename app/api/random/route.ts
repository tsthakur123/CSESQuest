import { NextRequest, NextResponse } from "next/server";
import { sql as db } from "@/lib/db";
import { verifyJWT } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get auth token from cookies
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = verifyJWT(token) as { id: number };
    const userId = payload.id;

    // Fetch a random problem not marked as 'done' by this user
    const res = await db`
      SELECT p.cses_id, p.title, p.link
      FROM problems p
      LEFT JOIN user_problems up
        ON up.problem_id = p.cses_id AND up.user_id = ${userId} AND up.status = 'done'
      WHERE up.status IS NULL
      ORDER BY RANDOM()
      LIMIT 1
    `;

    if (!res[0]) return NextResponse.json({ error: "No remaining problems" }, { status: 404 });

    return NextResponse.json(res[0]);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
