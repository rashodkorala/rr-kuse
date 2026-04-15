 Social Media Management Platform — Built into CMS                                                                    │
│                                                                                                                      │
│ Context                                                                                                              │
│                                                                                                                      │
│ Add a "Social" section to the existing CMS app (apps/cms/) that demonstrates a "single source of truth" content      │
│ workflow: write one post, use Claude AI to adapt it per-platform, preview each platform's rendering, and             │
│ schedule/publish to Twitter/X, Instagram, LinkedIn, Facebook, and TikTok — all with mock data (no real social APIs). │
│  Screenshot-ready frontend only.                                                                                     │
│                                                                                                                      │
│ The CMS runs at port 3333. No new app is created — everything lives inside apps/cms/.                                │
│                                                                                                                      │
│ ---                                                                                                                  │
│ What Gets Added to apps/cms/                                                                                         │
│                                                                                                                      │
│ New Routes (inside app/(dashboard)/)                                                                                 │
│                                                                                                                      │
│ app/(dashboard)/                                                                                                     │
│   social/                                                                                                            │
│     page.tsx                  # redirect → /social/dashboard                                                         │
│     dashboard/page.tsx        # Analytics overview                                                                   │
│     compose/page.tsx          # Content composer (flagship)                                                          │
│     calendar/page.tsx         # Scheduled posts calendar                                                             │
│     platforms/page.tsx        # Platform connection status                                                           │
│     history/page.tsx          # Post history table                                                                   │
│     ai-suggestions/page.tsx   # Claude-powered content ideas                                                         │
│ app/api/                                                                                                             │
│   claude/route.ts             # Claude API route (+ mock fallback)                                                   │
│                                                                                                                      │
│ New Components (inside components/social/)                                                                           │
│                                                                                                                      │
│ components/social/                                                                                                   │
│   shared/                                                                                                            │
│     PlatformIcon.tsx          # SVG icons + brand colors per platform                                                │
│     CharacterCounter.tsx      # Platform-aware char limits                                                           │
│     MockBadge.tsx             # "DEMO" pill on previews                                                              │
│   dashboard/                                                                                                         │
│     StatsGrid.tsx             # 4 metric cards with trend indicators                                                 │
│     PlatformHealthRow.tsx     # 5 platform status pills                                                              │
│     ScheduledPostsPreview.tsx                                                                                        │
│     RecentActivityFeed.tsx                                                                                           │
│   compose/                                                                                                           │
│     ComposerEditor.tsx        # Main textarea + AI button                                                            │
│     PlatformToggleBar.tsx     # Toggle which platforms receive the post                                              │
│     PlatformPreviewPanel.tsx  # Tabbed realistic mock previews (all 5 platforms)                                     │
│     AIAdaptationPanel.tsx     # Claude-adapted per-platform versions                                                 │
│     ScheduleModal.tsx         # Date/time picker + confirm                                                           │
│   calendar/                                                                                                          │
│     CalendarToolbar.tsx                                                                                              │
│     CalendarGrid.tsx          # Pure CSS 7×5 grid, no calendar lib                                                   │
│     DayDetailPanel.tsx                                                                                               │
│   platforms/                                                                                                         │
│     PlatformCard.tsx                                                                                                 │
│     PlatformStatsBar.tsx                                                                                             │
│   history/                                                                                                           │
│     PostHistoryTable.tsx                                                                                             │
│     PostDetailModal.tsx                                                                                              │
│   ai/                                                                                                                │
│     GenerateSuggestionsPanel.tsx                                                                                     │
│     SuggestionFeed.tsx                                                                                               │
│     AILoadingState.tsx                                                                                               │
│                                                                                                                      │
│ New Lib Files (inside lib/)                                                                                          │
│                                                                                                                      │
│ lib/                                                                                                                 │
│   social/                                                                                                            │
│     mock-data.ts        # All seed data                                                                              │
│     platform-styles.ts  # Brand colors / char limits per platform                                                    │
│     posts-context.tsx   # React Context for in-session post mutations                                                │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Sidebar Update                                                                                                       │
│                                                                                                                      │
│ Update apps/cms/components/cms/app-sidebar.tsx — add a "Social" group to navMain:                                    │
│                                                                                                                      │
│ // Add to navMain array (or as a new navSocial section):                                                             │
│ { title: "Social Dashboard", url: "/social/dashboard", icon: BarChart3 },                                            │
│ { title: "Compose", url: "/social/compose", icon: PenSquare },                                                       │
│ { title: "Calendar", url: "/social/calendar", icon: CalendarDays },                                                  │
│ { title: "Platforms", url: "/social/platforms", icon: Share2 },                                                      │
│ { title: "Post History", url: "/social/history", icon: ClockHistory },                                               │
│ { title: "AI Suggestions", url: "/social/ai-suggestions", icon: Sparkles },                                          │
│                                                                                                                      │
│ Update apps/cms/components/cms/site-header.tsx titleMap — add all /social/* routes.                                  │
│                                                                                                                      │
│ ---                                                                                                                  │
│ New Dependency                                                                                                       │
│                                                                                                                      │
│ Add to apps/cms/package.json:                                                                                        │
│ "@anthropic-ai/sdk": "^0.52.0",                                                                                      │
│ "@radix-ui/react-tabs": "^1.1.13",                                                                                   │
│ "framer-motion": "^12.23.25"                                                                                         │
│                                                                                                                      │
│ (framer-motion is already in web app so it's available in the monorepo; tabs and anthropic sdk need to be added to   │
│ cms)                                                                                                                 │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Mock Data Schema (lib/social/mock-data.ts)                                                                           │
│                                                                                                                      │
│ type PlatformId = 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'tiktok';                                      │
│                                                                                                                      │
│ type Platform = {                                                                                                    │
│   id: PlatformId; name: string; handle: string;                                                                      │
│   color: string; connected: boolean;                                                                                 │
│   followers: number; following: number; postCount: number;                                                           │
│   avgEngagement: number; lastSync: string;                                                                           │
│ };                                                                                                                   │
│                                                                                                                      │
│ type ScheduledPost = {                                                                                               │
│   id: string; content: string; mediaUrl?: string;                                                                    │
│   scheduledAt: string; platforms: PlatformId[];                                                                      │
│   platformOverrides: Partial<Record<PlatformId, string>>;                                                            │
│   status: 'scheduled' | 'published' | 'failed' | 'draft';                                                            │
│   createdAt: string;                                                                                                 │
│ };                                                                                                                   │
│                                                                                                                      │
│ type PublishedPost = {                                                                                               │
│   id: string; platform: PlatformId;                                                                                  │
│   content: string; publishedAt: string; mediaUrl?: string;                                                           │
│   stats: { reach: number; likes: number; comments: number; shares: number; };                                        │
│ };                                                                                                                   │
│                                                                                                                      │
│ type AISuggestion = {                                                                                                │
│   id: string; topic: string; caption: string; hashtags: string[];                                                    │
│   suggestedPlatforms: PlatformId[]; bestTimeToPost: string;                                                          │
│   tone: 'professional' | 'casual' | 'playful' | 'urgent';                                                            │
│   estimatedReach: number;                                                                                            │
│ };                                                                                                                   │
│                                                                                                                      │
│ Seed counts: 5 platforms (all connected), 30 scheduled posts spread over 45 days, 120 published posts, 8 AI          │
│ suggestion cards, 14 activity feed items.                                                                            │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Claude API Route (app/api/claude/route.ts)                                                                           │
│                                                                                                                      │
│ Three modes via POST /api/claude:                                                                                    │
│ - adapt: source content + platforms → per-platform adapted text (respecting char limits: Twitter 280, LinkedIn 3000, │
│  etc.)                                                                                                               │
│ - suggest: topic + tone → array of content idea cards                                                                │
│ - optimize: post text → improved version + tips array                                                                │
│                                                                                                                      │
│ Fallback: If ANTHROPIC_API_KEY is absent, returns hardcoded realistic mock JSON — app works 100% without             │
│ credentials.                                                                                                         │
│                                                                                                                      │
│ Model: claude-sonnet-4-6                                                                                             │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Key Pages                                                                                                            │
│                                                                                                                      │
│ /social/dashboard                                                                                                    │
│                                                                                                                      │
│ StatsGrid (total reach, posts/week, avg engagement, scheduled count) + PlatformHealthRow (5 platform status pills) + │
│  ScheduledPostsPreview + RecentActivityFeed                                                                          │
│                                                                                                                      │
│ /social/compose ← flagship                                                                                           │
│                                                                                                                      │
│ ComposerEditor → PlatformToggleBar → PlatformPreviewPanel (tabs: Twitter card | Instagram post | LinkedIn article |  │
│ Facebook feed | TikTok phone frame) → AIAdaptationPanel → ScheduleModal                                              │
│                                                                                                                      │
│ /social/calendar                                                                                                     │
│                                                                                                                      │
│ Month grid (pure CSS), colored dots per day = scheduled posts, click day → DayDetailPanel sheet                      │
│                                                                                                                      │
│ /social/platforms                                                                                                    │
│                                                                                                                      │
│ PlatformCard × 5 with mock Connect/Disconnect toggle + follower stats                                                │
│                                                                                                                      │
│ /social/history                                                                                                      │
│                                                                                                                      │
│ Filterable table by platform + click row → PostDetailModal                                                           │
│                                                                                                                      │
│ /social/ai-suggestions                                                                                               │
│                                                                                                                      │
│ GenerateSuggestionsPanel (topic + tone) → SuggestionFeed masonry grid → "Use This" navigates to /social/compose with │
│  pre-filled content                                                                                                  │
│                                                                                                                      │
│ ---                                                                                                                  │
│ State Management                                                                                                     │
│                                                                                                                      │
│ PostsContext wraps the social route group layout (app/(dashboard)/social/layout.tsx), providing scheduled posts +    │
│ dispatch. Initialized from mock-data seed. All mutations are React state only (no DB). Simple fixed-position toast   │
│ div for feedback (no extra library).                                                                                 │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Files Modified (existing)                                                                                            │
│                                                                                                                      │
│ ┌─────────────────────────────────────────┬────────────────────────────────────────────────────────────┐             │
│ │                  File                   │                           Change                           │             │
│ ├─────────────────────────────────────────┼────────────────────────────────────────────────────────────┤             │
│ │ apps/cms/components/cms/app-sidebar.tsx │ Add Social nav items                                       │             │
│ ├─────────────────────────────────────────┼────────────────────────────────────────────────────────────┤             │
│ │ apps/cms/components/cms/site-header.tsx │ Add /social/* title mappings                               │             │
│ ├─────────────────────────────────────────┼────────────────────────────────────────────────────────────┤             │
│ │ apps/cms/package.json                   │ Add @anthropic-ai/sdk, @radix-ui/react-tabs, framer-motion │             │
│ └─────────────────────────────────────────┴────────────────────────────────────────────────────────────┘             │
│                                                                                                                      │
│ Files Created (new)                                                                                                  │
│                                                                                                                      │
│ All new files go in apps/cms/ — routes under app/(dashboard)/social/, components under components/social/, lib under │
│  lib/social/, API under app/api/claude/.                                                                             │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Implementation Order                                                                                                 │
│                                                                                                                      │
│ 1. Add dependencies to apps/cms/package.json + run install                                                           │
│ 2. Create lib/social/mock-data.ts, platform-styles.ts, posts-context.tsx                                             │
│ 3. Create components/social/shared/ (PlatformIcon, CharacterCounter, MockBadge)                                      │
│ 4. Update sidebar + site-header (add social nav items + title mappings)                                              │
│ 5. Create app/(dashboard)/social/layout.tsx (PostsContext provider)                                                  │
│ 6. Platforms page — stateless, establishes PlatformIcon pattern                                                      │
│ 7. Social Dashboard page — StatsGrid, PlatformHealthRow, previews, activity                                          │
│ 8. Calendar page — CalendarGrid + DayDetailPanel                                                                     │
│ 9. Claude API route — with mock fallback                                                                             │
│ 10. Compose page — PlatformPreviewPanel is the most complex piece                                                    │
│ 11. History page — table + detail modal                                                                              │
│ 12. AI Suggestions page — feed + panel                                                                               │
│                                                                                                                      │
│ ---                                                                                                                  │
│ Verification                                                                                                         │
│                                                                                                                      │
│ 1. Run pnpm dev:cms — CMS starts at http://localhost:3333                                                            │
│ 2. Sidebar shows Social section with 6 nav items                                                                     │
│ 3. All 6 social pages load with populated mock data                                                                  │
│ 4. Compose: toggle platforms → preview tabs update; "Adapt with AI" → per-platform text appears                      │
│ 5. Compose: "Schedule" → post appears in Calendar + Dashboard                                                        │
│ 6. Calendar: click day → DayDetailPanel shows posts                                                                  │
│ 7. Platforms: "Disconnect" toggles status                                                                            │
│ 8. AI Suggestions: "Generate Ideas" → feed populates; "Use This" → /social/compose pre-filled                        │
│ 9. All pages render cleanly in dark mode for screenshots