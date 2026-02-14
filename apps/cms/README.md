# CMS (Sanity Studio)

This app provides a marketing CMS for the website.

## Environment

Copy `.env.example` to `.env.local` and set values:

```bash
cp .env.example .env.local
```

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

## Scripts

```bash
pnpm dev:cms
pnpm build:cms
```

## Included starter schemas

- `siteSettings`
- `marketingPage`
- reusable objects: `ctaLink`, `highlightCard`

These are intentionally minimal and ready to be expanded with your detailed CMS design requirements.
