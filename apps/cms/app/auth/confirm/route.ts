import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Handles email-based auth confirmations (token_hash + type).
 * Used for:
 * - Invite confirmations
 * - Password recovery
 * - Email change
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });

    if (!error) {
      // For invite or recovery, redirect to set password
      if (type === "invite" || type === "recovery") {
        redirectTo.pathname = "/auth/set-password";
        return NextResponse.redirect(redirectTo);
      }
      return NextResponse.redirect(redirectTo);
    }
  }

  // Verification failed
  redirectTo.pathname = "/login";
  redirectTo.searchParams.set("error", "verification_failed");
  return NextResponse.redirect(redirectTo);
}
