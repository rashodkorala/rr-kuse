'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Music, Headphones, Instagram, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { getVenueStyles, type VenueVariant } from "@/lib/venue-styles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Performer {
    name: string;
    type: 'dj' | 'band';
    genre: string;
    image: string;
    summary?: string;
    bio?: string;
    nextDate?: string;
    nextVenue?: string;
    instagram?: string;
    spotify?: string;
    soundcloud?: string;
    website?: string;
}

interface PerformerCardProps {
    performer: Performer;
    variant?: VenueVariant;
}

function SocialLinks({ performer, styles }: { performer: Performer; styles: ReturnType<typeof getVenueStyles>['performerCard'] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {performer.instagram && (
                <a
                    href={performer.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-300 ${styles.socialButton} ${styles.socialButtonHover}`}
                    aria-label={`${performer.name} on Instagram`}
                >
                    <Instagram className="w-4 h-4" />
                </a>
            )}
            {performer.spotify && (
                <a
                    href={performer.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-300 ${styles.socialButton} ${styles.socialButtonHover}`}
                    aria-label={`${performer.name} on Spotify`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                </a>
            )}
            {performer.soundcloud && (
                <a
                    href={performer.soundcloud}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-300 ${styles.socialButton} ${styles.socialButtonHover}`}
                    aria-label={`${performer.name} on SoundCloud`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.037.104-.094l.21-1.282-.21-1.332c-.014-.057-.047-.094-.104-.094m1.8-1.035c-.065 0-.112.049-.119.108l-.217 2.338.217 2.274c.007.06.054.108.119.108.064 0 .112-.048.119-.108l.248-2.274-.248-2.338c-.007-.06-.055-.108-.119-.108m.899-.372c-.074 0-.127.056-.133.117l-.2 2.709.2 2.6c.006.061.059.117.133.117.073 0 .126-.056.133-.117l.227-2.6-.227-2.709c-.007-.061-.06-.117-.133-.117m.9-.439c-.073 0-.135.063-.139.13l-.182 3.147.182 2.857c.004.067.066.13.139.13.075 0 .135-.063.142-.13l.209-2.857-.209-3.147c-.007-.067-.067-.13-.142-.13m.9-.183c-.082 0-.148.07-.153.14l-.17 3.33.17 2.96c.005.072.071.141.153.141.08 0 .148-.069.153-.141l.193-2.96-.193-3.33c-.005-.07-.073-.14-.153-.14m.9.07c-.091 0-.163.077-.167.153l-.153 3.26.153 3.028c.004.076.076.153.167.153.09 0 .163-.077.167-.153l.176-3.028-.176-3.26c-.004-.076-.077-.153-.167-.153m.9-.135c-.1 0-.178.084-.181.166l-.14 3.395.14 3.073c.003.082.081.166.181.166.099 0 .178-.084.181-.166l.16-3.073-.16-3.395c-.003-.082-.082-.166-.181-.166m.9-.087c-.11 0-.192.091-.195.18l-.125 3.482.125 3.1c.003.088.085.179.195.179.108 0 .191-.091.194-.179l.144-3.1-.144-3.482c-.003-.089-.086-.18-.194-.18m1.1-.023c-.007-.098-.098-.193-.205-.193-.11 0-.197.095-.205.193l-.12 3.506.12 3.13c.008.098.095.193.205.193.107 0 .198-.095.205-.193l.137-3.13-.137-3.506m.895.063c-.117 0-.208.098-.212.201l-.096 3.442.096 3.148c.004.104.095.201.212.201.117 0 .207-.097.212-.201l.108-3.148-.108-3.442c-.005-.103-.095-.201-.212-.201m1.108-.203c-.124 0-.22.105-.225.212l-.078 3.645.078 3.172c.005.107.101.212.225.212.123 0 .22-.105.225-.212l.09-3.172-.09-3.645c-.005-.107-.102-.212-.225-.212m1.1.012c-.131 0-.231.112-.235.225l-.065 3.633.065 3.17c.004.113.104.225.235.225.131 0 .232-.112.235-.225l.076-3.17-.076-3.633c-.003-.113-.104-.225-.235-.225m1.1-.199c-.139 0-.244.119-.248.237l-.05 3.832.05 3.187c.004.118.109.237.248.237.137 0 .244-.119.247-.237l.057-3.187-.057-3.832c-.003-.118-.11-.237-.247-.237m1.108-.178c-.147 0-.258.126-.262.25l-.033 4.01.033 3.19c.004.124.115.249.262.249.144 0 .257-.125.261-.249l.039-3.19-.039-4.01c-.004-.124-.117-.25-.261-.25m1.616 1.627c-.546 0-1.05.1-1.527.278-.151-1.657-1.539-2.953-3.236-2.953-.474 0-.926.106-1.338.287-.17.075-.214.15-.216.297v6.264c.002.154.122.28.275.296h6.042c1.288 0 2.333-1.034 2.333-2.313 0-1.278-1.045-2.356-2.333-2.356" />
                    </svg>
                </a>
            )}
            {performer.website && (
                <a
                    href={performer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-300 ${styles.socialButton} ${styles.socialButtonHover}`}
                    aria-label={`${performer.name} website`}
                >
                    <ExternalLink className="w-4 h-4" />
                </a>
            )}
        </div>
    );
}

export default function PerformerCard({ performer, variant = 'robroy' }: PerformerCardProps) {
    const styles = getVenueStyles(variant);
    const cardStyles = styles.performerCard;
    const Icon = performer.type === 'dj' ? Headphones : Music;
    const cardBlurb = performer.summary ?? '';
    const hasPopupContent = Boolean(performer.bio);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group rounded-2xl overflow-hidden transition-all duration-500 ${cardStyles.container} ${cardStyles.shadow}`}
        >
            {/* Image section */}
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={performer.image}
                    alt={performer.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${cardStyles.imageOverlay}`} />

                {/* Type badge - top left */}
                <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm ${cardStyles.typeBadge}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {performer.type === 'dj' ? 'DJ' : 'Live Band'}
                    </span>
                </div>

                {/* Next performance badge - top right */}
                {performer.nextDate && (
                    <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${cardStyles.nextBadge}`}>
                            <Calendar className="w-3 h-3" />
                            {performer.nextDate}
                        </span>
                    </div>
                )}
            </div>

            {/* Content section */}
            <div className="p-5">
                <h3 className={`text-xl font-bold mb-1 ${cardStyles.nameText}`}>
                    {performer.name}
                </h3>
                <p className={`text-sm font-medium mb-3 ${cardStyles.genreText}`}>
                    {performer.genre}
                </p>

                {/* Summary (full text on card) */}
                {cardBlurb && (
                    <p className={`text-sm leading-relaxed mb-4 ${cardStyles.bioText}`}>
                        {cardBlurb}
                    </p>
                )}

                {/* Read more + popup */}
                {hasPopupContent && (
                    <div className="mb-4">
                        <Dialog>
                            <DialogTrigger className={`text-sm font-medium underline underline-offset-2 ${cardStyles.genreText} hover:opacity-80`}>
                                Read more
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <div className="flex gap-4">
                                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                                            <Image src={performer.image} alt={performer.name} fill className="object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <DialogTitle className="text-lg">{performer.name}</DialogTitle>
                                            <p className={`text-sm ${cardStyles.genreText}`}>{performer.genre}</p>
                                        </div>
                                    </div>
                                </DialogHeader>
                                {performer.bio && (
                                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${cardStyles.bioText}`}>
                                        {performer.bio}
                                    </p>
                                )}
                                <SocialLinks performer={performer} styles={cardStyles} />
                            </DialogContent>
                        </Dialog>
                    </div>
                )}

                {/* Divider */}
                <div className={`border-t ${cardStyles.divider} pt-4`}>
                    <div className="flex items-center justify-between">
                        <SocialLinks performer={performer} styles={cardStyles} />
                        {performer.nextVenue && (
                            <span className={`inline-flex items-center gap-1 text-xs ${cardStyles.genreText}`}>
                                <MapPin className="w-3 h-3" />
                                {performer.nextVenue}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
