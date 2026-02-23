'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function KonfusionPatioSection() {
  return (
    <section
      id="patio"
      className="scroll-mt-24 py-24 bg-linear-to-b from-black via-purple-950/20 to-black border-t border-purple-500/10"
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-sm font-medium mb-6">
            <span aria-hidden>☀️</span>
            <span>Summer only</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Konfusion Patio</h2>
          <p className="text-lg text-purple-200 leading-relaxed mb-6">
            Make the most of the season at the Konfusion Patio. Our outdoor space is open during summer, so
            you can enjoy George Street&apos;s best nightlife under the sun and stars. Same great vibes, DJs,
            and drinks—with a breeze.
          </p>
          <p className="text-purple-300 text-sm">
            Open seasonally. Check our events and socials for summer hours and patio nights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
