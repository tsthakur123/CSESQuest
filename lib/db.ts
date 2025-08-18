"use server";
import { neon } from "@neondatabase/serverless";

// Initialize Neon client
export const sql = neon(process.env.DATABASE_URL!);

// Generic query function with safer typing
export async function queryData<T extends Record<string, unknown> = Record<string, unknown>>(
  query: TemplateStringsArray,
  ...params: unknown[]
): Promise<T[]> {
  const result = await sql(query, ...params);
  return result as T[];
}
