"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@rr-kuse/ui";

type ActionsDropdownProps = {
  editHref?: string;
  onDelete?: () => void;
  onPreview?: () => void;
};

export function ActionsDropdown({
  editHref,
  onDelete,
  onPreview,
}: ActionsDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[160px] rounded-md border border-border bg-popover p-1 shadow-md"
          align="end"
        >
          {onPreview && (
            <DropdownMenu.Item
              className="cursor-pointer rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent flex items-center gap-2"
              onSelect={onPreview}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </DropdownMenu.Item>
          )}
          {editHref && (
            <DropdownMenu.Item asChild>
              <Link
                href={editHref}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Link>
            </DropdownMenu.Item>
          )}
          {onDelete && (
            <DropdownMenu.Item
              className="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-destructive outline-none hover:bg-accent hover:text-destructive flex items-center gap-2"
              onSelect={onDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
