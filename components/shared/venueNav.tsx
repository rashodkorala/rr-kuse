'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createPageUrl } from '../../utils';
import { Menu, ArrowLeft, Beer, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getVenueStyles, type VenueVariant } from "@/lib/venue-styles";

interface VenueNavProps {
    variant?: VenueVariant;
    activeSection?: string;
}

export default function VenueNav({ variant = 'robroy', activeSection = 'home' }: VenueNavProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const isRobRoy = variant === 'robroy';
    const styles = getVenueStyles(variant);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'events', label: 'Events' },
        { id: 'performers', label: isRobRoy ? 'Bands' : 'DJs' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'about', label: 'About' },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
                    ? styles.nav.scrolledContainer
                    : 'bg-transparent'
                }
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo / Back */}
                    <Link
                        href={'/'}
                        className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {isRobRoy ? (
                            <div className="flex items-center gap-2">
                                <Beer className="w-6 h-6" />
                                <span className="font-bold text-xl">ROB ROY</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-6 h-6" />
                                <span className="font-bold text-xl">KONFUSION</span>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`
                  text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wider
                  ${activeSection === item.id ? 'text-white font-semibold' : ''}
                `}
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Switch Venue Button */}
                        <Link href={createPageUrl(isRobRoy ? 'Konfusion' : 'RobRoy')}>
                            <Button
                                variant="outline"
                                className={`
                                    ${styles.nav.switchVenueButton}
                                `}
                            >
                                Visit {isRobRoy ? 'Konfusion' : 'Rob Roy'}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="text-white">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className={`
                w-72 border-l-0
                ${styles.nav.mobileSheet}
              `}
                        >
                            <div className="flex flex-col gap-6 mt-8">
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="text-white text-lg text-left hover:opacity-80 transition-opacity"
                                    >
                                        {item.label}
                                    </button>
                                ))}

                                <hr className="border-white/20" />

                                <Link
                                    href={createPageUrl(isRobRoy ? 'Konfusion' : 'RobRoy')}
                                    className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                                >
                                    {isRobRoy ? <Sparkles className="w-5 h-5" /> : <Beer className="w-5 h-5" />}
                                    {isRobRoy ? 'Visit Konfusion' : 'Visit Rob Roy'}
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.nav>
    );
}