'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Headphones, Calendar, Clock, MapPin, Mail, Instagram, Twitter, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VenueNav from '@/components/shared/venueNav';
import EventCard from '@/components/shared/eventCard';
import PerformerCard from '@/components/shared/performerCard';
import PhotoGallery from '@/components/shared/photoGallery';

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

// Sample Data
const upcomingEvents = [
    {
        id: 1,
        title: "BASS DROP FRIDAY",
        description: "University night special! £2 drinks before midnight. Featuring DJ Phantom & MC Riot.",
        image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800",
        day: "24",
        month: "JAN",
        time: "10:00 PM - 4:00 AM",
        price: "£5 / Free before 11PM with NUS",
        isPast: false
    },
    {
        id: 2,
        title: "NEON RAVE",
        description: "Glow in the dark party! UV paint, neon accessories provided. Best dressed wins £100.",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
        day: "31",
        month: "JAN",
        time: "10:00 PM - 5:00 AM",
        price: "£8 Early Bird / £12 on door",
        isPast: false
    },
    {
        id: 3,
        title: "TECHNO THERAPY",
        description: "Deep techno vibes with international DJ collective VOID. Pure underground sound.",
        image: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800",
        day: "07",
        month: "FEB",
        time: "11:00 PM - 6:00 AM",
        price: "£15",
        isPast: false,
        isSoldOut: false
    }
];

const pastEvents = [
    {
        id: 4,
        title: "NYE: INTO THE VOID",
        description: "Epic countdown with 3 rooms of music, confetti cannons, and champagne toast at midnight.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
        day: "31",
        month: "DEC",
        time: "9:00 PM - 6:00 AM",
        isPast: true
    },
    {
        id: 5,
        title: "WINTER WONDERLAND RAVE",
        description: "Christmas special with snow machines, winter cocktails, and DJ Santa.",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
        day: "21",
        month: "DEC",
        time: "10:00 PM - 4:00 AM",
        isPast: true
    }
];

const djs = [
    {
        id: 1,
        name: "DJ PHANTOM",
        type: "dj" as const,
        genre: "House / Bass",
        image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600",
        nextDate: "Every Friday",
        instagram: "#"
    },
    {
        id: 2,
        name: "VOLTAGE",
        type: "dj" as const,
        genre: "Techno / Industrial",
        image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=600",
        nextDate: "Feb 7",
        instagram: "#"
    },
    {
        id: 3,
        name: "LUNA WAVE",
        type: "dj" as const,
        genre: "Trance / Progressive",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600",
        nextDate: "Feb 14",
        instagram: "#"
    },
    {
        id: 4,
        name: "MC RIOT",
        type: "dj" as const,
        genre: "Drum & Bass / Jungle",
        image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600",
        nextDate: "Every Friday",
        instagram: "#"
    },
    {
        id: 5,
        name: "NØVA",
        type: "dj" as const,
        genre: "Deep House / Melodic",
        image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=600",
        instagram: "#"
    },
    {
        id: 6,
        name: "BASS PROPHET",
        type: "dj" as const,
        genre: "Dubstep / Hybrid",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
        nextDate: "Jan 31",
        instagram: "#"
    }
];

const galleryPhotos = [
    { url: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800", caption: "Main stage" },
    { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800", caption: "Laser show" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", caption: "NYE 2024" },
    { url: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800", caption: "The crowd" },
    { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800", caption: "DJ booth" },
    { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800", caption: "Bass night" },
    { url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800", caption: "Neon party" },
    { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800", caption: "Students night" },
    { url: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800", caption: "The vibes" },
    { url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800", caption: "Dance floor" },
    { url: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800", caption: "VIP area" },
    { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800", caption: "Confetti drop" }
];

export default function Konfusion() {
    const [particleData] = useState<ParticleData[]>(() => generateParticleData());

    return (
        <div className="min-h-screen bg-linear-to-b from-purple-950 to-black text-white">
            <VenueNav variant="konfusion" />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1600)' }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-purple-950/80 via-purple-900/70 to-black/90" />

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
                                className="bg-purple-600 hover:bg-purple-500 text-white px-8 shadow-lg shadow-purple-600/50"
                                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                Upcoming Events
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-purple-400/50 text-white hover:bg-purple-900/50 px-8"
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
                            <span className="text-sm">🎓</span>
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
            <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-purple-900/50">
                        <TabsTrigger value="upcoming" className="text-lg data-[state=active]:bg-purple-600">Upcoming</TabsTrigger>
                        <TabsTrigger value="past" className="text-lg data-[state=active]:bg-purple-600">Past Events</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} variant="konfusion" />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="past">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {pastEvents.map((event) => (
                                <EventCard key={event.id} event={event} variant="konfusion" />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Drink Deals Section */}
            <section className="py-24 bg-linear-to-b from-black to-purple-950/30">
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-linear-to-br from-purple-700 to-purple-900 p-6 rounded-2xl border border-purple-500/30"
                        >
                            <div className="text-4xl mb-2">🍺</div>
                            <h3 className="text-2xl font-bold mb-2">£2</h3>
                            <p className="text-purple-200">Selected Beers</p>
                            <p className="text-sm text-purple-300 mt-2">Before midnight (Fri)</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-linear-to-br from-purple-600 to-purple-800 p-6 rounded-2xl border border-purple-400/30"
                        >
                            <div className="text-4xl mb-2">🍹</div>
                            <h3 className="text-2xl font-bold mb-2">£5</h3>
                            <p className="text-purple-200">House Cocktails</p>
                            <p className="text-sm text-purple-300 mt-2">All night</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-linear-to-br from-purple-700 to-purple-900 p-6 rounded-2xl border border-purple-500/30"
                        >
                            <div className="text-4xl mb-2">🥃</div>
                            <h3 className="text-2xl font-bold mb-2">£3</h3>
                            <p className="text-purple-200">Shots</p>
                            <p className="text-sm text-purple-300 mt-2">Jaeger, Sambuca & more</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-linear-to-br from-purple-600 to-purple-800 p-6 rounded-2xl border-2 border-purple-400/50"
                        >
                            <div className="text-4xl mb-2">🎓</div>
                            <h3 className="text-2xl font-bold mb-2">Student Night</h3>
                            <p className="text-purple-200">£2 Drinks All Night</p>
                            <p className="text-sm text-purple-300 mt-2">Every Friday with NUS</p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 grid md:grid-cols-2 gap-6"
                    >
                        <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-3">🍾 VIP Bottle Service</h4>
                            <p className="text-purple-300 mb-4">Reserve a table and get premium bottle service with mixers and ice</p>
                            <ul className="text-purple-200 text-sm space-y-2">
                                <li>• Grey Goose Vodka - £120</li>
                                <li>• Champagne - £80</li>
                                <li>• Premium spirits from £100</li>
                            </ul>
                        </div>

                        <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="text-xl font-bold mb-3">⚡ Pre-Drinks Package</h4>
                            <p className="text-purple-300 mb-4">Get the party started before you hit the club</p>
                            <ul className="text-purple-200 text-sm space-y-2">
                                <li>• 4 Cocktails + Entry - £20</li>
                                <li>• Available 9PM - 11PM</li>
                                <li>• Skip the queue</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DJs Section */}
            <section id="performers" className="py-24 bg-linear-to-b from-purple-950/30 via-purple-950/50 to-black">
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

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {djs.map((dj) => (
                            <PerformerCard key={dj.id} performer={dj} variant="konfusion" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

                <PhotoGallery photos={galleryPhotos} variant="konfusion" />
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-linear-to-b from-purple-900/30 to-black">
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
                                With a state-of-the-art sound system, mind-bending light shows, and the best DJs in the game, we create experiences that blur the line between reality and pure euphoria. Whether you&apos;re here for £2 drinks on student night or an underground techno marathon – welcome to the chaos.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <Clock className="w-6 h-6 mt-1 text-purple-400" />
                                    <div>
                                        <h4 className="font-semibold mb-1">Opening Hours</h4>
                                        <p className="text-purple-300 text-sm">Friday: 10PM - 4AM</p>
                                        <p className="text-purple-300 text-sm">Saturday: 10PM - 5AM</p>
                                        <p className="text-purple-300 text-sm">Special Events: Varies</p>
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
                                    🎓 Student Specials
                                </h4>
                                <ul className="text-purple-200 space-y-1 text-sm">
                                    <li>• Free entry before 11PM with valid NUS card</li>
                                    <li>• £2 drinks until midnight every Friday</li>
                                    <li>• 20% off all tickets with student email</li>
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
            <footer className="bg-black border-t border-purple-900/50 py-12">
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
                            © 2024 Konfusion. Over 18s only. ID required.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}