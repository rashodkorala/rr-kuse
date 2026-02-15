import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@rr-kuse/ui";
import { createVideo } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

type VideoRow = {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  performerName: string | null;
  eventTitle: string | null;
  isFeatured: boolean | null;
  [key: string]: unknown;
};

type EventRow = { id: string; title: string; [key: string]: unknown };

export function CmsVideosSection({
  videos,
  events,
  performers,
}: {
  videos: VideoRow[];
  events: EventRow[];
  performers: Array<{ id: string; name: string }>;
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{videos.length}</p>
        <p className="text-sm text-muted-foreground">Total Videos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Video</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createVideo} className="space-y-3">
            <VenueTagSelect />
            <Input name="title" placeholder="Video title" required />
            <Input name="videoUrl" type="url" placeholder="Video URL" required />
            <FileField id="video-thumb-file" name="thumbnailFile" label="Thumbnail (upload)" />
            <Input name="thumbnailUrl" type="url" placeholder="or thumbnail URL" />
            <select
              name="performerId"
              defaultValue=""
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option value="">No performer link</option>
              {performers.map((performer) => (
                <option key={performer.id} value={performer.id}>
                  {performer.name}
                </option>
              ))}
            </select>
            <select
              name="eventId"
              defaultValue=""
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option value="">No event link</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
            <Input name="displayOrder" type="number" defaultValue={0} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isFeatured" />
              Featured video
            </label>
            <Button type="submit">Create Video</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
