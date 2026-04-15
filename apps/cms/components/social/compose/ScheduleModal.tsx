"use client";

import { useState } from "react";
import { Dialog } from "radix-ui";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (isoUtc: string) => void;
};

function toLocalDatetimeValue(d: Date): string {
  const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return x.toISOString().slice(0, 16);
}

export function ScheduleModal({ open, onOpenChange, onConfirm }: Props) {
  const [localValue, setLocalValue] = useState(() => toLocalDatetimeValue(new Date()));

  const handleOpenChange = (next: boolean) => {
    if (next) setLocalValue(toLocalDatetimeValue(new Date()));
    onOpenChange(next);
  };

  const handleConfirm = () => {
    const parsed = new Date(localValue);
    if (Number.isNaN(parsed.getTime())) return;
    onConfirm(parsed.toISOString());
    handleOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
          )}
        />
        <Dialog.Content
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg outline-none duration-200"
          )}
        >
          <div className="flex items-center gap-2 mb-1">
            <CalendarClock className="size-5 text-muted-foreground" />
            <Dialog.Title className="text-base font-semibold">Schedule post</Dialog.Title>
          </div>
          <Dialog.Description className="text-sm text-muted-foreground mb-4">
            Pick a date and time. This demo stores the post in your session only.
          </Dialog.Description>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
            Date & time
          </label>
          <Input
            type="datetime-local"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="mb-6"
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirm}>
              Confirm schedule
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
