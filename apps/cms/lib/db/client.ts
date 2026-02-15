import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const dbUrl = process.env.DATABASE_URL;

export function getDb() {
  if (!dbUrl) return null;
  const client = postgres(dbUrl, { prepare: false });
  return drizzle(client);
}
