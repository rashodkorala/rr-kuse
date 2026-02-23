'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, MapPin } from 'lucide-react';

export default function KonfusionAboutSection() {
  return (
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
              Welcome to Konfusion, St. John&apos;s hottest nightclub. Located at the heart of the iconic George
              Street in St. John&apos;s, Newfoundland and Labrador. This high-energy multi-level bar offers the
              ultimate nightlife experience in the capital city, featuring some of the province&apos;s top DJs
              and performers every weekend.
            </p>
            <p className="text-lg text-purple-200 mb-6 leading-relaxed">
              Dive into the vibrant atmosphere of Konfusion, where the music never stops and the party lasts
              all night. With our state-of-the-art sound and lighting systems, we promise an unforgettable
              experience that will keep you coming back for more. Whether you&apos;re celebrating a special
              occasion or just looking for a night out with friends, Konfusion is the place to be.
            </p>
            <p className="text-lg text-purple-200 mb-6 leading-relaxed">
              Enjoy our wide selection of drinks at the bar, hit the dance floor with your friends, or reserve
              a VIP section for an exclusive experience complete with bottle service.
            </p>
            <p className="text-lg text-purple-200 mb-6 leading-relaxed">
              Konfusion is St. John&apos;s premier destination for nightlife and entertainment.
            </p>
            <p className="text-lg text-purple-200 mb-8 leading-relaxed">
              Looking to host a private party, fundraiser, VIP party, pub crawl, or bus crawl? Hit us up, we
              will do all the planning so you don&apos;t have to!
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
                  <p className="text-purple-300 text-sm">391 Duckworth St</p>
                  <p className="text-purple-300 text-sm">St. John&apos;s, NL A1C 1H7</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <Image
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800"
              alt="Konfusion club"
              width={800}
              height={600}
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
  );
}
