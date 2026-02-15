'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Headphones, Calendar, Clock, MapPin, Mail, Instagram, Twitter, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueNav from '@/components/shared/venueNav';
import EventCard from '@/components/shared/eventCard';
import PerformerCard, { type Performer } from '@/components/shared/performerCard';
import PhotoGallery from '@/components/shared/photoGallery';
import DrinkDealsSection, { type DrinkDeal } from '@/components/shared/drinkDealsSection';
import EmptyState from '@/components/shared/emptyState';

type ParticleData = {
    left: string;
    duration: number;
    delay: number;
};

function generateParticleData(): ParticleData[] {
    return Array.from({ length: 40 }, () => ({
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5,
    }));
}

interface EventItem {
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

interface GalleryPhoto {
    url: string;
    caption?: string;
}

interface KonfusionContentProps {
    upcomingEvents: EventItem[];
    pastEvents: EventItem[];
    performers: Performer[];
    deals: DrinkDeal[];
    gallery: GalleryPhoto[];
}

export default function KonfusionContent({
    upcomingEvents,
    pastEvents,
    performers,
    deals,
    gallery,
}: KonfusionContentProps) {
    const [particleData] = useState<ParticleData[]>(() => generateParticleData());

    const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;
    const hasPerformers = performers.length > 0;
    const hasDeals = deals.length > 0;
    const hasGallery = gallery.length > 0;

    return (
        <div className="min-h-screen bg-black text-white">
            <VenueNav variant="konfusion" />

            {/* Hero Section */}
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80)' }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/92" />

                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {particleData.map((particle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                                left: particle.left,
                            } as React.CSSProperties}
                            initial={{ y: '100vh', opacity: 0 }}
                            animate={{
                                y: '-10vh',
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: 'linear'
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Sparkles className="w-20 h-20 mx-auto mb-6 text-purple-400" />
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 bg-linear-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                            KONFUSION
                        </h1>

                        <p className="text-xl md:text-2xl font-light text-purple-200 mb-2">
                            <span className="italic">(n.)</span> a lack of order
                        </p>
                        <p className="text-xl md:text-2xl font-light text-purple-200 mb-8">
                            or regular arrangement
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-purple-600 hover:bg-purple-700 text-white px-8 shadow-lg shadow-purple-600/50"
                                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                Upcoming Events
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-black/60 hover:bg-black/75 text-white border-purple-500/50 hover:border-purple-400/70 px-8"
                            >
                                <Headphones className="w-5 h-5 mr-2" />
                                DJ Lineup
                            </Button>
                        </div>

                        {/* Student Badge */}
                        <motion.div
                            className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-purple-600/30 rounded-full border border-purple-500/50"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-sm">&#127891;</span>
                            <span className="text-purple-200 text-sm">Student Night Every Friday - NUS Discounts!</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-purple-400 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Events Section */}
            <section id="events" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">What&apos;s On</h2>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                        The biggest nights, the best DJs, the wildest parties
                    </p>
                </motion.div>

                {hasEvents ? (
                    <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-black/50 border border-purple-500/25">
                            <TabsTrigger value="upcoming" className="text-lg data-[state=active]:bg-purple-600">Upcoming</TabsTrigger>
                            <TabsTrigger value="past" className="text-lg data-[state=active]:bg-purple-600">Past Events</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming">
                            {upcomingEvents.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event) => (
                                        <EventCard key={event.id} event={event} variant="konfusion" />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No upcoming events yet"
                                    message="Stay tuned — we're planning something wild. Check back soon!"
                                    variant="konfusion"
                                />
                            )}
                        </TabsContent>

                        <TabsContent value="past">
                            {pastEvents.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pastEvents.map((event) => (
                                        <EventCard key={event.id} event={event} variant="konfusion" />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No past events to show"
                                    message="Our event history will appear here after our first event wraps up."
                                    variant="konfusion"
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                ) : (
                    <EmptyState
                        title="No events yet"
                        message="We're getting things set up. Events will be posted here soon!"
                        variant="konfusion"
                    />
                )}
            </section>

            {/* Drink Deals Section */}
            {hasDeals ? (
                <section className="py-24 bg-linear-to-b from-black to-zinc-950">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Drink Deals</h2>
                            <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                                Party harder, spend less
                            </p>
                        </motion.div>

                        <DrinkDealsSection deals={deals} variant="konfusion" />
                    </div>
                </section>
            ) : (
                <section className="py-24 bg-linear-to-b from-black to-zinc-950">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Drink Deals</h2>
                        </motion.div>
                        <EmptyState
                            title="No deals available right now"
                            message="We're cooking up some great deals. Check back soon!"
                            variant="konfusion"
                        />
                    </div>
                </section>
            )}

            {/* DJs Section */}
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
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* Gallery Section */}
            <section id="gallery" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                        Memories from the dance floor
                    </p>
                </motion.div>

                {hasGallery ? (
                    <PhotoGallery photos={gallery} variant="konfusion" />
                ) : (
                    <EmptyState
                        title="No photos yet"
                        message="Gallery photos will appear here once we start adding them. Stay tuned!"
                        variant="konfusion"
                    />
                )}
            </section>

            {/* About Section */}
            <section id="about" className="scroll-mt-24 py-24 bg-linear-to-b from-zinc-950 to-black">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Konfusion</h2>
                            <p className="text-lg text-purple-200 mb-6 leading-relaxed">
                                Born from the belief that the best nights are the ones you can&apos;t quite remember, Konfusion has been the city&apos;s premier nightclub for students and party lovers alike.
                            </p>
                            <p className="text-lg text-purple-200 mb-8 leading-relaxed">
                                With a state-of-the-art sound system, mind-bending light shows, and the best DJs in the game, we create experiences that blur the line between reality and pure euphoria. Whether you&apos;re here for &pound;2 drinks on student night or an underground techno marathon – welcome to the chaos.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 mt-1 text-purple-400" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Opening Hours</h4>
                                        <p className="text-purple-300 text-sm">Friday - Saturday: 3PM - 3AM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 mt-1 text-purple-400" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Find Us</h4>
                                        <p className="text-purple-300 text-sm">45 Club Street</p>
                                        <p className="text-purple-300 text-sm">City Centre</p>
                                    </div>
                                </div>
                            </div>

                            {/* Student Promo */}
                            <div className="mt-8 p-6 bg-purple-600/20 rounded-xl border border-purple-500/30">
                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    &#127891; Student Specials
                                </h4>
                                <ul className="text-purple-200 space-y-1 text-sm">
                                    <li>&bull; Free entry before 11PM with valid NUS card</li>
                                    <li>&bull; &pound;2 drinks until midnight every Friday</li>
                                    <li>&bull; 20% off all tickets with student email</li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative order-1 lg:order-2"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"
                                alt="Konfusion club"
                                className="rounded-2xl shadow-2xl shadow-purple-900/50"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-purple-600 p-6 rounded-xl shadow-lg">
                                <p className="text-3xl font-bold">3</p>
                                <p className="text-sm uppercase tracking-wider text-purple-200">Dance floors</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 py-12">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-purple-500" />
                            <span className="text-2xl font-bold">KONFUSION</span>
                        </div>

                        <div className="flex justify-center gap-6">
                            <a href="#" className="hover:text-purple-500 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-purple-500 transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-purple-500 transition-colors">
                                <Music className="w-6 h-6" />
                            </a>
                            <a href="mailto:info@konfusion.club" className="hover:text-purple-500 transition-colors">
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>

                        <p className="text-gray-500 text-sm text-center md:text-right">
                            &copy; 2024 Konfusion. Over 18s only. ID required.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
