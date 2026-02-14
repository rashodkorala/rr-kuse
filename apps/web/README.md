# Web App

Next.js marketing website for RR Kuse.

## Run from monorepo root

```bash
pnpm dev:web
```

## Connect to Sanity content

```bash
cp apps/web/.env.example apps/web/.env.local
```

Set values in `apps/web/.env.local`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

The app reads `siteSettings` for SEO defaults and announcement content.

## Build

```bash
pnpm build:web
```

## Notes

- Default UI mode is now dark.
- Accent themes:
  - Rob Roy => orange
  - Konfusion => purple
