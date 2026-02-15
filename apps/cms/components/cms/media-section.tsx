import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@rr-kuse/ui";
import { createGalleryImage, createVideo } from "@/app/actions";
import type { DashboardData } from "@/lib/dashboard";
import { FileField, VenueTagSelect } from "./shared-fields";

export function CmsMediaSection({
  dashboard,
  performersForVenue,
}: {
  dashboard: DashboardData;
  performersForVenue: Array<{ id: string; name: string }>;
}) {
  return (
    <section id="media" className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Gallery Image</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createGalleryImage} className="space-y-3">
            <VenueTagSelect />
            <FileField id="gallery-image-file" name="imageFile" label="Gallery Image (upload)" />
            <Input name="imageUrl" type="url" placeholder="or image URL" />
            <Input name="caption" placeholder="Caption (optional)" />
            <select
              name="eventId"
              defaultValue=""
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            >
              <option value="">No event link</option>
              {dashboard.events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
            <Input name="category" placeholder="Category (venue, event, crowd...)" />
            <Input name="displayOrder" type="number" defaultValue={0} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isFeatured" />
              Featured image
            </label>
            <Button type="submit">Create Gallery Image</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create Video</CardTitle>
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
              {performersForVenue.map((performer) => (
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
              {dashboard.events.map((event) => (
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
