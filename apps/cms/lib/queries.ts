import { asc, desc, eq } from "drizzle-orm";
import { getDb } from "./db/client";
import {
  deals,
  events,
  galleryImages,
  instagramPosts,
  operatingHours,
  performers,
  posts,
  specialOfferings,
  venueContent,
  videos,
} from "./db/schema";

/* ------------------------------------------------------------------ */
/*  Shared helper                                                      */
/* ------------------------------------------------------------------ */

type DbResult =
  | { db: NonNullable<ReturnType<typeof getDb>>; configError?: undefined }
  | { db: null; configError: string };

function getDbOrError(): DbResult {
  const db = getDb();
  if (!db) {
    return { db: null, configError: "Missing DATABASE_URL. Add it to apps/cms/.env.local." };
  }
  return { db };
}

/* ------------------------------------------------------------------ */
/*  Dashboard overview (lightweight counts)                            */
/* ------------------------------------------------------------------ */

export async function getDashboardOverview() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, counts: null };

  try {
    const [perf, ev, dl, gal, vid, ig, po] = await Promise.all([
      db.select().from(performers),
      db.select().from(events),
      db.select().from(deals),
      db.select().from(galleryImages),
      db.select().from(videos),
      db.select().from(instagramPosts),
      db.select().from(posts),
    ]);

    return {
      counts: {
        performers: perf.length,
        events: ev.length,
        deals: dl.length,
        gallery: gal.length,
        videos: vid.length,
        instagram: ig.length,
        posts: po.length,
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
  const { db, configError } = getDbOrError();
  if (!db) return { configError, performers: [] };

  try {
    const rows = await db
      .select()
      .from(performers)
      .orderBy(desc(performers.isFeatured), asc(performers.name));
    return { performers: rows };
  } catch (err) {
    console.error("[getPerformersData]", err);
    return { dataError: "Failed to load performers.", performers: [] };
  }
}

export async function getPerformerById(id: string) {
  const { db } = getDbOrError();
  if (!db) return null;
  const [row] = await db.select().from(performers).where(eq(performers.id, id));
  return row ?? null;
}

/* ------------------------------------------------------------------ */
/*  Events                                                             */
/* ------------------------------------------------------------------ */

export async function getEventsData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, events: [], performers: [] };

  try {
    const [eventRows, performerRows] = await Promise.all([
      db
        .select({
          id: events.id,
          venueTag: events.venueTag,
          title: events.title,
          description: events.description,
          eventDate: events.eventDate,
          startTime: events.startTime,
          endTime: events.endTime,
          performerId: events.performerId,
          eventType: events.eventType,
          coverCharge: events.coverCharge,
          posterImageUrl: events.posterImageUrl,
          status: events.status,
          recurringDay: events.recurringDay,
          performerName: performers.name,
        })
        .from(events)
        .leftJoin(performers, eq(events.performerId, performers.id))
        .orderBy(desc(events.eventDate))
        .limit(50),
      db
        .select()
        .from(performers)
        .orderBy(asc(performers.name)),
    ]);
    return { events: eventRows, performers: performerRows };
  } catch (err) {
    console.error("[getEventsData]", err);
    return { dataError: "Failed to load events.", events: [], performers: [] };
  }
}

export async function getEventById(id: string) {
  const { db } = getDbOrError();
  if (!db) return null;
  const [row] = await db.select().from(events).where(eq(events.id, id));
  return row ?? null;
}

/* ------------------------------------------------------------------ */
/*  Deals                                                              */
/* ------------------------------------------------------------------ */

export async function getDealsData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, deals: [] };

  try {
    const rows = await db
      .select()
      .from(deals)
      .orderBy(asc(deals.displayOrder), asc(deals.title))
      .limit(50);
    return { deals: rows };
  } catch (err) {
    console.error("[getDealsData]", err);
    return { dataError: "Failed to load deals.", deals: [] };
  }
}

export async function getDealById(id: string) {
  const { db } = getDbOrError();
  if (!db) return null;
  const [row] = await db.select().from(deals).where(eq(deals.id, id));
  return row ?? null;
}

/* ------------------------------------------------------------------ */
/*  Gallery                                                            */
/* ------------------------------------------------------------------ */

export async function getGalleryData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, galleryImages: [], events: [] };

  try {
    const [galleryRows, eventRows] = await Promise.all([
      db
        .select()
        .from(galleryImages)
        .orderBy(asc(galleryImages.displayOrder))
        .limit(50),
      db
        .select()
        .from(events)
        .orderBy(desc(events.eventDate))
        .limit(50),
    ]);
    return { galleryImages: galleryRows, events: eventRows };
  } catch (err) {
    console.error("[getGalleryData]", err);
    return { dataError: "Failed to load gallery.", galleryImages: [], events: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Videos                                                             */
/* ------------------------------------------------------------------ */

export async function getVideosData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, videos: [], performers: [], events: [] };

  try {
    const [videoRows, performerRows, eventRows] = await Promise.all([
      db
        .select({
          id: videos.id,
          venueTag: videos.venueTag,
          title: videos.title,
          videoUrl: videos.videoUrl,
          thumbnailUrl: videos.thumbnailUrl,
          performerId: videos.performerId,
          eventId: videos.eventId,
          isFeatured: videos.isFeatured,
          displayOrder: videos.displayOrder,
          performerName: performers.name,
          eventTitle: events.title,
        })
        .from(videos)
        .leftJoin(performers, eq(videos.performerId, performers.id))
        .leftJoin(events, eq(videos.eventId, events.id))
        .orderBy(asc(videos.displayOrder))
        .limit(50),
      db.select().from(performers).orderBy(asc(performers.name)),
      db
        .select()
        .from(events)
        .orderBy(desc(events.eventDate))
        .limit(50),
    ]);
    return { videos: videoRows, performers: performerRows, events: eventRows };
  } catch (err) {
    console.error("[getVideosData]", err);
    return { dataError: "Failed to load videos.", videos: [], performers: [], events: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Instagram                                                          */
/* ------------------------------------------------------------------ */

export async function getInstagramData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, instagramPosts: [] };

  try {
    const rows = await db
      .select()
      .from(instagramPosts)
      .orderBy(asc(instagramPosts.displayOrder), desc(instagramPosts.timestamp))
      .limit(100);
    return { instagramPosts: rows };
  } catch (err) {
    console.error("[getInstagramData]", err);
    return { dataError: "Failed to load Instagram posts.", instagramPosts: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Posts (Blog)                                                       */
/* ------------------------------------------------------------------ */

export async function getPostsData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, posts: [] };

  try {
    const rows = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.publishedAt))
      .limit(50);
    return { posts: rows };
  } catch (err) {
    console.error("[getPostsData]", err);
    return { dataError: "Failed to load posts.", posts: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Content (Offerings + Venue Content)                                */
/* ------------------------------------------------------------------ */

export async function getContentData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, specialOfferings: [], venueContent: [] };

  try {
    const [offeringsRows, contentRows] = await Promise.all([
      db
        .select()
        .from(specialOfferings)
        .orderBy(asc(specialOfferings.displayOrder))
        .limit(50),
      db
        .select()
        .from(venueContent)
        .orderBy(asc(venueContent.contentKey))
        .limit(50),
    ]);
    return { specialOfferings: offeringsRows, venueContent: contentRows };
  } catch (err) {
    console.error("[getContentData]", err);
    return { dataError: "Failed to load content.", specialOfferings: [], venueContent: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Settings (Operating Hours)                                         */
/* ------------------------------------------------------------------ */

export async function getSettingsData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, operatingHours: [] };

  try {
    const rows = await db
      .select()
      .from(operatingHours)
      .orderBy(asc(operatingHours.displayOrder))
      .limit(20);
    return { operatingHours: rows };
  } catch (err) {
    console.error("[getSettingsData]", err);
    return { dataError: "Failed to load settings.", operatingHours: [] };
  }
}

/* ------------------------------------------------------------------ */
/*  Analytics (counts for all sections)                                */
/* ------------------------------------------------------------------ */

export async function getAnalyticsData() {
  const { db, configError } = getDbOrError();
  if (!db) return { configError, counts: null };

  try {
    const [ev, dl, gal, vid, po, hrs, off, vc] = await Promise.all([
      db.select().from(events),
      db.select().from(deals),
      db.select().from(galleryImages),
      db.select().from(videos),
      db.select().from(posts),
      db.select().from(operatingHours),
      db.select().from(specialOfferings),
      db.select().from(venueContent),
    ]);
    return {
      counts: {
        events: ev.length,
        deals: dl.length,
        gallery: gal.length,
        videos: vid.length,
        posts: po.length,
        operatingHours: hrs.length,
        specialOfferings: off.length,
        venueContent: vc.length,
      },
    };
  } catch (err) {
    console.error("[getAnalyticsData]", err);
    return { dataError: "Failed to load analytics.", counts: null };
  }
}
