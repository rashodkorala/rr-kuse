'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Headphones, Instagram, ExternalLink } from 'lucide-react';
import { getVenueStyles, type VenueVariant } from "@/lib/venue-styles";

interface Performer {
    name: string;
    type: 'dj' | 'band';
    genre: string;
    image: string;
    nextDate?: string;
    instagram?: string;
    website?: string;
}

interface PerformerCardProps {
    performer: Performer;
    variant?: VenueVariant;
}

export default function PerformerCard({ performer, variant = 'robroy' }: PerformerCardProps) {
    const styles = getVenueStyles(variant);
    const Icon = performer.type === 'dj' ? Headphones : Music;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${styles.performerCard.shadow}`}
        >
            {/* Image */}
            <div className="aspect-square overflow-hidden">
                <img
                    src={performer.image}
                    alt={performer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Overlay */}
            <div className={`
        absolute inset-0 transition-opacity duration-300
        ${styles.performerCard.overlay}
      `} />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${styles.performerCard.accentText}`} />
                    <span className={`text-xs uppercase tracking-wider ${styles.performerCard.accentText}`}>
                        {performer.type === 'dj' ? 'DJ' : 'Live Band'}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                    {performer.name}
                </h3>

                <p className={`text-sm mb-3 ${styles.performerCard.genreText}`}>
                    {performer.genre}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {performer.instagram && (
                        <a
                            href={performer.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full ${styles.performerCard.socialButton} transition-colors`}
                        >
                            <Instagram className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {performer.website && (
                        <a
                            href={performer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full ${styles.performerCard.socialButton} transition-colors`}
                        >
                            <ExternalLink className="w-4 h-4 text-white" />
                        </a>
                    )}
                </div>
            </div>

            {/* Next Performance */}
            {performer.nextDate && (
                <div className={`
          absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium
          ${styles.performerCard.nextBadge}
        `}>
                    Next: {performer.nextDate}
                </div>
            )}
        </motion.div>
    );
}