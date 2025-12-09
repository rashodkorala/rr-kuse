'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '../utils';
import { Beer, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState<'robroy' | 'konfusion' | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      {/* Rob Roy Side */}
      <motion.div
        className="absolute top-0 left-0 h-full cursor-pointer overflow-hidden"
        initial={{ width: '50%' }}
        animate={{
          width: hoveredSide === 'robroy' ? '65%' : hoveredSide === 'konfusion' ? '35%' : '50%'
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setHoveredSide('robroy')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Link href={createPageUrl('RobRoy')} className="block h-full w-full relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200)',
            }}
          />
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-black/85 via-orange-900/80 to-black/90"
            animate={{ opacity: hoveredSide === 'robroy' ? 0.75 : 0.85 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-white p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: hoveredSide === 'robroy' ? 1.1 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Beer className="w-16 h-16 mx-auto mb-6 opacity-90" />
              </motion.div>

              <h1 className="font-bold text-5xl md:text-7xl tracking-tight mb-4">
                ROB ROY
              </h1>

              <p className="text-lg md:text-xl font-light tracking-widest uppercase opacity-80 mb-2">
                We Install & Service Hangovers
              </p>

              <p className="text-sm md:text-base tracking-widest opacity-70 mb-8">
                EST. 1977
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredSide === 'robroy' ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center justify-center gap-2 text-white/90"
              >
                <span className="text-lg">Enter the Pub</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-60">
              <span className="text-sm tracking-widest">EST. LOCAL PUB</span>
              <span className="text-sm tracking-widest">LIVE MUSIC</span>
            </div>
          </div>

          {/* Animated border */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-1 bg-linear-to-b from-orange-400 via-white to-orange-400"
            animate={{ opacity: hoveredSide === 'robroy' ? 1 : 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </Link>
      </motion.div>

      {/* Konfusion Side */}
      <motion.div
        className="absolute top-0 right-0 h-full cursor-pointer overflow-hidden"
        initial={{ width: '50%' }}
        animate={{
          width: hoveredSide === 'konfusion' ? '65%' : hoveredSide === 'robroy' ? '35%' : '50%'
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        onMouseEnter={() => setHoveredSide('konfusion')}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <Link href={createPageUrl('Konfusion')} className="block h-full w-full relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80)',
            }}
          />
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-bl from-purple-900/90 via-violet-800/85 to-purple-950/95"
            animate={{ opacity: hoveredSide === 'konfusion' ? 0.75 : 0.85 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-center text-white p-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  scale: hoveredSide === 'konfusion' ? 1.1 : 1,
                  rotate: hoveredSide === 'konfusion' ? [0, -10, 10, 0] : 0
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-90" />
              </motion.div>

              <h1 className="font-bold text-5xl md:text-7xl tracking-tight mb-4">
                KONFUSION
              </h1>

              <p className="text-lg md:text-xl font-light tracking-wide opacity-80 mb-2">
                <span className="italic">(n.)</span> a lack of order
              </p>
              <p className="text-lg md:text-xl font-light tracking-wide opacity-80 mb-8">
                or regular arrangement
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredSide === 'konfusion' ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-center justify-center gap-2 text-white/90"
              >
                <span className="text-lg">Enter the Club</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-60">
              <span className="text-sm tracking-widest">NIGHTCLUB</span>
              <span className="text-sm tracking-widest">DJ NIGHTS</span>
            </div>
          </div>

          {/* Animated border */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-purple-400 via-white to-purple-400"
            animate={{ opacity: hoveredSide === 'konfusion' ? 1 : 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </Link>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden absolute inset-0 flex flex-col">
        <Link
          href={createPageUrl('RobRoy')}
          className="flex-1 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800)',
            }}
          />
          <div className="absolute inset-0 bg-linear-to-br from-black/90 via-orange-900/85 to-black/95" />
          <div className="relative h-full flex flex-col justify-center items-center text-white p-6">
            <Beer className="w-12 h-12 mb-4" />
            <h2 className="font-bold text-4xl mb-2">ROB ROY</h2>
            <p className="text-sm tracking-widest opacity-80 mb-1">WE INSTALL & SERVICE HANGOVERS</p>
            <p className="text-xs tracking-widest opacity-60">EST. 1977</p>
            <div className="mt-4 flex items-center gap-2">
              <span>Enter</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link
          href={createPageUrl('Konfusion')}
          className="flex-1 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800)',
            }}
          />
          <div className="absolute inset-0 bg-linear-to-bl from-purple-900/90 via-violet-800/85 to-purple-950/95" />
          <div className="relative h-full flex flex-col justify-center items-center text-white p-6">
            <Sparkles className="w-12 h-12 mb-4" />
            <h2 className="font-bold text-4xl mb-2">KONFUSION</h2>
            <p className="text-sm tracking-wide opacity-80 italic">(n.) a lack of order</p>
            <div className="mt-4 flex items-center gap-2">
              <span>Enter</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}