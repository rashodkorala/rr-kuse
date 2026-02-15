'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Ticket } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getVenueStyles, type VenueVariant } from "@/lib/venue-styles";

interface Event {
    id: string | number;
    title: string;
    description: string;
    image: string;
    day: string;
    month: string;
    time: string;
    price?: string;
    isPast?: boolean;
    isSoldOut?: boolean;
}

interface EventCardProps {
    event: Event;
    variant?: VenueVariant;
}

export default function EventCard({ event, variant = 'robroy' }: EventCardProps) {
    const styles = getVenueStyles(variant);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`rounded-2xl overflow-hidden shadow-xl ${styles.eventCard.container}`}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${styles.eventCard.imageOverlay}`} />

                {/* Date Badge */}
                <div className={`
          absolute top-4 left-4 px-3 py-2 rounded-lg backdrop-blur-md
          ${styles.eventCard.dateBadge}
        `}>
                    <div className="text-2xl font-bold leading-none">{event.day}</div>
                    <div className="text-xs uppercase tracking-wider">{event.month}</div>
                </div>

                {/* Status Badge */}
                {event.isPast ? (
                    <Badge className="absolute top-4 right-4 bg-gray-800/80 text-white">
                        Past Event
                    </Badge>
                ) : event.isSoldOut ? (
                    <Badge className="absolute top-4 right-4 bg-red-600 text-white">
                        Sold Out
                    </Badge>
                ) : (
                    <Badge className={`absolute top-4 right-4 ${styles.eventCard.upcomingBadge}`}>
                        Upcoming
                    </Badge>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold mb-2 text-white">
                    {event.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-2 ${styles.eventCard.descriptionText}`}>
                    {event.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${styles.eventCard.metaText}`}>
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                    </div>
                    {event.price && (
                        <div className={`flex items-center gap-2 text-sm ${styles.eventCard.metaText}`}>
                            <Ticket className="w-4 h-4" />
                            <span>{event.price}</span>
                        </div>
                    )}
                </div>

                {!event.isPast && (
                    <Button
                        className={`w-full ${styles.eventCard.ctaButton}`}
                    >
                        {event.isSoldOut ? 'Join Waitlist' : 'Get Tickets'}
                    </Button>
                )}
            </div>
        </motion.div>
    );
}