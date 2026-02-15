import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "@rr-kuse/ui";
import { FileText } from "lucide-react";
import { createPost } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

const VENUE_TAG_LABELS: Record<string, string> = {
  rob_roy: "Rob Roy",
  konfusion: "Konfusion",
  both: "Both Venues",
};

export function CmsPostsSection({
  posts,
}: {
  posts: Record<string, unknown>[];
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{posts.length}</p>
        <p className="text-sm text-muted-foreground">Total Posts</p>
      </div>

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

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => {
              const id = String(post.id ?? "");
              const title = typeof post.title === "string" ? post.title : "";
              const venueTag = typeof post.venueTag === "string" ? post.venueTag : "";
              const isPublished = post.isPublished === true;
              const publishedAt = post.publishedAt != null ? new Date(post.publishedAt as string | Date) : null;
              return (
                <TableRow key={id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <p className="font-medium">{title}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {VENUE_TAG_LABELS[venueTag] ?? venueTag}
                  </TableCell>
                  <TableCell>
                    <Badge variant={isPublished ? "default" : "secondary"}>
                      {isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {publishedAt ? publishedAt.toLocaleDateString() : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
