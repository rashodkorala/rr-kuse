'use client';

import React from 'react';
import { motion } from 'framer-motion';
import DrinkDealsSection from '@/components/shared/drinkDealsSection';
import EmptyState from '@/components/shared/emptyState';
import type { DrinkDeal } from '@/components/shared/drinkDealsSection';

interface RobRoyDealsSectionProps {
  deals: DrinkDeal[];
}

export default function RobRoyDealsSection({ deals }: RobRoyDealsSectionProps) {
  const hasDeals = deals.length > 0;

  return (
    <section className="py-24 bg-linear-to-b from-black to-zinc-950">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Drink Deals</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {hasDeals ? 'Quality drinks at great prices' : ''}
          </p>
        </motion.div>

        {hasDeals ? (
          <DrinkDealsSection deals={deals} variant="robroy" />
        ) : (
          <EmptyState
            title="No deals available right now"
            message="We're cooking up some great deals. Check back soon!"
            variant="robroy"
          />
        )}
      </div>
    </section>
  );
}
