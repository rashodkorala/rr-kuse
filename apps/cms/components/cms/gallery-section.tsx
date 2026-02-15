import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@rr-kuse/ui";
import { createGalleryImage } from "@/app/actions";
import type { galleryImages } from "@/lib/db/schema";
import { FileField, VenueTagSelect } from "./shared-fields";

type GalleryRow = typeof galleryImages.$inferSelect;
type EventRow = { id: string; title: string; [key: string]: unknown };

export function CmsGallerySection({
  galleryImages,
  events,
}: {
  galleryImages: GalleryRow[];
  events: EventRow[];
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{galleryImages.length}</p>
        <p className="text-sm text-muted-foreground">Total Gallery Images</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Gallery Image</CardTitle>
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
              {events.map((event) => (
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

      {galleryImages.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((img) => (
            <div key={img.id} className="group relative overflow-hidden rounded-lg border border-border bg-card">
              {img.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.imageUrl}
                  alt={img.caption ?? "Gallery image"}
                  className="aspect-square w-full object-cover"
                />
              )}
              <div className="p-2">
                <p className="text-xs text-muted-foreground truncate">{img.caption ?? "No caption"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
