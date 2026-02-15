import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea } from "@rr-kuse/ui";
import { createOperatingHour, createPost } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

export function CmsPostsHoursSection() {
  return (
    <section id="posts-hours" className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createPost} className="space-y-3">
            <VenueTagSelect />
            <Input name="title" placeholder="Post title" required />
            <Textarea name="content" placeholder="Post content" required />
            <Input name="excerpt" placeholder="Excerpt (optional)" />
            <FileField id="post-image-file" name="imageFile" label="Post Image (upload)" />
            <Input name="imageUrl" type="url" placeholder="or image URL" />
            <Input name="publishedAt" type="datetime-local" />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPublished" defaultChecked />
              Published
            </label>
            <Button type="submit">Create Post</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Set Operating Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createOperatingHour} className="space-y-3">
            <VenueTagSelect />
            <Input name="dayOfWeek" placeholder="Day of week" required />
            <Input name="openTime" placeholder="Open time" />
            <Input name="closeTime" placeholder="Close time" />
            <Input name="displayOrder" type="number" defaultValue={0} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isClosed" />
              Closed
            </label>
            <Button type="submit">Save Operating Hours</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
