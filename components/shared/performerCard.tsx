'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Headphones, Instagram, ExternalLink } from 'lucide-react';

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
    variant?: 'robroy' | 'konfusion';
}

export default function PerformerCard({ performer, variant = 'robroy' }: PerformerCardProps) {
    const isRobRoy = variant === 'robroy';
    const Icon = performer.type === 'dj' ? Headphones : Music;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className={`
        relative rounded-2xl overflow-hidden group cursor-pointer
        ${isRobRoy ? 'shadow-xl' : 'shadow-2xl shadow-purple-900/50'}
      `}
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
        ${isRobRoy
                    ? 'bg-gradient-to-t from-orange-900/90 via-orange-800/50 to-transparent'
                    : 'bg-gradient-to-t from-purple-950/95 via-purple-900/60 to-transparent'
                }
      `} />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${isRobRoy ? 'text-orange-300' : 'text-purple-300'}`} />
                    <span className={`text-xs uppercase tracking-wider ${isRobRoy ? 'text-orange-300' : 'text-purple-300'}`}>
                        {performer.type === 'dj' ? 'DJ' : 'Live Band'}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                    {performer.name}
                </h3>

                <p className={`text-sm mb-3 ${isRobRoy ? 'text-orange-100/80' : 'text-purple-200/80'}`}>
                    {performer.genre}
                </p>

                {/* Social Links */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {performer.instagram && (
                        <a
                            href={performer.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full ${isRobRoy ? 'bg-orange-600/50 hover:bg-orange-600' : 'bg-purple-600/50 hover:bg-purple-600'} transition-colors`}
                        >
                            <Instagram className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {performer.website && (
                        <a
                            href={performer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full ${isRobRoy ? 'bg-orange-600/50 hover:bg-orange-600' : 'bg-purple-600/50 hover:bg-purple-600'} transition-colors`}
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
          ${isRobRoy ? 'bg-orange-500 text-white' : 'bg-purple-500 text-white'}
        `}>
                    Next: {performer.nextDate}
                </div>
            )}
        </motion.div>
    );
}