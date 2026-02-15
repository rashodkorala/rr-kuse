"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@rr-kuse/ui";
import { EntryModal } from "./entry-modal";
import { Plus } from "lucide-react";
import { createEvent } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

type EventFormModalProps = {
  performers: Array<{ id: string; name: string }>;
};

export function EventFormModal({
  performers,
}: EventFormModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <EntryModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          New Event
        </Button>
      }
      title="New Event"
      subtitle="Add an upcoming event to your venue calendar"
      footer={
        <>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="event-form">
            Create Event
          </Button>
        </>
      }
    >
      <form action={createEvent} id="event-form" className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-4">Basic Information</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <VenueTagSelect />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="event-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="event-title"
                name="title"
                placeholder="e.g., Live Jazz Night"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-date">Date & Time <span className="text-destructive">*</span></Label>
              <Input
                id="event-date"
                name="eventDate"
                type="datetime-local"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-status">Status</Label>
              <select
                id="event-status"
                name="status"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                defaultValue="published"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-start">Start time</Label>
              <Input id="event-start" name="startTime" placeholder="e.g., 9:00 PM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-end">End time</Label>
              <Input id="event-end" name="endTime" placeholder="e.g., 1:00 AM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-performer">Featured performer</Label>
              <select
                id="event-performer"
                name="performerId"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                defaultValue=""
              >
                <option value="">No featured performer</option>
                {performers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
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
                defaultValue=""
              >
                <option value="">Select type</option>
                <option value="live_music">Live Music</option>
                <option value="dj_night">DJ Night</option>
                <option value="theme_night">Theme Night</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-cover">Cover charge</Label>
              <Input id="event-cover" name="coverCharge" placeholder="e.g., $10 or Free" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="event-recurring">Recurring day</Label>
              <select
                id="event-recurring"
                name="recurringDay"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                defaultValue=""
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
              />
            </div>
          </div>
        </div>
      </form>
    </EntryModal>
  );
}
