'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

export default function RobRoyAboutSection() {
  return (
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
              Welcome to The Rob Roy, St. John&apos;s oldest bar. Located at the heart of the iconic George Street
              in St. John&apos;s, Newfoundland and Labrador. This lively and energetic pub offers live local
              music, mixed in with sets from some of the city&apos;s top local DJs to keep the party going all
              night long.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              From rock to country music to every genre in between, The Rob Roy has a little something for
              every music fan. Take advantage of some of the cheapest drink deals on George Street with our
              weekly events like Toonie Tuesday, Open Mic Wednesday, 345 Thursdays, and more.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Planning a private party or fundraiser? Rent out the Rob Roy &quot;Patio&quot; for the ultimate
              experience, complete with a private bar, beer pong tables, large projector screens and more.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              The Rob Roy is your one-stop shop for the ultimate party on George Street. We Install and
              Service Hangovers.
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
                  <p className="text-gray-400 text-sm">391 Duckworth St</p>
                  <p className="text-gray-400 text-sm">St. John&apos;s, NL A1C 1H7</p>
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
  );
}
