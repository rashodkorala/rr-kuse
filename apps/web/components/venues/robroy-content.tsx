'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Beer, Music, Calendar, Clock, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueNav from '@/components/shared/venueNav';
import EventCard from '@/components/shared/eventCard';
import PerformerCard, { type Performer } from '@/components/shared/performerCard';
import PhotoGallery from '@/components/shared/photoGallery';
import DrinkDealsSection, { type DrinkDeal } from '@/components/shared/drinkDealsSection';
import EmptyState from '@/components/shared/emptyState';
import Image from 'next/image';

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

interface RobRoyContentProps {
    upcomingEvents: EventItem[];
    pastEvents: EventItem[];
    performers: Performer[];
    deals: DrinkDeal[];
    gallery: GalleryPhoto[];
}

export default function RobRoyContent({
    upcomingEvents,
    pastEvents,
    performers,
    deals,
    gallery,
}: RobRoyContentProps) {
    const hasEvents = upcomingEvents.length > 0 || pastEvents.length > 0;
    const hasPerformers = performers.length > 0;
    const hasDeals = deals.length > 0;
    const hasGallery = gallery.length > 0;

    return (
        <div className="min-h-screen bg-black">
            <VenueNav variant="robroy" />

            {/* Hero Section */}
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600)' }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-orange-900/70 to-black/90" />

                {/* Animated grain overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'
                }} />

                <div className="relative z-10 text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Beer className="w-20 h-20 mx-auto mb-6" />
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
                            ROB ROY
                        </h1>
                        <p className="text-xl md:text-3xl font-light tracking-widest uppercase mb-2">
                            We Install & Service Hangovers
                        </p>
                        <p className="text-sm md:text-base text-orange-300 tracking-widest mb-8">
                            ESTABLISHED 1977
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-white text-orange-700 hover:bg-orange-100 px-8"
                                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                View Events
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white/10 px-8"
                            >
                                <Music className="w-5 h-5 mr-2" />
                                Live Music Schedule
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-white/70 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Events Section */}
            <section id="events" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-zinc-950">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What&apos;s On</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From live music to quiz nights, there&apos;s always something happening at Rob Roy
                    </p>
                </motion.div>

                {hasEvents ? (
                    <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-black/50 border border-white/10">
                            <TabsTrigger value="upcoming" className="text-lg data-[state=active]:bg-orange-600">Upcoming Events</TabsTrigger>
                            <TabsTrigger value="past" className="text-lg data-[state=active]:bg-orange-600">Past Events</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upcoming">
                            {upcomingEvents.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {upcomingEvents.map((event) => (
                                        <EventCard key={event.id} event={event} variant="robroy" />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No upcoming events yet"
                                    message="Stay tuned — we're planning something special. Check back soon!"
                                    variant="robroy"
                                />
                            )}
                        </TabsContent>

                        <TabsContent value="past">
                            {pastEvents.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pastEvents.map((event) => (
                                        <EventCard key={event.id} event={event} variant="robroy" />
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No past events to show"
                                    message="Our event history will appear here after our first event wraps up."
                                    variant="robroy"
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                ) : (
                    <EmptyState
                        title="No events yet"
                        message="We're getting things set up. Events will be posted here soon!"
                        variant="robroy"
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
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Drink Deals</h2>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Quality drinks at student-friendly prices
                            </p>
                        </motion.div>

                        <DrinkDealsSection deals={deals} variant="robroy" />
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
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Drink Deals</h2>
                        </motion.div>
                        <EmptyState
                            title="No deals available right now"
                            message="We're cooking up some great deals. Check back soon!"
                            variant="robroy"
                        />
                    </div>
                </section>
            )}

            {/* Bands Section */}
            <section id="performers" className="scroll-mt-24 py-24 bg-zinc-950">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Live Bands</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            The best local talent gracing our stage every week
                        </p>
                    </motion.div>

                    {hasPerformers ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {performers.map((band) => (
                                <PerformerCard key={band.name} performer={band} variant="robroy" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="No performers listed yet"
                            message="Our lineup is being finalised. Watch this space for live music announcements!"
                            variant="robroy"
                        />
                    )}
                </div>
            </section>

            {/* Patio Rentals Section */}
            <section className="py-24 bg-linear-to-b from-black to-zinc-950">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Rob Roy Patio Rentals</h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Looking for the perfect venue for your next event? Our spacious heated patio is available for private hire. Whether it&apos;s a birthday party, corporate event, or celebration, we&apos;ve got you covered.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">&#10003;</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Heated & Covered</h4>
                                        <p className="text-gray-400 text-sm">Comfortable year-round with outdoor heaters and weather protection</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">&#10003;</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Capacity up to 80</h4>
                                        <p className="text-gray-400 text-sm">Perfect for medium to large gatherings</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">&#10003;</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Private Bar & Sound System</h4>
                                        <p className="text-gray-400 text-sm">Dedicated bar service and quality audio for your event</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">&#10003;</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Flexible Packages</h4>
                                        <p className="text-gray-400 text-sm">Custom food & drink packages available</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Request a Quote
                                </Button>
                                <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600/10">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Us
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <Image
                                    width={600}
                                    height={600}
                                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600"
                                    alt="Patio view 1"
                                    className="rounded-xl shadow-2xl"
                                />
                                <Image
                                    width={600}
                                    height={600}
                                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600"
                                    alt="Patio view 2"
                                    className="rounded-xl shadow-2xl mt-8"
                                />
                                <Image
                                    width={600}
                                    height={600}
                                    src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600"
                                    alt="Patio view 3"
                                    className="rounded-xl shadow-2xl -mt-8"
                                />
                                <Image
                                    width={600}
                                    height={600}
                                    src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600"
                                    alt="Patio view 4"
                                    className="rounded-xl shadow-2xl"
                                />
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-orange-600 p-6 rounded-xl shadow-xl">
                                <p className="text-3xl font-bold text-white">80</p>
                                <p className="text-sm uppercase tracking-wider text-orange-100">Guest capacity</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
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

            {/* About Section */}
            <section id="about" className="scroll-mt-24 py-24 bg-linear-to-b from-black via-zinc-950 to-black text-white">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Rob Roy</h2>
                            <div className="inline-block bg-orange-600 px-4 py-2 rounded-lg mb-6">
                                <p className="text-sm uppercase tracking-wider font-semibold">EST. 1977</p>
                            </div>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Named after the legendary Scottish folk hero, Rob Roy has been the heart of our local community since 1977. We&apos;re not just a pub – we&apos;re where friendships are forged, stories are shared, and memories are made.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                With an extensive selection of craft beers, fine whisky, and the best live music in town, we&apos;re proud to be your home away from home. Whether you&apos;re a student looking for your new local or a regular seeking your usual spot, there&apos;s always a warm welcome waiting.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 mt-1 text-orange-400" />
                                    <div>
                                        <h4 className="font-semibold mb-1 text-white">Opening Hours</h4>
                                        <p className="text-gray-400 text-sm">Tuesday - Wednesday: 3PM - 2AM</p>
                                        <p className="text-gray-400 text-sm">Thursday - Saturday: 3PM - 3AM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 mt-1 text-orange-400" />
                                    <div>
                                        <h4 className="font-semibold mb-1 text-white">Find Us</h4>
                                        <p className="text-gray-400 text-sm">123 High Street</p>
                                        <p className="text-gray-400 text-sm">City Centre</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <Image
                                width={800}
                                height={800}
                                src="https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800"
                                alt="Rob Roy interior"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg">
                                <p className="text-3xl font-bold">1977</p>
                                <p className="text-sm uppercase tracking-wider">Established</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 border-t border-white/10 text-white py-12">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="flex items-center gap-3">
                            <Beer className="w-8 h-8 text-orange-500" />
                            <span className="text-2xl font-bold">ROB ROY</span>
                        </div>

                        <div className="flex justify-center gap-6">
                            <a href="#" className="hover:text-orange-500 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-orange-500 transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="mailto:info@robroy.com" className="hover:text-orange-500 transition-colors">
                                <Mail className="w-6 h-6" />
                            </a>
                            <a href="tel:+441234567890" className="hover:text-orange-500 transition-colors">
                                <Phone className="w-6 h-6" />
                            </a>
                        </div>

                        <p className="text-gray-500 text-sm text-center md:text-right">
                            &copy; 2024 Rob Roy. Drink responsibly.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
