import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rr-kuse/ui";
import { Instagram, RefreshCw } from "lucide-react";
import { syncInstagramPosts, toggleInstagramVisibility } from "@/app/actions";
import type { instagramPosts } from "@/lib/db/schema";
import { ActionsDropdown } from "./actions-dropdown";

type InstagramRow = typeof instagramPosts.$inferSelect;

export function CmsInstagramSection({ instagramPosts }: { instagramPosts: InstagramRow[] }) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{instagramPosts.length}</p>
        <p className="text-sm text-muted-foreground">Total Posts</p>
      </div>

      <div>
        <h3 className="text-lg font-medium">All Instagram Posts</h3>
        <p className="text-sm text-muted-foreground">Manage visibility and ordering of synced posts</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-1.5 h-4 w-4" />
          Refresh
        </Button>
        <form action={syncInstagramPosts}>
          <Button type="submit" size="sm">
            Sync Instagram Now
          </Button>
        </form>
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caption</TableHead>
              <TableHead>Posted</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instagramPosts.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="max-w-[340px] truncate">
                  {item.caption ?? "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(item.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <form action={toggleInstagramVisibility} className="inline">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="isVisible" value={item.isVisible ? "false" : "true"} />
                    <input type="hidden" name="venueTag" value={item.venueTag ?? ""} />
                    <input type="hidden" name="displayOrder" value={item.displayOrder ?? 0} />
                    <Badge variant={item.isVisible ? "default" : "secondary"}>
                      {item.isVisible ? "Visible" : "Hidden"}
                    </Badge>
                    <Button type="submit" variant="ghost" size="sm" className="ml-1 h-6 px-1">
                      Toggle
                    </Button>
                  </form>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <a href={item.permalink} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                      View
                    </a>
                    <ActionsDropdown />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
