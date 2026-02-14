# RR Kuse Monorepo

This repository is now a pnpm workspace monorepo with:

- `apps/web` - Next.js marketing website
- `apps/cms` - Sanity Studio CMS for marketing content

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
- CMS is scaffolded for marketing content and can be expanded with your upcoming design/content model details.
