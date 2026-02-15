"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea } from "@rr-kuse/ui";
import { EntryModal } from "./entry-modal";
import { Plus } from "lucide-react";
import { createDeal } from "@/app/actions";
import { FileField, VenueTagSelect } from "./shared-fields";

export function DealFormModal() {
  const [open, setOpen] = useState(false);

  return (
    <EntryModal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          New Deal
        </Button>
      }
      title="New Drink Deal"
      subtitle="Add a drink deal or special offer for your venue"
      footer={
        <>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="deal-form">
            Create Deal
          </Button>
        </>
      }
    >
      <form action={createDeal} id="deal-form" className="space-y-6">
        <div>
          <h4 className="text-sm font-medium mb-4">Basic Information</h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <VenueTagSelect />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <Label htmlFor="deal-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deal-title"
                name="title"
                placeholder="e.g., $5 Draft Beer Tuesdays"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal-day">Day of week</Label>
              <select
                id="deal-day"
                name="dayOfWeek"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                defaultValue=""
              >
                <option value="">Daily</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal-order">Display order</Label>
              <Input
                id="deal-order"
                name="displayOrder"
                type="number"
                defaultValue={0}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal-start">Start time</Label>
              <Input id="deal-start" name="startTime" placeholder="e.g., 5:00 PM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal-end">End time</Label>
              <Input id="deal-end" name="endTime" placeholder="e.g., 10:00 PM" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                id="deal-active"
                name="isActive"
                type="checkbox"
                defaultChecked
                className="rounded"
              />
              <Label htmlFor="deal-active" className="font-normal cursor-pointer">
                Active deal
              </Label>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-4">Content</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deal-description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="deal-description"
                name="description"
                placeholder="Describe the deal, what's included..."
                rows={4}
                required
              />
            </div>
            <FileField id="deal-image-file" name="imageFile" label="Deal Image" />
            <div className="space-y-2">
              <Label htmlFor="deal-image-url">or image URL</Label>
              <Input
                id="deal-image-url"
                name="imageUrl"
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
