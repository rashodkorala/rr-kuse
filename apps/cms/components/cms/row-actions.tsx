"use client";

import { useState } from "react";
import { ActionsDropdown } from "./actions-dropdown";
import { CardPreviewDialog } from "./card-preview-dialog";

type PerformerPreview = {
  name: string;
  performerType: string;
  genre: string | null;
  bio: string | null;
  profileImageUrl: string | null;
};

type EventPreview = {
  title: string;
  description: string | null;
  eventDate: Date;
  startTime: string | null;
  endTime: string | null;
  coverCharge: string | null;
  posterImageUrl: string | null;
};

type DealPreview = {
  title: string;
  description: string;
  dayOfWeek: string | null;
  imageUrl: string | null;
};

type PreviewData = PerformerPreview | EventPreview | DealPreview;

type RowActionsProps =
  | {
      type: "performer";
      editHref: string;
      deleteAction: (id: string) => void | Promise<void | unknown>;
      id: string;
      previewData: PerformerPreview;
    }
  | {
      type: "event";
      editHref: string;
      deleteAction: (id: string) => void | Promise<void | unknown>;
      id: string;
      previewData: EventPreview;
    }
  | {
      type: "deal";
      editHref: string;
      deleteAction: (id: string) => void | Promise<void | unknown>;
      id: string;
      previewData: DealPreview;
    };

export function RowActions(props: RowActionsProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this? This cannot be undone.")) return;
    void props.deleteAction(props.id);
  };

  return (
    <>
      <ActionsDropdown
        editHref={props.editHref}
        onDelete={handleDelete}
        onPreview={() => setPreviewOpen(true)}
      />
      <CardPreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        type={props.type}
        data={props.previewData}
      />
    </>
  );
}
