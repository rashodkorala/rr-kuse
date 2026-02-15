import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Input, Label, Textarea } from "@rr-kuse/ui";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/cms/page-shell";
import { updateEvent } from "@/app/actions";
import { FileField, VenueTagSelect } from "@/components/cms/shared-fields";
import { getEventById, getEventsData } from "@/lib/queries";

function toDateTimeLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day}T${h}:${min}`;
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [event, data] = await Promise.all([
    getEventById(id),
    getEventsData(),
  ]);
  if (!event) redirect("/events?error=Event+not+found.");

  const performers = (data.performers ?? []) as Record<string, unknown>[];
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const eventDate = (v: unknown): Date => {
    if (v instanceof Date) return v;
    if (typeof v === "string") return new Date(v);
    return new Date();
  };

  return (
    <PageShell title="Edit Event">
      <div className="max-w-2xl space-y-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <form action={updateEvent} className="space-y-8">
          <input type="hidden" name="id" value={String(event.id ?? "")} />
          <div>
            <h4 className="text-sm font-medium mb-4">Basic Information</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label className="mb-2 block">Venue</Label>
                <VenueTagSelect defaultValue={typeof event.venueTag === "string" ? event.venueTag : "both"} />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="event-title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="event-title"
                  name="title"
                  placeholder="e.g., Live Jazz Night"
                  defaultValue={s(event.title)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-date">Date & Time</Label>
                <Input
                  id="event-date"
                  name="eventDate"
                  type="datetime-local"
                  defaultValue={event.eventDate != null ? toDateTimeLocal(eventDate(event.eventDate)) : ""}
                />
                <p className="text-xs text-muted-foreground">
                  Required for one-off events. For recurring, leave empty and set Recurring day + Start/End time.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-status">Status</Label>
                <select
                  id="event-status"
                  name="status"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue={s(event.status) || "published"}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-start">Start time</Label>
                <Input
                  id="event-start"
                  name="startTime"
                  placeholder="e.g., 9:00 PM"
                  defaultValue={s(event.startTime)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-end">End time</Label>
                <Input
                  id="event-end"
                  name="endTime"
                  placeholder="e.g., 1:00 AM"
                  defaultValue={s(event.endTime)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-performer">Featured performer</Label>
                <select
                  id="event-performer"
                  name="performerId"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue={s(event.performerId)}
                >
                  <option value="">No featured performer</option>
                  {performers.map((p) => (
                    <option key={String(p.id ?? "")} value={String(p.id ?? "")}>
                      {typeof p.name === "string" ? p.name : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">Event type</Label>
                <select
                  id="event-type"
                  name="eventType"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue={s(event.eventType)}
                >
                  <option value="">Select type</option>
                  <option value="live_music">Live Music</option>
                  <option value="dj_night">DJ Night</option>
                  <option value="theme_night">Theme Night</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-cover">Cover charge</Label>
                <Input
                  id="event-cover"
                  name="coverCharge"
                  placeholder="e.g., $10 or Free"
                  defaultValue={s(event.coverCharge)}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="event-recurring">Recurring day</Label>
                <select
                  id="event-recurring"
                  name="recurringDay"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                  defaultValue={s(event.recurringDay)}
                >
                  <option value="">Not recurring</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Content</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  name="description"
                  placeholder="Describe the event, what to expect..."
                  rows={4}
                  defaultValue={s(event.description)}
                />
              </div>
              <FileField id="event-poster-file" name="posterImageFile" label="Poster Image" />
              <div className="space-y-2">
                <Label htmlFor="event-poster-url">or poster image URL</Label>
                <Input
                  id="event-poster-url"
                  name="posterImageUrl"
                  type="url"
                  placeholder="https://..."
                  defaultValue={s(event.posterImageUrl)}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button type="submit">Update Event</Button>
            <Link href="/events">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
