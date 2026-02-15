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

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function dayNameToNumber(day: string): number {
  const i = DAY_NAMES.findIndex((d) => d.toLowerCase() === day.toLowerCase());
  return i >= 0 ? i : 0;
}

/** Parse "9:00 PM", "21:00", "9 PM" etc. to hours (0-23) and minutes. Defaults to 19 (7 PM). */
function parseTimeToHoursMinutes(startTime: string | null | undefined): { h: number; m: number } {
  if (!startTime || typeof startTime !== "string") return { h: 19, m: 0 };
  const s = startTime.trim();
  const amPm = /(\d{1,2}):?(\d{2})?\s*(am|pm)?/i.exec(s);
  if (!amPm) return { h: 19, m: 0 };
  let h = parseInt(amPm[1], 10) || 0;
  const m = parseInt(amPm[2], 10) || 0;
  const pm = (amPm[3] ?? "").toLowerCase() === "pm";
  const am = (amPm[3] ?? "").toLowerCase() === "am";
  if (pm && h < 12) h += 12;
  if (am && h === 12) h = 0;
  if (!am && !pm && h < 12 && s.toLowerCase().includes("p")) h += 12;
  return { h: Math.min(23, Math.max(0, h)), m: Math.min(59, Math.max(0, m)) };
}

/** Next N occurrence dates for a recurring event. Uses event_date for time if set, else start_time. */
function getRecurringOccurrences(
  event: Record<string, unknown>,
  from: Date,
  count: number,
): Date[] {
  const recurringDay = event.recurring_day as string | null | undefined;
  if (!recurringDay) return [];

  const targetDay = dayNameToNumber(recurringDay);
  const occurrences: Date[] = [];
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);

  while (d.getDay() !== targetDay) {
    d.setDate(d.getDate() + 1);
  }
  if (d < from) {
    d.setDate(d.getDate() + 7);
  }

  let h: number;
  let min: number;
  if (event.event_date) {
    const template = new Date(event.event_date as string);
    h = template.getHours();
    min = template.getMinutes();
  } else {
    const parsed = parseTimeToHoursMinutes(event.start_time as string);
    h = parsed.h;
    min = parsed.m;
  }
  d.setHours(h, min, 0, 0);
  if (d < from) {
    d.setDate(d.getDate() + 7);
  }

  for (let i = 0; i < count; i++) {
    occurrences.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return occurrences;
}

function formatEvent(
  e: Record<string, unknown>,
  isPast = false,
  occurrenceDate?: Date,
) {
  const date = occurrenceDate ?? (e.event_date ? new Date(e.event_date as string) : new Date(0));
  const startTime = (e.start_time as string) ?? "";
  const endTime = (e.end_time as string) ?? "";
  const time = startTime && endTime ? `${startTime} - ${endTime}` : startTime;
  const recurringDay = (e.recurring_day as string) ?? null;

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
    recurringLabel: recurringDay ? `Every ${recurringDay}` : undefined,
  };
}

export async function getEvents(venueTag: VenueTag) {
  const supabase = getSupabase();
  if (!supabase) return emptyEvents();

  const now = new Date();
  const nowIso = now.toISOString();

  const { data: oneOffUpcoming } = await supabase
    .from("events")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("status", "published")
    .is("recurring_day", null)
    .gte("event_date", nowIso)
    .order("event_date", { ascending: true });

  const { data: recurringEvents } = await supabase
    .from("events")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("status", "published")
    .not("recurring_day", "is", null)
    .order("event_date", { ascending: true });

  const recurringOccurrences: { event: Record<string, unknown>; date: Date }[] = [];
  for (const e of recurringEvents ?? []) {
    for (const date of getRecurringOccurrences(e, now, 12)) {
      recurringOccurrences.push({ event: e, date });
    }
  }

  const upcomingOneOff = (oneOffUpcoming ?? []).map((e) => ({
    sortDate: new Date(e.event_date as string).getTime(),
    formatted: formatEvent(e),
  }));
  const upcomingRecurring = recurringOccurrences.map(({ event: e, date }) => ({
    sortDate: date.getTime(),
    formatted: formatEvent(e, false, date),
  }));
  const upcoming = [...upcomingOneOff, ...upcomingRecurring]
    .sort((a, b) => a.sortDate - b.sortDate)
    .map((x) => x.formatted);

  const { data: past } = await supabase
    .from("events")
    .select("*")
    .or(`venue_tag.eq.${venueTag},venue_tag.eq.both`)
    .eq("status", "published")
    .lt("event_date", nowIso)
    .order("event_date", { ascending: false })
    .limit(6);

  return {
    upcoming,
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
