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

export type DashboardData = {
  configError?: string;
  dataError?: string;
  performers: Array<typeof performers.$inferSelect>;
  events: Array<
    typeof events.$inferSelect & {
      performerName: string | null;
    }
  >;
  deals: Array<typeof deals.$inferSelect>;
  galleryImages: Array<typeof galleryImages.$inferSelect>;
  videos: Array<
    typeof videos.$inferSelect & {
      performerName: string | null;
      eventTitle: string | null;
    }
  >;
  instagramPosts: Array<typeof instagramPosts.$inferSelect>;
  posts: Array<typeof posts.$inferSelect>;
  operatingHours: Array<typeof operatingHours.$inferSelect>;
  specialOfferings: Array<typeof specialOfferings.$inferSelect>;
  venueContent: Array<typeof venueContent.$inferSelect>;
};

export async function getDashboardData(): Promise<DashboardData> {
  const db = getDb();
  if (!db) {
    return {
      configError: "Missing DATABASE_URL. Add it to apps/cms/.env.local.",
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
      performerRows,
      eventRows,
      dealRows,
      galleryRows,
      videoRows,
      instagramRows,
      postRows,
      hoursRows,
      offeringsRows,
      contentRows,
    ] = await Promise.all([
      db.select().from(performers).orderBy(desc(performers.isFeatured), asc(performers.name)),
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
        .from(deals)
        .orderBy(asc(deals.displayOrder), asc(deals.title))
        .limit(50),
      db
        .select()
        .from(galleryImages)
        .orderBy(asc(galleryImages.displayOrder))
        .limit(50),
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
      db
        .select()
        .from(instagramPosts)
        .orderBy(asc(instagramPosts.displayOrder), desc(instagramPosts.timestamp))
        .limit(100),
      db
        .select()
        .from(posts)
        .orderBy(desc(posts.publishedAt))
        .limit(50),
      db
        .select()
        .from(operatingHours)
        .orderBy(asc(operatingHours.displayOrder))
        .limit(20),
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

    return {
      performers: performerRows,
      events: eventRows,
      deals: dealRows,
      galleryImages: galleryRows,
      videos: videoRows,
      instagramPosts: instagramRows,
      posts: postRows,
      operatingHours: hoursRows,
      specialOfferings: offeringsRows,
      venueContent: contentRows,
    };
  } catch {
    return {
      dataError:
        "Failed to query CMS data. Ensure migrations are applied and DB credentials are valid.",
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
