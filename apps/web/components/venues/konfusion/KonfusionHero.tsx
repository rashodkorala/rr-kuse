'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Headphones } from 'lucide-react';

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

export default function KonfusionHero() {
  const [particleData] = useState<ParticleData[]>(() => generateParticleData());

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/92" />

      <div className="absolute inset-0 overflow-hidden">
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{ left: particle.left } as React.CSSProperties}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
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
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-6"
          >
            <Image
              src="/konfusion-logo.png"
              alt="Konfusion"
              width={80}
              height={80}
              className="h-20 w-auto mx-auto"
            />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 bg-linear-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            KONFUSION
          </h1>

          <p className="text-xl md:text-2xl font-light text-purple-200 mb-2">
            <span className="italic">(n.)</span> a lack of order
          </p>
          <p className="text-xl md:text-2xl font-light text-purple-200 mb-8">or regular arrangement</p>

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
        </motion.div>
      </div>

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
  );
}
