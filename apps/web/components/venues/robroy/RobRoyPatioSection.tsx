'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

export default function RobRoyPatioSection() {
  return (
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
              Looking for the perfect venue for your next event? Our spacious heated patio is available for
              private hire. Whether it&apos;s a birthday party, corporate event, or celebration, we&apos;ve got
              you covered.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm">&#10003;</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Heated & Covered</h4>
                  <p className="text-gray-400 text-sm">
                    Comfortable year-round with outdoor heaters and weather protection
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm">&#10003;</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Capacity up to 198</h4>
                  <p className="text-gray-400 text-sm">Perfect for medium to large gatherings</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-white text-sm">&#10003;</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Private Bar & Sound System</h4>
                  <p className="text-gray-400 text-sm">
                    Dedicated bar service and quality audio for your event
                  </p>
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
              <Button
                size="lg"
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600/10"
              >
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
              <p className="text-3xl font-bold text-white">198</p>
              <p className="text-sm uppercase tracking-wider text-orange-100">Guest capacity</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
