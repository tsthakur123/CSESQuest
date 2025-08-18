import { NextRequest, NextResponse } from "next/server";
import { sql as db } from "@/lib/db";
import { verifyJWT } from "@/lib/auth";

type ProblemWithStatus = {
  cses_id: number;
  title: string;
  link: string;
  status: "done" | "pending" | "not_attempted";
};

export async function GET(req: NextRequest) {
  try {
    // Get auth token from cookies
    const token = req.cookies.get("auth_token")?.value;
    let userId: number | null = null;

    if (token) {
      try {
        const payload = verifyJWT(token) as { id: number };
        userId = payload.id;
      } catch {
        userId = null;
      }
    }

    // Fetch all problems
    const problems = await db`SELECT cses_id, title, link FROM problems ORDER BY cses_id`;

    let formatted: ProblemWithStatus[];

    if (userId) {
      // Fetch user's problem status
      const userProgress = await db`
        SELECT problem_id, status 
        FROM user_problems 
        WHERE user_id = ${userId}
      `;
      const progressMap: Record<number, "done" | "pending" | "not_attempted"> = {};
      userProgress.forEach((p) => {
        progressMap[p.problem_id] = p.status as "done" | "pending";
      });

      formatted = problems.map((p) => ({
        cses_id: p.cses_id,
        title: p.title,
        link: p.link,
        status: progressMap[p.cses_id] || "not_attempted",
      }));
    } else {
      // Not logged in, all default to not_attempted
      formatted = problems.map((p) => ({
        cses_id: p.cses_id,
        title: p.title,
        link: p.link,
        status: "not_attempted",
      }));
    }

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch problems" }, { status: 500 });
  }
}
