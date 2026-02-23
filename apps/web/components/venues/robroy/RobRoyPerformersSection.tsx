'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Headphones, Music } from 'lucide-react';
import PerformerCard from '@/components/shared/performerCard';
import EmptyState from '@/components/shared/emptyState';
import type { Performer } from '@/components/shared/performerCard';

interface RobRoyPerformersSectionProps {
  performers: Performer[];
}

export default function RobRoyPerformersSection({ performers }: RobRoyPerformersSectionProps) {
  const [performerFilter, setPerformerFilter] = useState<'all' | 'band' | 'dj'>('all');
  const hasPerformers = performers.length > 0;

  const filteredPerformers =
    performerFilter === 'all'
      ? performers
      : performers.filter((p) => p.type === performerFilter);

  return (
    <section id="performers" className="scroll-mt-24 py-24 bg-zinc-950">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Live Bands & DJs</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The best local talent gracing our stage every week
          </p>
        </motion.div>

        {hasPerformers ? (
          <>
            <div className="flex justify-center gap-3 mb-12">
              <button
                onClick={() => setPerformerFilter('all')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  performerFilter === 'all'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'bg-zinc-900/80 text-gray-400 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPerformerFilter('band')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  performerFilter === 'band'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'bg-zinc-900/80 text-gray-400 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                <Music className="w-4 h-4" />
                Bands
              </button>
              <button
                onClick={() => setPerformerFilter('dj')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  performerFilter === 'dj'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : 'bg-zinc-900/80 text-gray-400 hover:text-white hover:bg-zinc-800/80'
                }`}
              >
                <Headphones className="w-4 h-4" />
                DJs
              </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,380px))] justify-center gap-8">
              {filteredPerformers.map((performer) => (
                <PerformerCard key={performer.name} performer={performer} variant="robroy" />
              ))}
            </div>
            {filteredPerformers.length === 0 && (
              <p className="text-center text-gray-400 py-8">
                No {performerFilter === 'band' ? 'bands' : 'DJs'} in this lineup.
              </p>
            )}
          </>
        ) : (
          <EmptyState
            title="No performers listed yet"
            message="Our lineup is being finalised. Watch this space for live music announcements!"
            variant="robroy"
          />
        )}
      </div>
    </section>
  );
}
