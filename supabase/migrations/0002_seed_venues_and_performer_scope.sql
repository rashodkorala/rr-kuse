alter table performers
  add column if not exists venue_tag text default 'both';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'performers_venue_tag_check'
  ) then
    alter table performers
      add constraint performers_venue_tag_check
      check (venue_tag in ('rob_roy', 'konfusion', 'both'));
  end if;
end $$;

create index if not exists performers_venue_tag_idx on performers(venue_tag);

insert into venues (name, slug, tagline, is_active)
values
  ('Rob Roy', 'rob-roy', 'We Install & Service Hangovers', true),
  ('Konfusion', 'konfusion', 'What''s Happening?', true)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  is_active = true;
