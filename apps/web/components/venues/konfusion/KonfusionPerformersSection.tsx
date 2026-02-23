'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PerformerCard from '@/components/shared/performerCard';
import EmptyState from '@/components/shared/emptyState';
import type { Performer } from '@/components/shared/performerCard';

interface KonfusionPerformersSectionProps {
  performers: Performer[];
}

export default function KonfusionPerformersSection({ performers }: KonfusionPerformersSectionProps) {
  const hasPerformers = performers.length > 0;

  return (
    <section id="performers" className="scroll-mt-24 py-24 bg-linear-to-b from-zinc-950 via-black to-black">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Resident DJs</h2>
          <p className="text-xl text-purple-300 max-w-2xl mx-auto">
            The finest selectors bringing you the best beats
          </p>
        </motion.div>

        {hasPerformers ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,380px))] justify-center gap-8">
            {performers.map((dj) => (
              <PerformerCard key={dj.name} performer={dj} variant="konfusion" />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No DJs listed yet"
            message="Our DJ lineup is being finalised. Watch this space for announcements!"
            variant="konfusion"
          />
        )}
      </div>
    </section>
  );
}
