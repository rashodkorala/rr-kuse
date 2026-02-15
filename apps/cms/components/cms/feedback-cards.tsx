import { Card, CardDescription, CardHeader, CardTitle } from "@rr-kuse/ui";

export function CmsFeedbackCards({
  configError,
  dataError,
  success,
  error,
}: {
  configError?: string;
  dataError?: string;
  success?: string;
  error?: string;
}) {
  return (
    <>
      {configError ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Supabase Setup Required</CardTitle>
            <CardDescription>{configError}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {dataError ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Data Access Warning</CardTitle>
            <CardDescription>{dataError}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {success ? (
        <Card className="border-emerald-500/40">
          <CardHeader>
            <CardTitle>Saved</CardTitle>
            <CardDescription>{success}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {error ? (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Action Failed</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}
    </>
  );
}
