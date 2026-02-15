import { Gauge } from "lucide-react";

export function CmsHeaderBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Gauge className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
    </div>
  );
}
