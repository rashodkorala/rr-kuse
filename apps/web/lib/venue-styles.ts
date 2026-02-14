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
      scrolledContainer: "bg-orange-600/95 backdrop-blur-md shadow-lg",
      switchVenueButton:
        "bg-orange-600/95 hover:bg-orange-700/95 text-white border-orange-500/50 hover:border-orange-400/70",
      mobileSheet: "bg-orange-700",
    },
    eventCard: {
      container:
        "bg-gradient-to-br from-gray-900 to-gray-800 border border-orange-600/30",
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
        "bg-gradient-to-t from-orange-900/90 via-orange-800/50 to-transparent",
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
      scrolledContainer: "bg-purple-950/95 backdrop-blur-md shadow-lg",
      switchVenueButton:
        "bg-purple-600/95 hover:bg-purple-700/95 text-white border-purple-500/50 hover:border-purple-400/70",
      mobileSheet: "bg-purple-900",
    },
    eventCard: {
      container:
        "bg-gradient-to-br from-purple-950 to-violet-900 border border-purple-700/50",
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
        "bg-gradient-to-t from-purple-950/95 via-purple-900/60 to-transparent",
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
