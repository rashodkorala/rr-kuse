import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function toSnake(str: string): string {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

function mapKeys<T extends Record<string, unknown>>(
  obj: T,
  keyFn: (k: string) => string,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== null && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date)) {
      out[keyFn(k)] = mapKeys(v as Record<string, unknown>, keyFn);
    } else {
      out[keyFn(k)] = v;
    }
  }
  return out;
}

export function rowToCamel<T extends Record<string, unknown>>(row: T): Record<string, unknown> {
  return mapKeys(row, toCamel) as Record<string, unknown>;
}

export function rowsToCamel<T extends Record<string, unknown>>(rows: T[]): Record<string, unknown>[] {
  return rows.map((r) => rowToCamel(r));
}

export function objToSnake<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  return mapKeys(obj, toSnake) as Record<string, unknown>;
}

const CONFIG_ERROR = "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to apps/cms/.env.local.";

export function getSupabaseConfigError(): string | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return CONFIG_ERROR;
  }
  return null;
}

/** Returns Supabase server client for data access (uses publishable URL + anon key). */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (getSupabaseConfigError()) return null;
  return createClient();
}
