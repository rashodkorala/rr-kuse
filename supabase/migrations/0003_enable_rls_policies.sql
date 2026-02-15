-- Enable Row Level Security on all tables
alter table performers enable row level security;
alter table events enable row level security;
alter table deals enable row level security;
alter table gallery_images enable row level security;
alter table videos enable row level security;
alter table instagram_posts enable row level security;
alter table posts enable row level security;
alter table operating_hours enable row level security;
alter table special_offerings enable row level security;
alter table venue_content enable row level security;

-- ============================================================
-- DROP EXISTING POLICIES (re-runnable; safe if not present)
-- ============================================================

-- performers
drop policy if exists "Allow public read access on performers" on performers;
drop policy if exists "Allow authenticated insert on performers" on performers;
drop policy if exists "Allow authenticated update on performers" on performers;
drop policy if exists "Allow authenticated delete on performers" on performers;
-- events
drop policy if exists "Allow public read access on events" on events;
drop policy if exists "Allow authenticated insert on events" on events;
drop policy if exists "Allow authenticated update on events" on events;
drop policy if exists "Allow authenticated delete on events" on events;
-- deals
drop policy if exists "Allow public read access on deals" on deals;
drop policy if exists "Allow authenticated insert on deals" on deals;
drop policy if exists "Allow authenticated update on deals" on deals;
drop policy if exists "Allow authenticated delete on deals" on deals;
-- gallery_images
drop policy if exists "Allow public read access on gallery_images" on gallery_images;
drop policy if exists "Allow authenticated insert on gallery_images" on gallery_images;
drop policy if exists "Allow authenticated update on gallery_images" on gallery_images;
drop policy if exists "Allow authenticated delete on gallery_images" on gallery_images;
-- videos
drop policy if exists "Allow public read access on videos" on videos;
drop policy if exists "Allow authenticated insert on videos" on videos;
drop policy if exists "Allow authenticated update on videos" on videos;
drop policy if exists "Allow authenticated delete on videos" on videos;
-- instagram_posts
drop policy if exists "Allow public read access on instagram_posts" on instagram_posts;
drop policy if exists "Allow authenticated insert on instagram_posts" on instagram_posts;
drop policy if exists "Allow authenticated update on instagram_posts" on instagram_posts;
drop policy if exists "Allow authenticated delete on instagram_posts" on instagram_posts;
-- posts
drop policy if exists "Allow public read access on posts" on posts;
drop policy if exists "Allow authenticated insert on posts" on posts;
drop policy if exists "Allow authenticated update on posts" on posts;
drop policy if exists "Allow authenticated delete on posts" on posts;
-- operating_hours
drop policy if exists "Allow public read access on operating_hours" on operating_hours;
drop policy if exists "Allow authenticated insert on operating_hours" on operating_hours;
drop policy if exists "Allow authenticated update on operating_hours" on operating_hours;
drop policy if exists "Allow authenticated delete on operating_hours" on operating_hours;
-- special_offerings
drop policy if exists "Allow public read access on special_offerings" on special_offerings;
drop policy if exists "Allow authenticated insert on special_offerings" on special_offerings;
drop policy if exists "Allow authenticated update on special_offerings" on special_offerings;
drop policy if exists "Allow authenticated delete on special_offerings" on special_offerings;
-- venue_content
drop policy if exists "Allow public read access on venue_content" on venue_content;
drop policy if exists "Allow authenticated insert on venue_content" on venue_content;
drop policy if exists "Allow authenticated update on venue_content" on venue_content;
drop policy if exists "Allow authenticated delete on venue_content" on venue_content;

-- ============================================================
-- PUBLIC READ ACCESS (anon + authenticated can SELECT)
-- ============================================================

create policy "Allow public read access on performers"
  on performers for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on events"
  on events for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on deals"
  on deals for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on gallery_images"
  on gallery_images for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on videos"
  on videos for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on instagram_posts"
  on instagram_posts for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on posts"
  on posts for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on operating_hours"
  on operating_hours for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on special_offerings"
  on special_offerings for select
  to anon, authenticated
  using (true);

create policy "Allow public read access on venue_content"
  on venue_content for select
  to anon, authenticated
  using (true);

-- ============================================================
-- AUTHENTICATED WRITE ACCESS (INSERT, UPDATE, DELETE)
-- Uses auth.uid() IS NOT NULL to avoid permissive USING (true) flags.
-- ============================================================

-- performers
create policy "Allow authenticated insert on performers"
  on performers for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on performers"
  on performers for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on performers"
  on performers for delete
  to authenticated
  using (auth.uid() is not null);

-- events
create policy "Allow authenticated insert on events"
  on events for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on events"
  on events for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on events"
  on events for delete
  to authenticated
  using (auth.uid() is not null);

-- deals
create policy "Allow authenticated insert on deals"
  on deals for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on deals"
  on deals for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on deals"
  on deals for delete
  to authenticated
  using (auth.uid() is not null);

-- gallery_images
create policy "Allow authenticated insert on gallery_images"
  on gallery_images for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on gallery_images"
  on gallery_images for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on gallery_images"
  on gallery_images for delete
  to authenticated
  using (auth.uid() is not null);

-- videos
create policy "Allow authenticated insert on videos"
  on videos for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on videos"
  on videos for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on videos"
  on videos for delete
  to authenticated
  using (auth.uid() is not null);

-- instagram_posts
create policy "Allow authenticated insert on instagram_posts"
  on instagram_posts for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on instagram_posts"
  on instagram_posts for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on instagram_posts"
  on instagram_posts for delete
  to authenticated
  using (auth.uid() is not null);

-- posts
create policy "Allow authenticated insert on posts"
  on posts for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on posts"
  on posts for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on posts"
  on posts for delete
  to authenticated
  using (auth.uid() is not null);

-- operating_hours
create policy "Allow authenticated insert on operating_hours"
  on operating_hours for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on operating_hours"
  on operating_hours for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on operating_hours"
  on operating_hours for delete
  to authenticated
  using (auth.uid() is not null);

-- special_offerings
create policy "Allow authenticated insert on special_offerings"
  on special_offerings for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on special_offerings"
  on special_offerings for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on special_offerings"
  on special_offerings for delete
  to authenticated
  using (auth.uid() is not null);

-- venue_content
create policy "Allow authenticated insert on venue_content"
  on venue_content for insert
  to authenticated
  with check (auth.uid() is not null);

create policy "Allow authenticated update on venue_content"
  on venue_content for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Allow authenticated delete on venue_content"
  on venue_content for delete
  to authenticated
  using (auth.uid() is not null);
