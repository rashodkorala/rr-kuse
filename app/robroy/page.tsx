'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Beer, Music, Calendar, Clock, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueNav from '@/components/shared/venueNav';
import EventCard from '@/components/shared/eventCard';
import PerformerCard from '@/components/shared/performerCard';
import PhotoGallery from '@/components/shared/photoGallery';
import Image from 'next/image';

// Sample Data
const upcomingEvents = [
    {
        id: 1,
        title: "Friday Night Live: The Wildcards",
        description: "Get ready for an electrifying night with local rock legends The Wildcards performing all your favorite classics.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
        day: "24",
        month: "JAN",
        time: "9:00 PM - Late",
        price: "£5 Entry",
        isPast: false
    },
    {
        id: 2,
        title: "Open Mic Night",
        description: "Show off your talents! Singers, comedians, poets welcome. Sign up at the bar.",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
        day: "26",
        month: "JAN",
        time: "7:30 PM - 11:00 PM",
        price: "Free Entry",
        isPast: false
    },
    {
        id: 3,
        title: "Burns Night Celebration",
        description: "Traditional Scottish celebration with haggis, whisky, and live bagpipes!",
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800",
        day: "25",
        month: "JAN",
        time: "6:00 PM - Midnight",
        price: "£15 (includes meal)",
        isPast: false
    }
];

const pastEvents = [
    {
        id: 4,
        title: "New Year's Eve Party 2024",
        description: "We rang in 2024 in style with champagne, live music, and an incredible countdown!",
        image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800",
        day: "31",
        month: "DEC",
        time: "8:00 PM - 3:00 AM",
        isPast: true
    },
    {
        id: 5,
        title: "Christmas Quiz Night",
        description: "Our legendary Christmas quiz with festive prizes and mulled wine.",
        image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800",
        day: "20",
        month: "DEC",
        time: "7:00 PM - 10:00 PM",
        isPast: true
    }
];

const bands = [
    {
        id: 1,
        name: "The Wildcards",
        type: "band" as const,
        genre: "Rock & Classic Covers",
        image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=600",
        nextDate: "Jan 24",
        instagram: "#"
    },
    {
        id: 2,
        name: "Celtic Storm",
        type: "band" as const,
        genre: "Traditional Folk",
        image: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?w=600",
        nextDate: "Feb 2",
        instagram: "#"
    },
    {
        id: 3,
        name: "Acoustic Souls",
        type: "band" as const,
        genre: "Acoustic / Indie",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
        nextDate: "Feb 8",
        instagram: "#"
    },
    {
        id: 4,
        name: "The Brass Monkeys",
        type: "band" as const,
        genre: "Jazz & Blues",
        image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600",
        instagram: "#"
    }
];

const galleryPhotos = [
    { url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800", caption: "The main bar" },
    { url: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800", caption: "Friday night vibes" },
    { url: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800", caption: "Live music stage" },
    { url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800", caption: "Craft beer selection" },
    { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800", caption: "Celebrating together" },
    { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800", caption: "Open mic night" },
    { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800", caption: "The crowd goes wild" },
    { url: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800", caption: "Whisky collection" },
    { url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800", caption: "Band night" },
    { url: "https://images.unsplash.com/photo-1510924199351-4e9d94df18a6?w=800", caption: "Cozy corner" },
    { url: "https://images.unsplash.com/photo-1529543544277-750e1a391cd9?w=800", caption: "Cheers!" },
    { url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800", caption: "Cocktail hour" }
];

export default function RobRoy() {
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
            <section id="events" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-900">
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

                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-gray-800/50">
                        <TabsTrigger value="upcoming" className="text-lg data-[state=active]:bg-orange-600">Upcoming Events</TabsTrigger>
                        <TabsTrigger value="past" className="text-lg data-[state=active]:bg-orange-600">Past Events</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} variant="robroy" />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="past">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastEvents.map((event) => (
                                <EventCard key={event.id} event={event} variant="robroy" />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Drink Deals Section */}
            <section className="py-24 bg-linear-to-b from-black to-gray-900">
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-linear-to-br from-orange-600 to-orange-700 p-6 rounded-2xl text-white"
                        >
                            <div className="text-4xl mb-2">🍺</div>
                            <h3 className="text-2xl font-bold mb-2">Tall Boy Tuesday</h3>
                            <p className="text-orange-100">Special Tall Boy Deals</p>
                            <p className="text-sm text-orange-200 mt-2">Every Tuesday</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-linear-to-br from-orange-700 to-red-800 p-6 rounded-2xl text-white"
                        >
                            <div className="text-4xl mb-2">🎤</div>
                            <h3 className="text-2xl font-bold mb-2">Open Mic</h3>
                            <p className="text-orange-100">Show Your Talent</p>
                            <p className="text-sm text-orange-200 mt-2">Every Wednesday</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-linear-to-br from-orange-600 to-orange-700 p-6 rounded-2xl text-white"
                        >
                            <div className="text-4xl mb-2">2️⃣4️⃣1️⃣</div>
                            <h3 className="text-2xl font-bold mb-2">2 for 1</h3>
                            <p className="text-orange-100">Double the Fun</p>
                            <p className="text-sm text-orange-200 mt-2">Every Thursday</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-linear-to-br from-orange-700 to-red-800 p-6 rounded-2xl text-white"
                        >
                            <div className="text-4xl mb-2">💰</div>
                            <h3 className="text-2xl font-bold mb-2">2 for £9.50</h3>
                            <p className="text-orange-100">Selected Drinks</p>
                            <p className="text-sm text-orange-200 mt-2">Friday & Saturday</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-linear-to-br from-orange-600 to-orange-700 p-6 rounded-2xl text-white border-2 border-white/30"
                        >
                            <div className="text-4xl mb-2">💣</div>
                            <h3 className="text-2xl font-bold mb-2">3 for £10</h3>
                            <p className="text-orange-100">Cherrybombs, Jagerbombs</p>
                            <p className="text-orange-100">& Jolly Ranchers</p>
                            <p className="text-sm text-orange-200 mt-2">All Week</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-block bg-orange-600/20 border border-orange-500/30 rounded-xl p-6">
                            <h4 className="text-xl font-bold text-white mb-2">🎓 Student Special</h4>
                            <p className="text-orange-300">20% off all drinks with valid student ID</p>
                            <p className="text-sm text-gray-400 mt-2">Monday - Thursday</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bands Section */}
            <section id="performers" className="scroll-mt-24 py-24 bg-gray-900">
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

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bands.map((band) => (
                            <PerformerCard key={band.id} performer={band} variant="robroy" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Patio Rentals Section */}
            <section className="py-24 bg-linear-to-b from-black to-gray-900">
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
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Heated & Covered</h4>
                                        <p className="text-gray-400 text-sm">Comfortable year-round with outdoor heaters and weather protection</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Capacity up to 80</h4>
                                        <p className="text-gray-400 text-sm">Perfect for medium to large gatherings</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Private Bar & Sound System</h4>
                                        <p className="text-gray-400 text-sm">Dedicated bar service and quality audio for your event</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                                        <span className="text-white text-sm">✓</span>
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
            <section id="gallery" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-900">
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

                <PhotoGallery photos={galleryPhotos} variant="robroy" />
            </section>

            {/* About Section */}
            <section id="about" className="scroll-mt-24 py-24 bg-linear-to-b from-black via-gray-900 to-black text-white">
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
            <footer className="bg-gray-900 text-white py-12">
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
                            © 2024 Rob Roy. Drink responsibly.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}