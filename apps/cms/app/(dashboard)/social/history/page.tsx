import { PostHistoryTable } from "@/components/social/history/PostHistoryTable";

export default function SocialHistoryPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto w-full">
      <p className="text-sm text-muted-foreground">
        Published post log with demo analytics. Click a row for detail.
      </p>
      <PostHistoryTable />
    </div>
  );
}
