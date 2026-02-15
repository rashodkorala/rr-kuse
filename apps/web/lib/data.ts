import { getSupabase } from "./supabase";

type VenueTag = "rob_roy" | "konfusion";

function emptyEvents() {
  return { upcoming: [] as ReturnType<typeof formatEvent>[], past: [] as ReturnType<typeof formatEvent>[] };
}

// ────────────────────────────────────────────
// Events
// ────────────────────────────────────────────

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function formatEvent(
  e: Record<string, unknown>,
  isPast = false,
) {
  const date = new Date(e.event_date as string);
  const startTime = (e.start_time as string) ?? "";
  const endTime = (e.end_time as string) ?? "";
  const time = startTime && endTime ? `${startTime} - ${endTime}` : startTime;

  return {
    id: e.id as string,
    title: (e.title as string) ?? "",
    description: (e.description as string) ?? "",
    image: (e.poster_image_url as string) ?? "",
    day: String(date.getDate()).padStart(2, "0"),
    month: MONTHS[date.getMonth()],
    time,
    price: (e.cover_charge as string) ?? undefined,
    isPast,
    isSoldOut: (e.status as string) === "cancelled",
  };
}

export async function getEvents(venueTag: VenueTag) {
  const supabase = getSupabase();
  if (!supabase) return emptyEvents();

  const now = new Date().toISOString();

  const { data: upcoming } = await supabase
    .from("events")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("status", "published")
    .gte("event_date", now)
    .order("event_date", { ascending: true });

  const { data: past } = await supabase
    .from("events")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("status", "published")
    .lt("event_date", now)
    .order("event_date", { ascending: false })
    .limit(6);

  return {
    upcoming: (upcoming ?? []).map((e) => formatEvent(e)),
    past: (past ?? []).map((e) => formatEvent(e, true)),
  };
}

// ────────────────────────────────────────────
// Performers
// ────────────────────────────────────────────

export async function getPerformers(venueTag: VenueTag) {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("performers")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("is_alumni", false)
    .order("is_featured", { ascending: false })
    .order("name", { ascending: true });

  return (data ?? []).map((p) => ({
    name: p.name as string,
    type: (p.performer_type as string) === "solo_artist"
      ? ("band" as const)
      : (p.performer_type as "dj" | "band"),
    genre: (p.genre as string) ?? "",
    image: (p.profile_image_url as string) ?? "",
    bio: (p.bio as string) ?? undefined,
    instagram: p.instagram_handle
      ? `https://instagram.com/${(p.instagram_handle as string).replace("@", "")}`
      : undefined,
    spotify: (p.spotify_url as string) ?? undefined,
    soundcloud: (p.soundcloud_url as string) ?? undefined,
  }));
}

// ────────────────────────────────────────────
// Deals
// ────────────────────────────────────────────

export async function getDeals(venueTag: VenueTag) {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("deals")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (data ?? []).map((d) => ({
    id: d.id as string,
    title: d.title as string,
    description: d.description as string,
    image: (d.image_url as string) ?? "",
    day: (d.day_of_week as string) ?? "All Week",
    timeRange:
      d.start_time && d.end_time
        ? `${d.start_time} - ${d.end_time}`
        : undefined,
  }));
}

// ────────────────────────────────────────────
// Gallery
// ────────────────────────────────────────────

export async function getGalleryImages(venueTag: VenueTag) {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .order("display_order", { ascending: true });

  return (data ?? []).map((g) => ({
    url: g.image_url as string,
    caption: (g.caption as string) ?? undefined,
  }));
}

// ────────────────────────────────────────────
// Convenience: fetch everything for a venue
// ────────────────────────────────────────────

export async function getVenueData(venueTag: VenueTag) {
  const [events, performers, deals, gallery] = await Promise.all([
    getEvents(venueTag),
    getPerformers(venueTag),
    getDeals(venueTag),
    getGalleryImages(venueTag),
  ]);

  return { events, performers, deals, gallery };
}
