'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { VenueVariant } from '@/lib/venue-styles';

interface EmptyStateProps {
    title: string;
    message: string;
    variant?: VenueVariant;
}

const accentMap: Record<VenueVariant, string> = {
    robroy: 'text-orange-400',
    konfusion: 'text-purple-400',
};

export default function EmptyState({ title, message, variant = 'robroy' }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
        >
            <div className={`text-5xl mb-4 ${accentMap[variant]}`}>
                &#8212;
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 max-w-md">{message}</p>
        </motion.div>
    );
}
