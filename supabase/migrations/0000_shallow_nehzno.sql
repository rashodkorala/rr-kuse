CREATE TABLE "deals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"day_of_week" text,
	"start_time" text,
	"end_time" text,
	"is_active" boolean DEFAULT true,
	"image_url" text,
	"display_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"event_date" timestamp with time zone NOT NULL,
	"start_time" text,
	"end_time" text,
	"performer_id" uuid,
	"event_type" text,
	"cover_charge" text,
	"poster_image_url" text,
	"status" text DEFAULT 'published',
	"recurring_day" text,
	CONSTRAINT "events_status_check" CHECK ("events"."status" IN ('draft', 'published', 'cancelled'))
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"event_id" uuid,
	"category" text,
	"is_featured" boolean DEFAULT false,
	"display_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "instagram_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"instagram_id" text NOT NULL,
	"image_url" text NOT NULL,
	"caption" text,
	"permalink" text NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"is_visible" boolean DEFAULT true,
	"venue_tag" text,
	"display_order" integer DEFAULT 0,
	CONSTRAINT "instagram_posts_instagram_id_unique" UNIQUE("instagram_id"),
	CONSTRAINT "instagram_posts_venue_tag_check" CHECK ("instagram_posts"."venue_tag" IS NULL OR "instagram_posts"."venue_tag" IN ('rob_roy', 'konfusion', 'both'))
);
--> statement-breakpoint
CREATE TABLE "operating_hours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid NOT NULL,
	"day_of_week" text NOT NULL,
	"open_time" text,
	"close_time" text,
	"is_closed" boolean DEFAULT false,
	"display_order" integer DEFAULT 0,
	CONSTRAINT "operating_hours_venue_day_unique" UNIQUE("venue_id","day_of_week")
);
--> statement-breakpoint
CREATE TABLE "performers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"performer_type" text NOT NULL,
	"bio" text,
	"genre" text,
	"profile_image_url" text,
	"instagram_handle" text,
	"spotify_url" text,
	"soundcloud_url" text,
	"is_featured" boolean DEFAULT false,
	"is_alumni" boolean DEFAULT false,
	CONSTRAINT "performers_performer_type_check" CHECK ("performers"."performer_type" IN ('band', 'dj', 'solo_artist'))
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"image_url" text,
	"is_published" boolean DEFAULT true,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "special_offerings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid NOT NULL,
	"offering_type" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"cta_text" text,
	"cta_link" text,
	"is_active" boolean DEFAULT true,
	"display_order" integer DEFAULT 0,
	CONSTRAINT "special_offerings_offering_type_check" CHECK ("special_offerings"."offering_type" IN ('bus_crawl', 'pub_crawl', 'private_events', 'patio'))
);
--> statement-breakpoint
CREATE TABLE "venue_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid,
	"content_key" text NOT NULL,
	"content" text NOT NULL,
	"label" text,
	CONSTRAINT "venue_content_venue_key_unique" UNIQUE("venue_id","content_key")
);
--> statement-breakpoint
CREATE TABLE "venues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"logo_url" text,
	"tagline" text,
	"address" text,
	"phone" text,
	"email" text,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "venues_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"venue_id" uuid NOT NULL,
	"title" text NOT NULL,
	"video_url" text NOT NULL,
	"thumbnail_url" text,
	"performer_id" uuid,
	"event_id" uuid,
	"is_featured" boolean DEFAULT false,
	"display_order" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_performer_id_performers_id_fk" FOREIGN KEY ("performer_id") REFERENCES "public"."performers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gallery_images" ADD CONSTRAINT "gallery_images_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operating_hours" ADD CONSTRAINT "operating_hours_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "special_offerings" ADD CONSTRAINT "special_offerings_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venue_content" ADD CONSTRAINT "venue_content_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_performer_id_performers_id_fk" FOREIGN KEY ("performer_id") REFERENCES "public"."performers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "deals_venue_id_idx" ON "deals" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "deals_is_active_idx" ON "deals" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "deals_display_order_idx" ON "deals" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "events_venue_id_idx" ON "events" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "events_performer_id_idx" ON "events" USING btree ("performer_id");--> statement-breakpoint
CREATE INDEX "events_event_date_idx" ON "events" USING btree ("event_date");--> statement-breakpoint
CREATE INDEX "gallery_images_venue_id_idx" ON "gallery_images" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "gallery_images_event_id_idx" ON "gallery_images" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "gallery_images_display_order_idx" ON "gallery_images" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "instagram_posts_timestamp_idx" ON "instagram_posts" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "instagram_posts_is_visible_idx" ON "instagram_posts" USING btree ("is_visible");--> statement-breakpoint
CREATE INDEX "instagram_posts_display_order_idx" ON "instagram_posts" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "operating_hours_venue_id_idx" ON "operating_hours" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "operating_hours_display_order_idx" ON "operating_hours" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "posts_venue_id_idx" ON "posts" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "posts_is_published_idx" ON "posts" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "posts_published_at_idx" ON "posts" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "special_offerings_venue_id_idx" ON "special_offerings" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "special_offerings_display_order_idx" ON "special_offerings" USING btree ("display_order");--> statement-breakpoint
CREATE INDEX "special_offerings_is_active_idx" ON "special_offerings" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "venue_content_venue_id_idx" ON "venue_content" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "videos_venue_id_idx" ON "videos" USING btree ("venue_id");--> statement-breakpoint
CREATE INDEX "videos_performer_id_idx" ON "videos" USING btree ("performer_id");--> statement-breakpoint
CREATE INDEX "videos_event_id_idx" ON "videos" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "videos_display_order_idx" ON "videos" USING btree ("display_order");