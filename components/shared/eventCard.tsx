'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Ticket } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Event {
    id: number;
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
    variant?: 'robroy' | 'konfusion';
}

export default function EventCard({ event, variant = 'robroy' }: EventCardProps) {
    const isRobRoy = variant === 'robroy';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`
        rounded-2xl overflow-hidden shadow-xl
        ${isRobRoy
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-600/30'
                    : 'bg-gradient-to-br from-purple-950 to-violet-900 border border-purple-700/50'
                }
      `}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${isRobRoy ? 'bg-orange-900/20' : 'bg-purple-900/40'}`} />

                {/* Date Badge */}
                <div className={`
          absolute top-4 left-4 px-3 py-2 rounded-lg backdrop-blur-md
          ${isRobRoy ? 'bg-orange-600/90 text-white' : 'bg-purple-600/90 text-white'}
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
                    <Badge className={`absolute top-4 right-4 ${isRobRoy ? 'bg-green-600' : 'bg-green-500'} text-white`}>
                        Upcoming
                    </Badge>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className={`text-xl font-bold mb-2 ${isRobRoy ? 'text-white' : 'text-white'}`}>
                    {event.title}
                </h3>

                <p className={`text-sm mb-4 line-clamp-2 ${isRobRoy ? 'text-gray-400' : 'text-purple-200'}`}>
                    {event.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-sm ${isRobRoy ? 'text-gray-400' : 'text-purple-300'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                    </div>
                    {event.price && (
                        <div className={`flex items-center gap-2 text-sm ${isRobRoy ? 'text-gray-400' : 'text-purple-300'}`}>
                            <Ticket className="w-4 h-4" />
                            <span>{event.price}</span>
                        </div>
                    )}
                </div>

                {!event.isPast && (
                    <Button
                        className={`w-full ${isRobRoy
                            ? 'bg-orange-600 hover:bg-orange-700 text-white'
                            : 'bg-purple-600 hover:bg-purple-500 text-white'
                            }`}
                    >
                        {event.isSoldOut ? 'Join Waitlist' : 'Get Tickets'}
                    </Button>
                )}
            </div>
        </motion.div>
    );
}