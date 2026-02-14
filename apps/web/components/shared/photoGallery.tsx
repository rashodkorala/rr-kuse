'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getVenueStyles, type VenueVariant } from "@/lib/venue-styles";

interface Photo {
    url: string;
    caption?: string;
}

interface PhotoGalleryProps {
    photos: Photo[];
    variant?: VenueVariant;
}

export default function PhotoGallery({ photos, variant = 'robroy' }: PhotoGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const styles = getVenueStyles(variant);

    const openLightbox = (index: number) => setSelectedIndex(index);
    const closeLightbox = () => setSelectedIndex(null);

    const goNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % photos.length);
        }
    };

    const goPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
        }
    };

    return (
        <>
            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {photos.map((photo: Photo, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-xl"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={photo.url}
                            alt={photo.caption || `Photo ${index + 1}`}
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className={`
              absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center
              ${styles.photoGallery.hoverOverlay}
            `}>
                            <ZoomIn className="w-8 h-8 text-white" />
                        </div>

                        {/* Caption */}
                        {photo.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-sm">{photo.caption}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
                <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95 border-none">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={goPrev}
                            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ChevronLeft className="w-8 h-8 text-white" />
                        </button>

                        <button
                            onClick={goNext}
                            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <ChevronRight className="w-8 h-8 text-white" />
                        </button>

                        {/* Image */}
                        <AnimatePresence mode="wait">
                            {selectedIndex !== null && photos[selectedIndex] && (
                                <motion.img
                                    key={selectedIndex}
                                    src={photos[selectedIndex].url}
                                    alt={photos[selectedIndex].caption || ''}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </AnimatePresence>

                        {/* Caption & Counter */}
                        {selectedIndex !== null && (
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                {photos[selectedIndex]?.caption && (
                                    <p className="text-white text-lg mb-2">{photos[selectedIndex].caption}</p>
                                )}
                                <p className="text-white/60 text-sm">
                                    {selectedIndex + 1} / {photos.length}
                                </p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}