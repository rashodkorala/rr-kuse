'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { VenueVariant } from '@/lib/venue-styles';

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramFeedProps {
  posts: InstagramPost[];
  variant?: VenueVariant;
}

export default function InstagramFeed({ posts, variant = 'robroy' }: InstagramFeedProps) {
  if (posts.length === 0) return null;

  const accent = variant === 'robroy' ? 'orange' : 'purple';
  const accentClasses = {
    orange: 'border-orange-500/30 hover:border-orange-500/60',
    purple: 'border-purple-500/30 hover:border-purple-500/60',
  };

  return (
    <section id="instagram-feed" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What&apos;s Happening Right Now
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Latest from our Instagram
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {posts.map((post, i) => (
          <motion.a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-colors ${accentClasses[accent]}`}
          >
            <Image
              src={post.imageUrl}
              alt={post.caption ?? 'Instagram post'}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              unoptimized
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
