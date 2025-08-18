import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth";
import { sql as db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Get auth token from cookies
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const payload = verifyJWT(token) as { id: number; email?: string };
    const userId = payload.id;
    

    const { problemId, status } = await req.json();

    if (!["done", "pending", "not_attempted"].includes(status))
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });

    // Upsert user's problem progress
    await db`
      INSERT INTO user_problems (user_id, problem_id, status)
      VALUES (${userId}, ${problemId}, ${status})
      ON CONFLICT (user_id, problem_id) DO UPDATE
      SET status = ${status}
    `;

    return NextResponse.json({ message: "Status updated" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
