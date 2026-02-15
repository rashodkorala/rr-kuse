import Link from "next/link";
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
import { FolderOpen, Plus, RefreshCw, Star, Users } from "lucide-react";
import { deletePerformer } from "@/app/actions";
import { RowActions } from "./row-actions";

export function CmsPerformersSection({ performers }: { performers: Record<string, unknown>[] }) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{performers.length}</p>
        <p className="text-sm text-muted-foreground">Total Performers</p>
      </div>

      <div>
        <h3 className="text-lg font-medium">All Performers</h3>
        <p className="text-sm text-muted-foreground">Manage your performers. Konfusion is DJ-only.</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-1.5 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/performers/new">
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Performer
            </Button>
          </Link>
        </div>
      </div>

      {performers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <Users className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium">No performers yet</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Get started by adding your first performer.
          </p>
          <Link href="/performers/new">
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Performer
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Venue Scope</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performers.map((performer) => {
                const id = String(performer.id ?? "");
                const name = typeof performer.name === "string" ? performer.name : "";
                const bio = typeof performer.bio === "string" ? performer.bio : null;
                const performerType = typeof performer.performerType === "string" ? performer.performerType : "";
                const venueTag = typeof performer.venueTag === "string" ? performer.venueTag : "both";
                const isFeatured = performer.isFeatured === true;
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[320px]">
                            {bio ?? "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{performerType}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{venueTag}</Badge>
                    </TableCell>
                    <TableCell>
                      {isFeatured ? (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <RowActions
                        type="performer"
                        editHref={`/performers/${id}/edit`}
                        deleteAction={deletePerformer}
                      id={id}
                      previewData={{
                        name,
                        performerType,
                        genre: typeof performer.genre === "string" ? performer.genre : null,
                        bio,
                        profileImageUrl: typeof performer.profileImageUrl === "string" ? performer.profileImageUrl : null,
                      }}
                    />
                  </TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
