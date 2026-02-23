'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function KonfusionContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 bg-zinc-950/80 border-t border-white/10 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(147,51,234,0.08),transparent_70%)]"
        aria-hidden
      />
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">CONTACT</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-white/90">
            <a href="mailto:hildacoffey@hotmail.com" className="hover:text-purple-400 transition-colors">
              <span className="text-white/60 text-sm tracking-wider">E /</span> hildacoffey@hotmail.com
            </a>
            <a href="tel:+17097396270" className="hover:text-purple-400 transition-colors">
              <span className="text-white/60 text-sm tracking-wider">T /</span> 709-739-6270
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
