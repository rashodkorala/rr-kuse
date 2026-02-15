# CMS Dashboard (Next.js + Supabase)

This app is a custom CMS dashboard built with Next.js, Drizzle ORM, and Supabase Postgres.

## Environment

Create `apps/cms/.env.local`:

```bash
SUPABASE_DB_URL=postgres://...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
INSTAGRAM_ACCESS_TOKEN=...
```

## Scripts

```bash
pnpm dev:cms
pnpm build:cms
pnpm --filter @rr-kuse/cms lint
pnpm --filter @rr-kuse/cms db:generate
pnpm --filter @rr-kuse/cms db:migrate
```

## Schema + migrations

- Drizzle schema: `apps/cms/lib/db/schema.ts`
- Drizzle config: `apps/cms/drizzle.config.ts`
- SQL migrations: `supabase/migrations`

Apply migrations to your Supabase database before using the dashboard.

## Managed CMS sections

- Venue switcher (Rob Roy / Konfusion)
- Venues
- Performers (shared)
- Events (venue-specific, recurring day support)
- Drink deals (venue-specific)
- Gallery images (venue-specific)
- Videos (venue-specific)
- Instagram feed (shared, with sync + visibility controls)
- Blog posts (venue-specific or global)
- Operating hours (venue-specific)
- Special offerings (venue-specific)
- Venue content (static key/value content)

## Instagram sync

- Manual sync from the dashboard button.
- Optional API route for cron integrations:
  - `POST /api/instagram/sync`
