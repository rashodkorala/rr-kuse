export type VenueVariant = "robroy" | "konfusion";

type VenueStyleConfig = {
  nav: {
    scrolledContainer: string;
    switchVenueButton: string;
    mobileSheet: string;
  };
  eventCard: {
    container: string;
    imageOverlay: string;
    dateBadge: string;
    descriptionText: string;
    metaText: string;
    ctaButton: string;
    upcomingBadge: string;
  };
  performerCard: {
    shadow: string;
    overlay: string;
    accentText: string;
    genreText: string;
    socialButton: string;
    nextBadge: string;
  };
  photoGallery: {
    hoverOverlay: string;
  };
};

const venueStyles: Record<VenueVariant, VenueStyleConfig> = {
  robroy: {
    nav: {
      scrolledContainer:
        "bg-black/35 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40",
      switchVenueButton:
        "bg-orange-600/80 hover:bg-orange-700/90 text-white border-orange-500/40 hover:border-orange-400/70",
      mobileSheet: "bg-black/85 backdrop-blur-xl border-l border-white/10",
    },
    eventCard: {
      container:
        "bg-gradient-to-br from-zinc-950 to-zinc-900 border border-orange-600/35",
      imageOverlay: "bg-orange-900/20",
      dateBadge: "bg-orange-600/90 text-white",
      descriptionText: "text-gray-400",
      metaText: "text-gray-400",
      ctaButton: "bg-orange-600 hover:bg-orange-700 text-white",
      upcomingBadge: "bg-orange-500 text-white",
    },
    performerCard: {
      shadow: "shadow-xl",
      overlay:
        "bg-gradient-to-t from-black/95 via-orange-950/45 to-transparent",
      accentText: "text-orange-300",
      genreText: "text-orange-100/80",
      socialButton: "bg-orange-600/50 hover:bg-orange-600",
      nextBadge: "bg-orange-500 text-white",
    },
    photoGallery: {
      hoverOverlay: "bg-orange-900/60",
    },
  },
  konfusion: {
    nav: {
      scrolledContainer:
        "bg-black/35 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-black/40",
      switchVenueButton:
        "bg-purple-600/80 hover:bg-purple-700/90 text-white border-purple-500/40 hover:border-purple-400/70",
      mobileSheet: "bg-black/85 backdrop-blur-xl border-l border-purple-500/20",
    },
    eventCard: {
      container:
        "bg-gradient-to-br from-zinc-950 to-black border border-purple-700/55",
      imageOverlay: "bg-purple-900/40",
      dateBadge: "bg-purple-600/90 text-white",
      descriptionText: "text-purple-200",
      metaText: "text-purple-300",
      ctaButton: "bg-purple-600 hover:bg-purple-700 text-white",
      upcomingBadge: "bg-purple-500 text-white",
    },
    performerCard: {
      shadow: "shadow-2xl shadow-purple-900/50",
      overlay:
        "bg-gradient-to-t from-black/95 via-purple-950/55 to-transparent",
      accentText: "text-purple-300",
      genreText: "text-purple-200/80",
      socialButton: "bg-purple-600/50 hover:bg-purple-600",
      nextBadge: "bg-purple-500 text-white",
    },
    photoGallery: {
      hoverOverlay: "bg-purple-900/70",
    },
  },
};

export function getVenueStyles(variant: VenueVariant): VenueStyleConfig {
  return venueStyles[variant];
}
