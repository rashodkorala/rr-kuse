'use client';

import React from 'react';
import VenueNav from '@/components/shared/venueNav';
import InstagramFeed from '@/components/shared/instagramFeed';
import {
  KonfusionHero,
  KonfusionEventsSection,
  KonfusionDealsSection,
  KonfusionPerformersSection,
  KonfusionGallerySection,
  KonfusionAboutSection,
  KonfusionPatioSection,
  KonfusionContactSection,
  KonfusionFooter,
} from '@/components/venues/konfusion';
import type { KonfusionContentProps } from '@/components/venues/konfusion';

export default function KonfusionContent({
  upcomingEvents,
  pastEvents,
  performers,
  deals,
  gallery,
  instagramPosts,
}: KonfusionContentProps) {
  const hasInstagram = instagramPosts.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <VenueNav variant="konfusion" />

      <KonfusionHero />

      {hasInstagram && (
        <section className="bg-zinc-950">
          <InstagramFeed posts={instagramPosts} variant="konfusion" />
        </section>
      )}

      <KonfusionEventsSection upcomingEvents={upcomingEvents} pastEvents={pastEvents} />

      <KonfusionDealsSection deals={deals} />

      <KonfusionPerformersSection performers={performers} />

      <KonfusionGallerySection gallery={gallery} />

      <KonfusionAboutSection />

      <KonfusionPatioSection />

      <KonfusionContactSection />

      <KonfusionFooter />
    </div>
  );
}
