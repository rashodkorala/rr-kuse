import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
} from "@rr-kuse/ui";
import {
  Users,
  Calendar,
  Wine,
  Image,
  Video,
  Instagram,
  FileText,
  TrendingUpIcon,
} from "lucide-react";

type Counts = {
  performers: number;
  events: number;
  deals: number;
  gallery: number;
  videos: number;
  instagram: number;
  posts: number;
} | null;

const stats = [
  { key: "performers" as const, label: "Performers", icon: Users, footer: "Registered performers" },
  { key: "events" as const, label: "Events", icon: Calendar, footer: "Scheduled events" },
  { key: "deals" as const, label: "Deals", icon: Wine, footer: "Active promotions" },
  { key: "gallery" as const, label: "Gallery Images", icon: Image, footer: "Photos uploaded" },
  { key: "videos" as const, label: "Videos", icon: Video, footer: "Video content" },
  { key: "instagram" as const, label: "Instagram Posts", icon: Instagram, footer: "Synced from Instagram" },
  { key: "posts" as const, label: "Blog Posts", icon: FileText, footer: "Published articles" },
];

export function CmsOverviewSection({ counts }: { counts: Counts }) {
  if (!counts) {
    return (
      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">No data available.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
        {stats.map(({ key, label, icon: Icon, footer }) => (
          <Card key={key} className="@container/card">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums @[250px]/card:text-3xl">
                {counts[key]}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  <TrendingUpIcon className="size-3" />
                  <Icon className="size-3" />
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="text-muted-foreground">{footer}</div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
