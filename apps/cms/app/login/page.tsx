import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }

  const params = await searchParams;
  const error =
    typeof params.error === "string" ? params.error : undefined;
  const message =
    typeof params.message === "string" ? params.message : undefined;

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">RK</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Rob Roy & Konfusion CMS</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your venues
          </p>
        </div>

        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error === "auth_callback_failed"
              ? "Authentication failed. Please try again."
              : error === "verification_failed"
                ? "Email verification failed. Link may have expired."
                : error}
          </div>
        )}

        {message && (
          <div className="rounded-md border border-emerald-500/50 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {message}
          </div>
        )}

        <LoginForm />
      </div>
    </div>
  );
}
