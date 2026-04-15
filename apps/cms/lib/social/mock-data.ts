import { PlatformId } from './platform-styles';

export type Platform = {
  id: PlatformId;
  name: string;
  handle: string;
  color: string;
  connected: boolean;
  followers: number;
  following: number;
  postCount: number;
  avgEngagement: number;
  lastSync: string;
};

export type ScheduledPost = {
  id: string;
  content: string;
  mediaUrl?: string;
  scheduledAt: string;
  platforms: PlatformId[];
  platformOverrides: Partial<Record<PlatformId, string>>;
  status: 'scheduled' | 'published' | 'failed' | 'draft';
  createdAt: string;
};

export type PublishedPost = {
  id: string;
  platform: PlatformId;
  content: string;
  publishedAt: string;
  mediaUrl?: string;
  stats: { reach: number; likes: number; comments: number; shares: number };
};

export type AISuggestion = {
  id: string;
  topic: string;
  caption: string;
  hashtags: string[];
  suggestedPlatforms: PlatformId[];
  bestTimeToPost: string;
  tone: 'professional' | 'casual' | 'playful' | 'urgent';
  estimatedReach: number;
};

export type ActivityItem = {
  id: string;
  type: 'published' | 'scheduled' | 'failed' | 'connected' | 'ai_generated';
  message: string;
  platform?: PlatformId;
  timestamp: string;
};

// ── Platforms ────────────────────────────────────────────────────────────────
export const MOCK_PLATFORMS: Platform[] = [
  {
    id: 'twitter',
    name: 'X (Twitter)',
    handle: '@robroy_konfusion',
    color: '#000000',
    connected: true,
    followers: 4821,
    following: 312,
    postCount: 1204,
    avgEngagement: 3.2,
    lastSync: '2026-04-15T10:30:00Z',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@robroykonfusion',
    color: '#E1306C',
    connected: true,
    followers: 12540,
    following: 480,
    postCount: 342,
    avgEngagement: 5.8,
    lastSync: '2026-04-15T09:45:00Z',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Rob Roy & Konfusion',
    color: '#0077B5',
    connected: true,
    followers: 2310,
    following: 156,
    postCount: 89,
    avgEngagement: 4.1,
    lastSync: '2026-04-15T08:20:00Z',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Rob Roy & Konfusion',
    color: '#1877F2',
    connected: true,
    followers: 8940,
    following: 220,
    postCount: 567,
    avgEngagement: 2.9,
    lastSync: '2026-04-15T11:00:00Z',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@robroykonfusion',
    color: '#010101',
    connected: true,
    followers: 6230,
    following: 94,
    postCount: 128,
    avgEngagement: 8.4,
    lastSync: '2026-04-15T07:15:00Z',
  },
];

// ── Scheduled Posts (30 posts spread over 45 days) ──────────────────────────
const now = new Date('2026-04-15T12:00:00Z');
function daysFromNow(d: number, hour = 18, minute = 0): string {
  const dt = new Date(now);
  dt.setDate(dt.getDate() + d);
  dt.setHours(hour, minute, 0, 0);
  return dt.toISOString();
}

const postTemplates = [
  { content: "🎉 Tonight's lineup is absolutely fire! Doors open at 9PM. Don't miss DJ Shadow and the crew. #NightLife #Edinburgh", platforms: ['twitter', 'instagram', 'facebook'] as PlatformId[] },
  { content: "VIP tables available for this weekend's events. Book now via the link in bio. Limited spots! 🥂", platforms: ['instagram', 'facebook'] as PlatformId[] },
  { content: "Happy hour runs 5–8PM every weekday at Rob Roy. Craft cocktails from £8. Come unwind with us. 🍸", platforms: ['twitter', 'facebook'] as PlatformId[] },
  { content: "New performer joining us next Friday! Big announcement dropping Thursday — stay tuned 👀 #KonfusionNightclub", platforms: ['twitter', 'instagram'] as PlatformId[] },
  { content: "Our Saturday night at Konfusion is the hottest ticket in Edinburgh right now. Grab yours before they're gone! 🔥", platforms: ['instagram', 'facebook', 'tiktok'] as PlatformId[] },
  { content: "Behind the scenes: setting up for tonight's event. The energy in here is unreal 🎧 #BehindTheScenes", platforms: ['tiktok', 'instagram'] as PlatformId[] },
  { content: "Throwback to last week's incredible night at Rob Roy. The dance floor was electric ⚡ #TBT", platforms: ['instagram', 'facebook', 'twitter'] as PlatformId[] },
  { content: "Industry Night every Tuesday — discounted admission for hospitality workers. Show your ID at the door. 🍻", platforms: ['facebook', 'twitter'] as PlatformId[] },
  { content: "We're hiring! Looking for experienced bartenders and door staff. DM us or email jobs@robroy.co.uk 📩", platforms: ['linkedin', 'facebook', 'twitter'] as PlatformId[] },
  { content: "Live music this Sunday! Acoustic sets from 7PM. No cover charge. Perfect Sunday vibes 🎸", platforms: ['instagram', 'facebook'] as PlatformId[] },
];

export const MOCK_SCHEDULED_POSTS: ScheduledPost[] = Array.from({ length: 30 }, (_, i) => {
  const template = postTemplates[i % postTemplates.length];
  const daysOffset = Math.floor(i * 1.5); // spread over 45 days
  return {
    id: `sched-${i + 1}`,
    content: template.content,
    scheduledAt: daysFromNow(daysOffset, 12 + (i % 8), (i % 4) * 15),
    platforms: template.platforms,
    platformOverrides: {},
    status: i < 3 ? 'draft' : 'scheduled',
    createdAt: new Date(now.getTime() - i * 3600000).toISOString(),
  };
});

// ── Published Posts (120 posts) ──────────────────────────────────────────────
const platforms: PlatformId[] = ['twitter', 'instagram', 'linkedin', 'facebook', 'tiktok'];
const publishedContents = [
  "Last night was absolutely incredible! Thank you to everyone who came out 🙌",
  "DJ set highlights from the weekend — watch the full video on our story",
  "Cheers to another sold-out night at Konfusion 🥂 #Edinburgh #Nightlife",
  "The crowd was unreal tonight. Edinburgh never disappoints ❤️",
  "Upcoming events this month — swipe to see what's on! 📅",
  "New cocktail menu dropping next week. Want a sneak peek? 👀",
  "Open till 3AM this Friday and Saturday. Come party with us 🎉",
  "Happy to announce our new residency with DJ Pulse every Thursday 🎧",
];

export const MOCK_PUBLISHED_POSTS: PublishedPost[] = Array.from({ length: 120 }, (_, i) => ({
  id: `pub-${i + 1}`,
  platform: platforms[i % platforms.length],
  content: publishedContents[i % publishedContents.length],
  publishedAt: new Date(now.getTime() - (i + 1) * 86400000 * 0.5).toISOString(),
  stats: {
    reach: 800 + Math.floor(Math.sin(i) * 600 + Math.random() * 400),
    likes: 40 + Math.floor(Math.cos(i) * 30 + Math.random() * 60),
    comments: 3 + Math.floor(Math.random() * 18),
    shares: 2 + Math.floor(Math.random() * 25),
  },
}));

// ── AI Suggestions (8 cards) ─────────────────────────────────────────────────
export const MOCK_AI_SUGGESTIONS: AISuggestion[] = [
  {
    id: 'ai-1',
    topic: 'Weekend Event Hype',
    caption: "The weekend is almost here 🎉 Join us at Rob Roy for an unforgettable night of music, cocktails, and vibes. Doors open 9PM — who's coming?",
    hashtags: ['#Edinburgh', '#NightLife', '#RobRoy', '#WeekendVibes', '#Cocktails'],
    suggestedPlatforms: ['twitter', 'instagram', 'facebook'],
    bestTimeToPost: 'Thursday 6:00 PM',
    tone: 'playful',
    estimatedReach: 8400,
  },
  {
    id: 'ai-2',
    topic: 'New Performer Announcement',
    caption: "We're thrilled to welcome [Performer Name] to the Konfusion stage this Friday! Tickets available at the door. This is one night you won't want to miss. 🎧",
    hashtags: ['#Konfusion', '#LiveMusic', '#Edinburgh', '#NewAct'],
    suggestedPlatforms: ['instagram', 'facebook', 'twitter'],
    bestTimeToPost: 'Wednesday 12:00 PM',
    tone: 'professional',
    estimatedReach: 6200,
  },
  {
    id: 'ai-3',
    topic: 'Happy Hour Promotion',
    caption: "Your workday deserves a proper ending 🍸 Happy hour at Rob Roy — premium cocktails from £8, Mon–Fri 5–8PM. Because you earned it.",
    hashtags: ['#HappyHour', '#Edinburgh', '#Cocktails', '#AfterWork'],
    suggestedPlatforms: ['facebook', 'instagram'],
    bestTimeToPost: 'Monday 4:00 PM',
    tone: 'casual',
    estimatedReach: 5800,
  },
  {
    id: 'ai-4',
    topic: 'Behind the Scenes',
    caption: "Ever wonder what goes into running Edinburgh's favourite nightclub? We're giving you an all-access pass 🎬 Swipe to see how the magic happens before doors open.",
    hashtags: ['#BehindTheScenes', '#Edinburgh', '#Nightclub', '#TeamRobRoy'],
    suggestedPlatforms: ['instagram', 'tiktok'],
    bestTimeToPost: 'Sunday 3:00 PM',
    tone: 'casual',
    estimatedReach: 9100,
  },
  {
    id: 'ai-5',
    topic: 'VIP Table Booking',
    caption: "Treat yourself to the VIP experience 🥂 Private tables, bottle service, and priority entry. Limited availability — book via the link in our bio before they're gone.",
    hashtags: ['#VIP', '#BottleService', '#Edinburgh', '#LuxuryNightlife'],
    suggestedPlatforms: ['instagram', 'facebook'],
    bestTimeToPost: 'Friday 2:00 PM',
    tone: 'professional',
    estimatedReach: 4300,
  },
  {
    id: 'ai-6',
    topic: 'Throwback Friday',
    caption: "Throwing it back to one of our most iconic nights 🔥 The memories from this night are still going strong. Drop a 🙋 if you were there!",
    hashtags: ['#TBT', '#Edinburgh', '#Memories', '#NightLife', '#Konfusion'],
    suggestedPlatforms: ['instagram', 'facebook', 'twitter'],
    bestTimeToPost: 'Friday 10:00 AM',
    tone: 'playful',
    estimatedReach: 7600,
  },
  {
    id: 'ai-7',
    topic: 'Industry Night Tuesday',
    caption: "To every bartender, chef, and hospitality hero out there — Tuesday nights are yours 🍻 Show your industry ID for discounted entry. You deserve a night off too.",
    hashtags: ['#IndustryNight', '#Hospitality', '#Edinburgh', '#TuesdayVibes'],
    suggestedPlatforms: ['twitter', 'facebook'],
    bestTimeToPost: 'Sunday 5:00 PM',
    tone: 'casual',
    estimatedReach: 3900,
  },
  {
    id: 'ai-8',
    topic: 'Monthly Event Roundup',
    caption: "April is packed with unmissable events at Rob Roy & Konfusion 📅 From live music to DJ nights and themed parties — here's everything happening this month. Save this post!",
    hashtags: ['#April', '#Edinburgh', '#Events', '#NightLife', '#WhatsOn'],
    suggestedPlatforms: ['instagram', 'facebook', 'linkedin'],
    bestTimeToPost: 'Monday 9:00 AM',
    tone: 'professional',
    estimatedReach: 11200,
  },
];

// ── Activity Feed (14 items) ──────────────────────────────────────────────────
export const MOCK_ACTIVITY: ActivityItem[] = [
  { id: 'act-1', type: 'published', message: 'Post published to Instagram', platform: 'instagram', timestamp: new Date(now.getTime() - 15 * 60000).toISOString() },
  { id: 'act-2', type: 'published', message: 'Post published to Twitter', platform: 'twitter', timestamp: new Date(now.getTime() - 15 * 60000).toISOString() },
  { id: 'act-3', type: 'scheduled', message: 'New post scheduled for Friday 6PM', platform: 'facebook', timestamp: new Date(now.getTime() - 42 * 60000).toISOString() },
  { id: 'act-4', type: 'ai_generated', message: 'AI generated 3 content suggestions', timestamp: new Date(now.getTime() - 90 * 60000).toISOString() },
  { id: 'act-5', type: 'published', message: 'Post published to Facebook', platform: 'facebook', timestamp: new Date(now.getTime() - 2.5 * 3600000).toISOString() },
  { id: 'act-6', type: 'failed', message: 'TikTok post failed — media too large', platform: 'tiktok', timestamp: new Date(now.getTime() - 3 * 3600000).toISOString() },
  { id: 'act-7', type: 'scheduled', message: '5 posts queued for next week', timestamp: new Date(now.getTime() - 5 * 3600000).toISOString() },
  { id: 'act-8', type: 'published', message: 'Post published to LinkedIn', platform: 'linkedin', timestamp: new Date(now.getTime() - 8 * 3600000).toISOString() },
  { id: 'act-9', type: 'connected', message: 'TikTok account reconnected', platform: 'tiktok', timestamp: new Date(now.getTime() - 24 * 3600000).toISOString() },
  { id: 'act-10', type: 'published', message: 'Post published to Instagram', platform: 'instagram', timestamp: new Date(now.getTime() - 26 * 3600000).toISOString() },
  { id: 'act-11', type: 'ai_generated', message: 'Weekend event content adapted for 5 platforms', timestamp: new Date(now.getTime() - 30 * 3600000).toISOString() },
  { id: 'act-12', type: 'scheduled', message: 'Monthly event roundup scheduled', platform: 'facebook', timestamp: new Date(now.getTime() - 48 * 3600000).toISOString() },
  { id: 'act-13', type: 'published', message: 'Post published to Twitter', platform: 'twitter', timestamp: new Date(now.getTime() - 50 * 3600000).toISOString() },
  { id: 'act-14', type: 'published', message: 'Post published to Facebook', platform: 'facebook', timestamp: new Date(now.getTime() - 72 * 3600000).toISOString() },
];
