import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@rr-kuse/ui";
import { createVideo } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

export function CmsVideosSection({
  videos,
  events,
  performers,
}: {
  videos: Record<string, unknown>[];
  events: Record<string, unknown>[];
  performers: Record<string, unknown>[];
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
              {performers.map((p) => (
                <option key={String(p.id ?? "")} value={String(p.id ?? "")}>
                  {typeof p.name === "string" ? p.name : ""}
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
                <option key={String(event.id ?? "")} value={String(event.id ?? "")}>
                  {typeof event.title === "string" ? event.title : ""}
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
