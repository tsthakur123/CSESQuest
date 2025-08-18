import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import { sql as db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = verifyJWT(token) as { id: number; email?: string };
    const userId = payload.id;

    // Total problems
    const totalRes = await db`SELECT COUNT(*) AS total FROM problems`;
    const total = Number(totalRes[0]?.total || 0);

    // Solved problems
    const solvedRes = await db`
      SELECT COUNT(*) AS solved
      FROM user_problems
      WHERE user_id = ${userId} AND status = 'done'
    `;
    const solved = Number(solvedRes[0]?.solved || 0);

    return NextResponse.json({ total, solved });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
