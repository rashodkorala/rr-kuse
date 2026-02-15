'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { CalendarDays, Sparkles } from 'lucide-react';
import { getVenueStyles, type VenueVariant } from '@/lib/venue-styles';

export type DrinkDeal = {
    id: string | number;
    title: string;
    description: string;
    image: string;
    day: string;       // e.g. "Monday", "Tuesday", "All Week"
    timeRange?: string; // e.g. "9PM - 11PM"
};

interface DrinkDealsSectionProps {
    deals: DrinkDeal[];
    variant: VenueVariant;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getTodayName(): string {
    return DAY_NAMES[new Date().getDay()];
}

export default function DrinkDealsSection({ deals, variant }: DrinkDealsSectionProps) {
    const styles = getVenueStyles(variant);
    const [view, setView] = useState<'today' | 'all'>('today');

    const todayName = useMemo(() => getTodayName(), []);

    const todayDeals = useMemo(() => {
        return deals.filter(deal => deal.day === todayName || deal.day === 'All Week');
    }, [deals, todayName]);

    const displayDeals = view === 'today' ? todayDeals : deals;

    return (
        <div>
            {/* Two-button toggle */}
            <div className="flex justify-center gap-3 mb-10">
                <button
                    onClick={() => setView('today')}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                        ${view === 'today'
                            ? styles.dealCard.activeDayTab
                            : styles.dealCard.inactiveDayTab
                        }
                    `}
                >
                    <Sparkles className="w-4 h-4" />
                    Today&apos;s Deals
                    <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${view === 'today' ? 'bg-white/20' : 'bg-white/10'}`}>
                        {todayName}
                    </span>
                </button>
                <button
                    onClick={() => setView('all')}
                    className={`
                        flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                        ${view === 'all'
                            ? styles.dealCard.activeDayTab
                            : styles.dealCard.inactiveDayTab
                        }
                    `}
                >
                    <CalendarDays className="w-4 h-4" />
                    All Deals
                </button>
            </div>

            {/* Deal cards grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {displayDeals.map((deal, index) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className={`group rounded-2xl overflow-hidden ${styles.dealCard.container}`}
                        >
                            {/* Photo */}
                            <div className="relative aspect-4/3 overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className={`absolute inset-0 ${styles.dealCard.imageOverlay}`} />

                                {/* Day badge on photo */}
                                <div className="absolute top-3 left-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${styles.dealCard.dayBadge}`}>
                                        {deal.day}
                                    </span>
                                </div>

                                {/* Time range overlay */}
                                {deal.timeRange && (
                                    <div className="absolute bottom-3 right-3">
                                        <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 text-white/90 backdrop-blur-sm">
                                            {deal.timeRange}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className={`text-lg font-bold mb-1.5 ${styles.dealCard.titleText}`}>
                                    {deal.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${styles.dealCard.descriptionText}`}>
                                    {deal.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Empty state for today */}
            {displayDeals.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No deals today — check back tomorrow!</p>
                    <button
                        onClick={() => setView('all')}
                        className={`mt-4 px-5 py-2 rounded-full text-sm font-medium ${styles.dealCard.activeDayTab}`}
                    >
                        View All Deals
                    </button>
                </div>
            )}
        </div>
    );
}
