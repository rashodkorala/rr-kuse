import { getSupabase, getSupabaseConfigError, rowsToCamel } from "./db/supabase-data";

export type DashboardData = {
  configError?: string;
  dataError?: string;
  performers: Record<string, unknown>[];
  events: (Record<string, unknown> & { performerName: string | null })[];
  deals: Record<string, unknown>[];
  galleryImages: Record<string, unknown>[];
  videos: (Record<string, unknown> & { performerName: string | null; eventTitle: string | null })[];
  instagramPosts: Record<string, unknown>[];
  posts: Record<string, unknown>[];
  operatingHours: Record<string, unknown>[];
  specialOfferings: Record<string, unknown>[];
  venueContent: Record<string, unknown>[];
};

const CONFIG_MSG =
  "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to apps/cms/.env.local.";

export async function getDashboardData(): Promise<DashboardData> {
  const err = getSupabaseConfigError();
  if (err) {
    return {
      configError: err,
      performers: [],
      events: [],
      deals: [],
      galleryImages: [],
      videos: [],
      instagramPosts: [],
      posts: [],
      operatingHours: [],
      specialOfferings: [],
      venueContent: [],
    };
  }

  const sb = await getSupabase();
  if (!sb) {
    return {
      configError: CONFIG_MSG,
      performers: [],
      events: [],
      deals: [],
      galleryImages: [],
      videos: [],
      instagramPosts: [],
      posts: [],
      operatingHours: [],
      specialOfferings: [],
      venueContent: [],
    };
  }

  try {
    const [
      performersRes,
      eventsRes,
      dealsRes,
      galleryRes,
      videosRes,
      instagramRes,
      postsRes,
      hoursRes,
      offeringsRes,
      contentRes,
    ] = await Promise.all([
      sb.from("performers").select("*").order("is_featured", { ascending: false }).order("name", { ascending: true }),
      sb.from("events").select("*, performers(name)").order("event_date", { ascending: false }).limit(50),
      sb.from("deals").select("*").order("display_order", { ascending: true }).order("title", { ascending: true }).limit(50),
      sb.from("gallery_images").select("*").order("display_order", { ascending: true }).limit(50),
      sb
        .from("videos")
        .select("*, performers(name), events(title)")
        .order("display_order", { ascending: true })
        .limit(50),
      sb
        .from("instagram_posts")
        .select("*")
        .order("display_order", { ascending: true })
        .order("timestamp", { ascending: false })
        .limit(100),
      sb.from("posts").select("*").order("published_at", { ascending: false }).limit(50),
      sb.from("operating_hours").select("*").order("display_order", { ascending: true }).limit(20),
      sb.from("special_offerings").select("*").order("display_order", { ascending: true }).limit(50),
      sb.from("venue_content").select("*").order("content_key", { ascending: true }).limit(50),
    ]);

    if (performersRes.error) throw performersRes.error;
    if (eventsRes.error) throw eventsRes.error;
    if (dealsRes.error) throw dealsRes.error;
    if (galleryRes.error) throw galleryRes.error;
    if (videosRes.error) throw videosRes.error;
    if (instagramRes.error) throw instagramRes.error;
    if (postsRes.error) throw postsRes.error;
    if (hoursRes.error) throw hoursRes.error;
    if (offeringsRes.error) throw offeringsRes.error;
    if (contentRes.error) throw contentRes.error;

    const eventRows = (eventsRes.data ?? []).map((e: Record<string, unknown>) => {
      const performers = e.performers as { name?: string } | null;
      const { performers: _p, ...rest } = e;
      return { ...rest, performer_name: performers?.name ?? null };
    });

    const videoRows = (videosRes.data ?? []).map((v: Record<string, unknown>) => {
      const performers = v.performers as { name?: string } | null;
      const events = v.events as { title?: string } | null;
      const { performers: _p, events: _e, ...rest } = v;
      return { ...rest, performer_name: performers?.name ?? null, event_title: events?.title ?? null };
    });

    return {
      performers: rowsToCamel((performersRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      events: rowsToCamel(eventRows) as (Record<string, unknown> & { performerName: string | null })[],
      deals: rowsToCamel((dealsRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      galleryImages: rowsToCamel((galleryRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      videos: rowsToCamel(videoRows) as (Record<string, unknown> & {
        performerName: string | null;
        eventTitle: string | null;
      })[],
      instagramPosts: rowsToCamel((instagramRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      posts: rowsToCamel((postsRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      operatingHours: rowsToCamel((hoursRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      specialOfferings: rowsToCamel((offeringsRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
      venueContent: rowsToCamel((contentRes.data ?? []) as Record<string, unknown>[]) as Record<string, unknown>[],
    };
  } catch {
    return {
      dataError:
        "Failed to query CMS data. Ensure migrations are applied and Supabase credentials are valid.",
      performers: [],
      events: [],
      deals: [],
      galleryImages: [],
      videos: [],
      instagramPosts: [],
      posts: [],
      operatingHours: [],
      specialOfferings: [],
      venueContent: [],
    };
  }
}
