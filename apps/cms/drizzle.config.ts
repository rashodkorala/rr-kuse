import { defineConfig } from "drizzle-kit";

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("SUPABASE_DB_URL is required for Drizzle config.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "../../supabase/migrations",
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL,
  },
  strict: true,
  verbose: true,
});
