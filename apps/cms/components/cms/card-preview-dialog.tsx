"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@rr-kuse/ui";
import { Headphones, Music, Calendar, Wine } from "lucide-react";

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

function isPerformer(d: PreviewData): d is PerformerPreview {
  return "performerType" in d && "profileImageUrl" in d;
}

function isEvent(d: PreviewData): d is EventPreview {
  return "eventDate" in d && "posterImageUrl" in d;
}

export function CardPreviewDialog({
  open,
  onOpenChange,
  type,
  data,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "performer" | "event" | "deal";
  data: PreviewData | null;
}) {
  if (!data) return null;

  const venue = "rob_roy"; // preview style
  const isOrange = venue === "rob_roy";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Card preview</DialogTitle>
        </DialogHeader>
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
          {type === "performer" && isPerformer(data) && (
            <>
              <div className="relative aspect-[3/4] bg-muted">
                {data.profileImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.profileImageUrl}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/40" />
                <div className="absolute top-2 left-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                      isOrange ? "bg-orange-600/90 text-white" : "bg-purple-600/90 text-white"
                    }`}
                  >
                    {data.performerType === "dj" ? (
                      <Headphones className="w-3 h-3" />
                    ) : (
                      <Music className="w-3 h-3" />
                    )}
                    {data.performerType === "dj" ? "DJ" : "Live Band"}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-foreground">{data.name}</h3>
                <p className="text-sm text-muted-foreground">{data.genre ?? "—"}</p>
                {data.bio && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{data.bio}</p>
                )}
              </div>
            </>
          )}

          {type === "event" && isEvent(data) && (
            <>
              <div className="relative h-40 bg-muted">
                {data.posterImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.posterImageUrl}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/40" />
                <div
                  className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold ${
                    isOrange ? "bg-orange-600/90 text-white" : "bg-purple-600/90 text-white"
                  }`}
                >
                  {new Date(data.eventDate).getDate()}{" "}
                  {new Date(data.eventDate).toLocaleString("en", { month: "short" }).toUpperCase()}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-foreground">{data.title}</h3>
                {data.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{data.description}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                  {data.startTime && data.endTime && (
                    <span>{data.startTime} – {data.endTime}</span>
                  )}
                  {data.coverCharge && <span>{data.coverCharge}</span>}
                </div>
              </div>
            </>
          )}

          {type === "deal" && !isPerformer(data) && !isEvent(data) && (
            <>
              <div className="relative aspect-[4/3] bg-muted">
                {data.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Wine className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/40" />
                <div
                  className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                    isOrange ? "bg-orange-600/90 text-white" : "bg-purple-600/90 text-white"
                  }`}
                >
                  {data.dayOfWeek ?? "All Week"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-foreground">{data.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{data.description}</p>
              </div>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          This is how the card will appear on the venue site.
        </p>
      </DialogContent>
    </Dialog>
  );
}
