// app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import { sql as db } from "@/lib/db";

export async function GET() {
  try {
    // Fetch top 10 users by solved problems
    const leaderboard = (await db`
  SELECT u.id, u.email, COUNT(up.problem_id) AS solved_count
  FROM users u
  LEFT JOIN user_problems up
    ON u.id = up.user_id AND up.status = 'done'
  GROUP BY u.id, u.email
  ORDER BY solved_count DESC
  LIMIT 10
`) as { id: number; email: string; solved_count: number }[];

    return NextResponse.json(leaderboard);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
