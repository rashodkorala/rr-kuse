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
import { Calendar, Plus, RefreshCw } from "lucide-react";
import { deleteEvent } from "@/app/actions";
import { RowActions } from "./row-actions";

type EventRow = {
  id: string;
  title: string;
  description: string | null;
  eventDate: Date;
  status: string | null;
  performerName: string | null;
  startTime?: string | null;
  endTime?: string | null;
  coverCharge?: string | null;
  posterImageUrl?: string | null;
};

export function CmsEventsSection({
  events,
}: {
  events: EventRow[];
  performers?: Array<{ id: string; name: string }>;
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-2xl font-semibold">{events.length}</p>
        <p className="text-sm text-muted-foreground">Total Events</p>
      </div>

      <div>
        <h3 className="text-lg font-medium">All Events</h3>
        <p className="text-sm text-muted-foreground">Manage your venue events</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-1.5 h-4 w-4" />
          Refresh
        </Button>
        <Link href="/events/new">
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            New Event
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
          <Calendar className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium">No events yet</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Get started by creating your first event.
          </p>
          <Link href="/events/new">
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[280px]">
                          {event.description ?? "-"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {event.eventDate
                      ? new Date(event.eventDate).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={event.status === "published" ? "default" : "secondary"}
                    >
                      {event.status ?? "published"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <RowActions
                      type="event"
                      editHref={`/events/${event.id}/edit`}
                      deleteAction={deleteEvent}
                      id={event.id}
                      previewData={{
                        title: event.title,
                        description: event.description,
                        eventDate: event.eventDate,
                        startTime: event.startTime ?? null,
                        endTime: event.endTime ?? null,
                        coverCharge: event.coverCharge ?? null,
                        posterImageUrl: event.posterImageUrl ?? null,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}
