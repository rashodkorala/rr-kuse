import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const performers = pgTable(
  "performers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    performerType: text("performer_type").notNull(),
    summary: text("summary"),
    bio: text("bio"),
    genre: text("genre"),
    profileImageUrl: text("profile_image_url"),
    instagramHandle: text("instagram_handle"),
    spotifyUrl: text("spotify_url"),
    soundcloudUrl: text("soundcloud_url"),
    websiteUrl: text("website_url"),
    venueTag: text("venue_tag").default("both"),
    isFeatured: boolean("is_featured").default(false),
    isAlumni: boolean("is_alumni").default(false),
  },
  (table) => [
    check(
      "performers_performer_type_check",
      sql`${table.performerType} IN ('band', 'dj', 'solo_artist')`,
    ),
    check(
      "performers_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("performers_venue_tag_idx").on(table.venueTag),
  ],
);

export const events = pgTable(
  "events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    eventDate: timestamp("event_date", { withTimezone: true }),
    startTime: text("start_time"),
    endTime: text("end_time"),
    performerId: uuid("performer_id").references(() => performers.id, { onDelete: "set null" }),
    eventType: text("event_type"),
    coverCharge: text("cover_charge"),
    posterImageUrl: text("poster_image_url"),
    status: text("status").default("published"),
    recurringDay: text("recurring_day"),
  },
  (table) => [
    check(
      "events_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("events_venue_tag_idx").on(table.venueTag),
    index("events_performer_id_idx").on(table.performerId),
    index("events_event_date_idx").on(table.eventDate),
    check("events_status_check", sql`${table.status} IN ('draft', 'published', 'cancelled')`),
  ],
);

export const deals = pgTable(
  "deals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    dayOfWeek: text("day_of_week"),
    startTime: text("start_time"),
    endTime: text("end_time"),
    isActive: boolean("is_active").default(true),
    imageUrl: text("image_url"),
    displayOrder: integer("display_order").default(0),
  },
  (table) => [
    check(
      "deals_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("deals_venue_tag_idx").on(table.venueTag),
    index("deals_is_active_idx").on(table.isActive),
    index("deals_display_order_idx").on(table.displayOrder),
  ],
);

export const galleryImages = pgTable(
  "gallery_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    imageUrl: text("image_url").notNull(),
    caption: text("caption"),
    eventId: uuid("event_id").references(() => events.id, { onDelete: "set null" }),
    category: text("category"),
    isFeatured: boolean("is_featured").default(false),
    displayOrder: integer("display_order").default(0),
  },
  (table) => [
    check(
      "gallery_images_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("gallery_images_venue_tag_idx").on(table.venueTag),
    index("gallery_images_event_id_idx").on(table.eventId),
    index("gallery_images_display_order_idx").on(table.displayOrder),
  ],
);

export const videos = pgTable(
  "videos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    title: text("title").notNull(),
    videoUrl: text("video_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    performerId: uuid("performer_id").references(() => performers.id, { onDelete: "set null" }),
    eventId: uuid("event_id").references(() => events.id, { onDelete: "set null" }),
    isFeatured: boolean("is_featured").default(false),
    displayOrder: integer("display_order").default(0),
  },
  (table) => [
    check(
      "videos_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("videos_venue_tag_idx").on(table.venueTag),
    index("videos_performer_id_idx").on(table.performerId),
    index("videos_event_id_idx").on(table.eventId),
    index("videos_display_order_idx").on(table.displayOrder),
  ],
);

export const instagramPosts = pgTable(
  "instagram_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    instagramId: text("instagram_id").notNull().unique(),
    imageUrl: text("image_url").notNull(),
    caption: text("caption"),
    permalink: text("permalink").notNull(),
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
    isVisible: boolean("is_visible").default(true),
    venueTag: text("venue_tag"),
    displayOrder: integer("display_order").default(0),
  },
  (table) => [
    index("instagram_posts_timestamp_idx").on(table.timestamp),
    index("instagram_posts_is_visible_idx").on(table.isVisible),
    index("instagram_posts_display_order_idx").on(table.displayOrder),
    check(
      "instagram_posts_venue_tag_check",
      sql`${table.venueTag} IS NULL OR ${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
  ],
);

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    excerpt: text("excerpt"),
    imageUrl: text("image_url"),
    isPublished: boolean("is_published").default(true),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (table) => [
    check(
      "posts_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("posts_venue_tag_idx").on(table.venueTag),
    index("posts_is_published_idx").on(table.isPublished),
    index("posts_published_at_idx").on(table.publishedAt),
  ],
);

export const operatingHours = pgTable(
  "operating_hours",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    dayOfWeek: text("day_of_week").notNull(),
    openTime: text("open_time"),
    closeTime: text("close_time"),
    isClosed: boolean("is_closed").default(false),
    displayOrder: integer("display_order").default(0),
  },
  (table) => [
    check(
      "operating_hours_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("operating_hours_venue_tag_idx").on(table.venueTag),
    index("operating_hours_display_order_idx").on(table.displayOrder),
    unique("operating_hours_venue_tag_day_unique").on(table.venueTag, table.dayOfWeek),
  ],
);

export const specialOfferings = pgTable(
  "special_offerings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    offeringType: text("offering_type").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    ctaText: text("cta_text"),
    ctaLink: text("cta_link"),
    isActive: boolean("is_active").default(true),
    displayOrder: integer("display_order").default(0),
  },
  (table) => [
    check(
      "special_offerings_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("special_offerings_venue_tag_idx").on(table.venueTag),
    index("special_offerings_display_order_idx").on(table.displayOrder),
    index("special_offerings_is_active_idx").on(table.isActive),
    check(
      "special_offerings_offering_type_check",
      sql`${table.offeringType} IN ('bus_crawl', 'pub_crawl', 'private_events', 'patio')`,
    ),
  ],
);

export const venueContent = pgTable(
  "venue_content",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    venueTag: text("venue_tag").default("both").notNull(),
    contentKey: text("content_key").notNull(),
    content: text("content").notNull(),
    label: text("label"),
  },
  (table) => [
    check(
      "venue_content_venue_tag_check",
      sql`${table.venueTag} IN ('rob_roy', 'konfusion', 'both')`,
    ),
    index("venue_content_venue_tag_idx").on(table.venueTag),
    unique("venue_content_venue_tag_key_unique").on(table.venueTag, table.contentKey),
  ],
);

export type Performer = typeof performers.$inferSelect;
