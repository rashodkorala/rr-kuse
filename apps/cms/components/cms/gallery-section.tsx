import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@rr-kuse/ui";
import { createGalleryImage } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

export function CmsGallerySection({
  galleryImages,
  events,
}: {
  galleryImages: Record<string, unknown>[];
  events: Record<string, unknown>[];
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
                <option key={String(event.id ?? "")} value={String(event.id ?? "")}>
                  {typeof event.title === "string" ? event.title : ""}
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
          {galleryImages.map((img) => {
            const id = String(img.id ?? "");
            const imageUrl = typeof img.imageUrl === "string" ? img.imageUrl : "";
            const caption = typeof img.caption === "string" ? img.caption : "Gallery image";
            return (
              <div key={id} className="group relative overflow-hidden rounded-lg border border-border bg-card">
                {imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt={caption}
                    className="aspect-square w-full object-cover"
                  />
                )}
                <div className="p-2">
                  <p className="text-xs text-muted-foreground truncate">{caption || "No caption"}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
