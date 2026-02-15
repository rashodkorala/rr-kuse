create extension if not exists "pgcrypto";

create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  logo_url text,
  tagline text,
  address text,
  phone text,
  email text,
  is_active boolean default true
);

create table if not exists performers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  performer_type text not null check (performer_type in ('band', 'dj', 'solo_artist')),
  bio text,
  genre text,
  profile_image_url text,
  instagram_handle text,
  spotify_url text,
  soundcloud_url text,
  is_featured boolean default false,
  is_alumni boolean default false
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  title text not null,
  description text,
  event_date timestamptz not null,
  start_time text,
  end_time text,
  performer_id uuid references performers(id) on delete set null,
  event_type text,
  cover_charge text,
  poster_image_url text,
  status text default 'published' check (status in ('draft', 'published', 'cancelled')),
  recurring_day text
);
create index if not exists events_venue_id_idx on events(venue_id);
create index if not exists events_performer_id_idx on events(performer_id);
create index if not exists events_event_date_idx on events(event_date);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  title text not null,
  description text not null,
  day_of_week text,
  start_time text,
  end_time text,
  is_active boolean default true,
  image_url text,
  display_order integer default 0
);
create index if not exists deals_venue_id_idx on deals(venue_id);
create index if not exists deals_is_active_idx on deals(is_active);
create index if not exists deals_display_order_idx on deals(display_order);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  image_url text not null,
  caption text,
  event_id uuid references events(id) on delete set null,
  category text,
  is_featured boolean default false,
  display_order integer default 0
);
create index if not exists gallery_images_venue_id_idx on gallery_images(venue_id);
create index if not exists gallery_images_event_id_idx on gallery_images(event_id);
create index if not exists gallery_images_display_order_idx on gallery_images(display_order);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  title text not null,
  video_url text not null,
  thumbnail_url text,
  performer_id uuid references performers(id) on delete set null,
  event_id uuid references events(id) on delete set null,
  is_featured boolean default false,
  display_order integer default 0
);
create index if not exists videos_venue_id_idx on videos(venue_id);
create index if not exists videos_performer_id_idx on videos(performer_id);
create index if not exists videos_event_id_idx on videos(event_id);
create index if not exists videos_display_order_idx on videos(display_order);

create table if not exists instagram_posts (
  id uuid primary key default gen_random_uuid(),
  instagram_id text not null unique,
  image_url text not null,
  caption text,
  permalink text not null,
  timestamp timestamptz not null,
  is_visible boolean default true,
  venue_tag text check (venue_tag is null or venue_tag in ('rob_roy', 'konfusion', 'both')),
  display_order integer default 0
);
create index if not exists instagram_posts_timestamp_idx on instagram_posts(timestamp);
create index if not exists instagram_posts_is_visible_idx on instagram_posts(is_visible);
create index if not exists instagram_posts_display_order_idx on instagram_posts(display_order);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete set null,
  title text not null,
  content text not null,
  excerpt text,
  image_url text,
  is_published boolean default true,
  published_at timestamptz
);
create index if not exists posts_venue_id_idx on posts(venue_id);
create index if not exists posts_is_published_idx on posts(is_published);
create index if not exists posts_published_at_idx on posts(published_at);

create table if not exists operating_hours (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  day_of_week text not null,
  open_time text,
  close_time text,
  is_closed boolean default false,
  display_order integer default 0,
  constraint operating_hours_venue_day_unique unique (venue_id, day_of_week)
);
create index if not exists operating_hours_venue_id_idx on operating_hours(venue_id);
create index if not exists operating_hours_display_order_idx on operating_hours(display_order);

create table if not exists special_offerings (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references venues(id) on delete cascade,
  offering_type text not null check (offering_type in ('bus_crawl', 'pub_crawl', 'private_events', 'patio')),
  title text not null,
  description text not null,
  image_url text,
  cta_text text,
  cta_link text,
  is_active boolean default true,
  display_order integer default 0
);
create index if not exists special_offerings_venue_id_idx on special_offerings(venue_id);
create index if not exists special_offerings_is_active_idx on special_offerings(is_active);
create index if not exists special_offerings_display_order_idx on special_offerings(display_order);

create table if not exists venue_content (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete set null,
  content_key text not null,
  content text not null,
  label text,
  constraint venue_content_venue_key_unique unique (venue_id, content_key)
);
create index if not exists venue_content_venue_id_idx on venue_content(venue_id);
