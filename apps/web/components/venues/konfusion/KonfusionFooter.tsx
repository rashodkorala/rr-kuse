'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Twitter, Music, Mail } from 'lucide-react';

export default function KonfusionFooter() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/konfusion-logo.png"
              alt="Konfusion"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
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
            <a href="mailto:hildacoffey@hotmail.com" className="hover:text-purple-500 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="text-gray-500 text-sm text-center md:text-right space-y-1">
            <p>&copy; 2024 Konfusion. Over 18s only. ID required.</p>
            <p>
              Website by{' '}
              <a
                href="https://rashodkorala.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
              >
                rashodkorala.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
