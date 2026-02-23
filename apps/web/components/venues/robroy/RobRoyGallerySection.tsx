'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PhotoGallery from '@/components/shared/photoGallery';
import EmptyState from '@/components/shared/emptyState';
import type { GalleryPhoto } from './types';

interface RobRoyGallerySectionProps {
  gallery: GalleryPhoto[];
}

export default function RobRoyGallerySection({ gallery }: RobRoyGallerySectionProps) {
  const hasGallery = gallery.length > 0;

  return (
    <section id="gallery" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Snapshots from our legendary nights
        </p>
      </motion.div>

      {hasGallery ? (
        <PhotoGallery photos={gallery} variant="robroy" />
      ) : (
        <EmptyState
          title="No photos yet"
          message="Gallery photos will appear here once we start adding them. Stay tuned!"
          variant="robroy"
        />
      )}
    </section>
  );
}
