import { CmsFeedbackCards } from "./feedback-cards";

export function PageShell({
  title,
  success,
  error,
  configError,
  dataError,
  children,
}: {
  title: string;
  success?: string;
  error?: string;
  configError?: string;
  dataError?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
      </div>
      <div className="p-6 space-y-8">
        <CmsFeedbackCards
          configError={configError}
          dataError={dataError}
          success={success}
          error={error}
        />
        {children}
      </div>
    </div>
  );
}
