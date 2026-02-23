'use client';

import React from 'react';
import VenueNav from '@/components/shared/venueNav';
import InstagramFeed from '@/components/shared/instagramFeed';
import {
  RobRoyHero,
  RobRoyEventsSection,
  RobRoyDealsSection,
  RobRoyPerformersSection,
  RobRoyPatioSection,
  RobRoyGallerySection,
  RobRoyAboutSection,
  RobRoyContactSection,
  RobRoyFooter,
} from '@/components/venues/robroy';
import type { RobRoyContentProps } from '@/components/venues/robroy';

export default function RobRoyContent({
  upcomingEvents,
  pastEvents,
  performers,
  deals,
  gallery,
  instagramPosts,
}: RobRoyContentProps) {
  const hasInstagram = instagramPosts.length > 0;

  return (
    <div className="min-h-screen bg-black">
      <VenueNav variant="robroy" />

      <RobRoyHero />

      {hasInstagram && (
        <section className="bg-zinc-950">
          <InstagramFeed posts={instagramPosts} variant="robroy" />
        </section>
      )}

      <RobRoyEventsSection upcomingEvents={upcomingEvents} pastEvents={pastEvents} />

      <RobRoyDealsSection deals={deals} />

      <RobRoyPerformersSection performers={performers} />

      <RobRoyPatioSection />

      <RobRoyGallerySection gallery={gallery} />

      <RobRoyAboutSection />

      <RobRoyContactSection />

      <RobRoyFooter />
    </div>
  );
}
