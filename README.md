# RR Kuse Monorepo

This repository is now a pnpm workspace monorepo with:

- `apps/web` - Next.js marketing website
- `apps/cms` - Next.js CMS dashboard backed by Supabase
- `packages/ui` - shared shadcn-style UI components

## Prerequisites

- Node.js 20+
- pnpm 10+

## Install

```bash
pnpm install
```

## Run apps

```bash
pnpm dev:web
pnpm dev:cms
```

## Build

```bash
pnpm build:web
pnpm build:cms
```

## Notes

- Web now defaults to **dark theme**.
- Accent themes are preserved:
  - Rob Roy => orange accent
  - Konfusion => purple accent
- CMS now manages venues, performers, events, deals, gallery/videos, Instagram feed, posts, hours, special offerings, and static venue content using Drizzle + Supabase.
