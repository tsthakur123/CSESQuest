import { NextRequest, NextResponse } from "next/server";
import { sql as db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  const hashed = await hashPassword(password);

  await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, hashed]
  );

  return NextResponse.json({ message: "User created" });
}
