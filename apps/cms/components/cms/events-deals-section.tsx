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
import { Calendar, FolderOpen, Plus, RefreshCw, Wine } from "lucide-react";
import type { DashboardData } from "@/lib/dashboard";
import { ActionsDropdown } from "./actions-dropdown";

export function CmsEventsDealsSection({
  dashboard,
}: {
  dashboard: DashboardData;
  performersForVenue?: Array<{ id: string; name: string }>;
}) {
  return (
    <section id="events-deals" className="space-y-8">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Events & Deals</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-2xl font-semibold">{dashboard.events.length}</p>
          <p className="text-sm text-muted-foreground">Total Events</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-2xl font-semibold">{dashboard.deals.length}</p>
          <p className="text-sm text-muted-foreground">Total Deals</p>
        </div>
      </div>

      <div className="space-y-4">
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
              {dashboard.events.map((event) => {
                const id = String(event.id ?? "");
                const title = typeof event.title === "string" ? event.title : "";
                const description = typeof event.description === "string" ? event.description : null;
                const eventDate = event.eventDate != null ? new Date(event.eventDate as string | Date) : null;
                const status = typeof event.status === "string" ? event.status : "published";
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[280px]">
                            {description ?? "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {eventDate ? eventDate.toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status === "published" ? "default" : "secondary"}>
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ActionsDropdown />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">All Deals</h3>
          <p className="text-sm text-muted-foreground">Manage drink deals</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-1.5 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/deals/new">
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New Deal
            </Button>
          </Link>
        </div>
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboard.deals.map((deal) => {
                const id = String(deal.id ?? "");
                const title = typeof deal.title === "string" ? deal.title : "";
                const description = typeof deal.description === "string" ? deal.description : null;
                const isActive = deal.isActive === true || (deal.isActive !== false && deal.isActive !== 0);
                return (
                  <TableRow key={id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Wine className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <p className="font-medium">{title}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[280px] truncate text-muted-foreground">
                      {description ?? "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ActionsDropdown />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
