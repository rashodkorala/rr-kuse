'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from '@/components/shared/eventCard';
import EmptyState from '@/components/shared/emptyState';
import type { EventItem } from './types';

interface KonfusionEventsSectionProps {
  upcomingEvents: EventItem[];
  pastEvents: EventItem[];
}

export default function KonfusionEventsSection({
  upcomingEvents,
  pastEvents,
}: KonfusionEventsSectionProps) {
  const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;

  return (
    <section id="events" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">What&apos;s On</h2>
        <p className="text-xl text-purple-300 max-w-2xl mx-auto">
          The biggest nights, the best DJs, the wildest parties
        </p>
      </motion.div>

      {hasEvents ? (
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-center gap-3 mb-12">
            <TabsList className="flex h-auto w-auto gap-3 bg-transparent p-0 border-0">
              <TabsTrigger
                value="upcoming"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-0 shadow-none data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-600/30 data-[state=inactive]:bg-black/60 data-[state=inactive]:text-purple-300/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-black/80"
              >
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-0 shadow-none data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-600/30 data-[state=inactive]:bg-black/60 data-[state=inactive]:text-purple-300/80 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-black/80"
              >
                Past Events
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,380px))] justify-center gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} variant="konfusion" />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No upcoming events yet"
                message="Stay tuned — we're planning something wild. Check back soon!"
                variant="konfusion"
              />
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,380px))] justify-center gap-8">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} variant="konfusion" />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No past events to show"
                message="Our event history will appear here after our first event wraps up."
                variant="konfusion"
              />
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <EmptyState
          title="No events yet"
          message="We're getting things set up. Events will be posted here soon!"
          variant="konfusion"
        />
      )}
    </section>
  );
}
