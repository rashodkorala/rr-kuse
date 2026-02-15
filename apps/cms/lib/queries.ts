import { getSupabase, getSupabaseConfigError, rowToCamel, rowsToCamel } from "./db/supabase-data";

const CONFIG_MSG =
  "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to apps/cms/.env.local.";

async function getSb() {
  const err = getSupabaseConfigError();
  if (err) return null;
  return getSupabase();
}

/* ------------------------------------------------------------------ */
/*  Dashboard overview (lightweight counts)                            */
/* ------------------------------------------------------------------ */

export async function getDashboardOverview() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, counts: null };

  try {
    const [perf, ev, dl, gal, vid, ig, po] = await Promise.all([
      sb.from("performers").select("*", { count: "exact", head: true }),
      sb.from("events").select("*", { count: "exact", head: true }),
      sb.from("deals").select("*", { count: "exact", head: true }),
      sb.from("gallery_images").select("*", { count: "exact", head: true }),
      sb.from("videos").select("*", { count: "exact", head: true }),
      sb.from("instagram_posts").select("*", { count: "exact", head: true }),
      sb.from("posts").select("*", { count: "exact", head: true }),
    ]);

    return {
      counts: {
        performers: (perf as { count?: number }).count ?? 0,
        events: (ev as { count?: number }).count ?? 0,
        deals: (dl as { count?: number }).count ?? 0,
        gallery: (gal as { count?: number }).count ?? 0,
        videos: (vid as { count?: number }).count ?? 0,
        instagram: (ig as { count?: number }).count ?? 0,
        posts: (po as { count?: number }).count ?? 0,
      },
    };
  } catch (err) {
    console.error("[getDashboardOverview]", err);
    return { dataError: "Failed to load dashboard data.", counts: null };
  }
}

/* ------------------------------------------------------------------ */
/*  Performers                                                         */
/* ------------------------------------------------------------------ */

export async function getPerformersData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, performers: [] };

  try {
    const { data, error } = await sb
      .from("performers")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("name", { ascending: true });
    if (error) throw error;
    return { performers: rowsToCamel((data ?? []) as Record<string, unknown>[]) };
  } catch (err) {
    console.error("[getPerformersData]", err);
    return { dataError: "Failed to load performers.", performers: [] };
  }
}

export async function getPerformerById(id: string) {
  const sb = await getSb();
  if (!sb) return null;
  const { data, error } = await sb.from("performers").select("*").eq("id", id).single();
  if (error || !data) return null;
  return rowToCamel(data as Record<string, unknown>) as Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Events                                                             */
/* ------------------------------------------------------------------ */

export async function getEventsData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, events: [], performers: [] };

  try {
    const [eventsRes, performersRes] = await Promise.all([
      sb
        .from("events")
        .select("*, performers(name)")
        .order("event_date", { ascending: false })
        .limit(50),
      sb.from("performers").select("*").order("name", { ascending: true }),
    ]);
    if (eventsRes.error) throw eventsRes.error;
    if (performersRes.error) throw performersRes.error;

    const eventRows = (eventsRes.data ?? []).map((e: Record<string, unknown>) => {
      const performers = e.performers as { name?: string } | null;
      const { performers: _, ...rest } = e;
      return { ...rest, performer_name: performers?.name ?? null };
    });
    return {
      events: rowsToCamel(eventRows) as Record<string, unknown>[],
      performers: rowsToCamel((performersRes.data ?? []) as Record<string, unknown>[]),
    };
  } catch (err) {
    console.error("[getEventsData]", err);
    return { dataError: "Failed to load events.", events: [], performers: [] };
  }
}

export async function getEventById(id: string) {
  const sb = await getSb();
  if (!sb) return null;
  const { data, error } = await sb.from("events").select("*").eq("id", id).single();
  if (error || !data) return null;
  return rowToCamel(data as Record<string, unknown>) as Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Deals                                                              */
/* ------------------------------------------------------------------ */

export async function getDealsData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, deals: [] };

  try {
    const { data, error } = await sb
      .from("deals")
      .select("*")
      .order("display_order", { ascending: true })
      .order("title", { ascending: true })
      .limit(50);
    if (error) throw error;
    return { deals: rowsToCamel((data ?? []) as Record<string, unknown>[]) };
  } catch (err) {
    console.error("[getDealsData]", err);
    return { dataError: "Failed to load deals.", deals: [] };
  }
}

export async function getDealById(id: string) {
  const sb = await getSb();
  if (!sb) return null;
  const { data, error } = await sb.from("deals").select("*").eq("id", id).single();
  if (error || !data) return null;
  return rowToCamel(data as Record<string, unknown>) as Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export async function getGalleryData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, galleryImages: [], events: [] };

  try {
    const [galleryRes, eventsRes] = await Promise.all([
      sb.from("gallery_images").select("*").order("display_order", { ascending: true }).limit(50),
      sb.from("events").select("*").order("event_date", { ascending: false }).limit(50),
    ]);
    if (galleryRes.error) throw galleryRes.error;
    if (eventsRes.error) throw eventsRes.error;
    return {
      galleryImages: rowsToCamel((galleryRes.data ?? []) as Record<string, unknown>[]),
      events: rowsToCamel((eventsRes.data ?? []) as Record<string, unknown>[]),
    };
  } catch (err) {
    console.error("[getGalleryData]", err);
    return { dataError: "Failed to load gallery.", galleryImages: [], events: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Videos                                                             */
/* ------------------------------------------------------------------ */

export async function getVideosData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, videos: [], performers: [], events: [] };

  try {
    const [videosRes, performersRes, eventsRes] = await Promise.all([
      sb
        .from("videos")
        .select("*, performers(name), events(title)")
        .order("display_order", { ascending: true })
        .limit(50),
      sb.from("performers").select("*").order("name", { ascending: true }),
      sb.from("events").select("*").order("event_date", { ascending: false }).limit(50),
    ]);
    if (videosRes.error) throw videosRes.error;
    if (performersRes.error) throw performersRes.error;
    if (eventsRes.error) throw eventsRes.error;

    const videoRows = (videosRes.data ?? []).map((v: Record<string, unknown>) => {
      const performers = v.performers as { name?: string } | null;
      const events = v.events as { title?: string } | null;
      const { performers: _p, events: _e, ...rest } = v;
      return { ...rest, performer_name: performers?.name ?? null, event_title: events?.title ?? null };
    });

    return {
      videos: rowsToCamel(videoRows) as Record<string, unknown>[],
      performers: rowsToCamel((performersRes.data ?? []) as Record<string, unknown>[]),
      events: rowsToCamel((eventsRes.data ?? []) as Record<string, unknown>[]),
    };
  } catch (err) {
    console.error("[getVideosData]", err);
    return { dataError: "Failed to load videos.", videos: [], performers: [], events: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Instagram                                                          */
/* ------------------------------------------------------------------ */

export async function getInstagramData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, instagramPosts: [] };

  try {
    const { data, error } = await sb
      .from("instagram_posts")
      .select("*")
      .order("display_order", { ascending: true })
      .order("timestamp", { ascending: false })
      .limit(100);
    if (error) throw error;
    return { instagramPosts: rowsToCamel((data ?? []) as Record<string, unknown>[]) };
  } catch (err) {
    console.error("[getInstagramData]", err);
    return { dataError: "Failed to load Instagram posts.", instagramPosts: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Posts (Blog)                                                       */
/* ------------------------------------------------------------------ */

export async function getPostsData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, posts: [] };

  try {
    const { data, error } = await sb
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return { posts: rowsToCamel((data ?? []) as Record<string, unknown>[]) };
  } catch (err) {
    console.error("[getPostsData]", err);
    return { dataError: "Failed to load posts.", posts: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Content (Offerings + Venue Content)                                */
/* ------------------------------------------------------------------ */

export async function getContentData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, specialOfferings: [], venueContent: [] };

  try {
    const [offeringsRes, contentRes] = await Promise.all([
      sb
        .from("special_offerings")
        .select("*")
        .order("display_order", { ascending: true })
        .limit(50),
      sb
        .from("venue_content")
        .select("*")
        .order("content_key", { ascending: true })
        .limit(50),
    ]);
    if (offeringsRes.error) throw offeringsRes.error;
    if (contentRes.error) throw contentRes.error;
    return {
      specialOfferings: rowsToCamel((offeringsRes.data ?? []) as Record<string, unknown>[]),
      venueContent: rowsToCamel((contentRes.data ?? []) as Record<string, unknown>[]),
    };
  } catch (err) {
    console.error("[getContentData]", err);
    return { dataError: "Failed to load content.", specialOfferings: [], venueContent: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Settings (Operating Hours)                                         */
/* ------------------------------------------------------------------ */

export async function getSettingsData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, operatingHours: [] };

  try {
    const { data, error } = await sb
      .from("operating_hours")
      .select("*")
      .order("display_order", { ascending: true })
      .limit(20);
    if (error) throw error;
    return { operatingHours: rowsToCamel((data ?? []) as Record<string, unknown>[]) };
  } catch (err) {
    console.error("[getSettingsData]", err);
    return { dataError: "Failed to load settings.", operatingHours: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Analytics (counts for all sections)                                */
/* ------------------------------------------------------------------ */

export async function getAnalyticsData() {
  const sb = await getSb();
  if (!sb) return { configError: CONFIG_MSG, counts: null };

  try {
    const [ev, dl, gal, vid, po, hrs, off, vc] = await Promise.all([
      sb.from("events").select("*", { count: "exact", head: true }),
      sb.from("deals").select("*", { count: "exact", head: true }),
      sb.from("gallery_images").select("*", { count: "exact", head: true }),
      sb.from("videos").select("*", { count: "exact", head: true }),
      sb.from("posts").select("*", { count: "exact", head: true }),
      sb.from("operating_hours").select("*", { count: "exact", head: true }),
      sb.from("special_offerings").select("*", { count: "exact", head: true }),
      sb.from("venue_content").select("*", { count: "exact", head: true }),
    ]);
    return {
      counts: {
        events: (ev as { count?: number }).count ?? 0,
        deals: (dl as { count?: number }).count ?? 0,
        gallery: (gal as { count?: number }).count ?? 0,
        videos: (vid as { count?: number }).count ?? 0,
        posts: (po as { count?: number }).count ?? 0,
        operatingHours: (hrs as { count?: number }).count ?? 0,
        specialOfferings: (off as { count?: number }).count ?? 0,
        venueContent: (vc as { count?: number }).count ?? 0,
      },
    };
  } catch (err) {
    console.error("[getAnalyticsData]", err);
    return { dataError: "Failed to load analytics.", counts: null };
  }
}
