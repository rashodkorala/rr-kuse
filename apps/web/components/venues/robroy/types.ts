import type { DrinkDeal } from '@/components/shared/drinkDealsSection';
import type { InstagramPost } from '@/components/shared/instagramFeed';
import type { Performer } from '@/components/shared/performerCard';

export interface EventItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  day: string;
  month: string;
  time: string;
  price?: string;
  isPast?: boolean;
  isSoldOut?: boolean;
  recurringLabel?: string;
  recurringThisWeek?: string;
  recurringNextWeek?: string;
}

export interface GalleryPhoto {
  url: string;
  caption?: string;
}

export interface RobRoyContentProps {
  upcomingEvents: EventItem[];
  pastEvents: EventItem[];
  performers: Performer[];
  deals: DrinkDeal[];
  gallery: GalleryPhoto[];
  instagramPosts: InstagramPost[];
}
