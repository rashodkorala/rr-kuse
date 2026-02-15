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

type PostRow = {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  isPublished: boolean | null;
  publishedAt: Date | null;
  venueTag: string;
};

export function CmsPostsSection({
  posts,
}: {
  posts: PostRow[];
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
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="font-medium">{post.title}</p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {VENUE_TAG_LABELS[post.venueTag] ?? post.venueTag}
                </TableCell>
                <TableCell>
                  <Badge variant={post.isPublished ? "default" : "secondary"}>
                    {post.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
