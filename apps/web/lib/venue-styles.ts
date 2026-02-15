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
    container: string;
    shadow: string;
    imageOverlay: string;
    overlay: string;
    typeBadge: string;
    accentText: string;
    nameText: string;
    genreText: string;
    bioText: string;
    socialButton: string;
    socialButtonHover: string;
    nextBadge: string;
    nextBadgeGlow: string;
    divider: string;
  };
  photoGallery: {
    hoverOverlay: string;
  };
  dealCard: {
    container: string;
    imageOverlay: string;
    dayBadge: string;
    titleText: string;
    descriptionText: string;
    activeDayTab: string;
    inactiveDayTab: string;
    highlight: string;
  };
};

const venueStyles: Record<VenueVariant, VenueStyleConfig> = {
  robroy: {
    nav: {
      scrolledContainer:
        "bg-black/35 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40",
      switchVenueButton:
        "bg-purple-600/80 hover:bg-purple-500/90 text-white border-purple-500/40 hover:border-purple-400/70 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all duration-300",
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
      container:
        "bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-white/10 hover:border-orange-500/40",
      shadow: "shadow-xl hover:shadow-2xl hover:shadow-orange-900/20",
      imageOverlay:
        "bg-gradient-to-t from-zinc-900 via-transparent to-transparent",
      overlay:
        "bg-gradient-to-t from-black/95 via-orange-950/45 to-transparent",
      typeBadge: "bg-orange-600/90 text-white",
      accentText: "text-orange-400",
      nameText: "text-white",
      genreText: "text-orange-200/70",
      bioText: "text-gray-400",
      socialButton:
        "bg-white/10 text-white/70 hover:bg-orange-600 hover:text-white",
      socialButtonHover: "hover:shadow-lg hover:shadow-orange-600/20",
      nextBadge: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
      nextBadgeGlow: "",
      divider: "border-white/10",
    },
    photoGallery: {
      hoverOverlay: "bg-orange-900/60",
    },
    dealCard: {
      container:
        "bg-zinc-950/80 border border-orange-600/25 hover:border-orange-500/50 transition-all duration-300",
      imageOverlay:
        "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
      dayBadge: "bg-orange-600 text-white",
      titleText: "text-white",
      descriptionText: "text-gray-400",
      activeDayTab:
        "bg-orange-600 text-white shadow-lg shadow-orange-600/30",
      inactiveDayTab:
        "bg-zinc-900/80 text-gray-400 hover:text-white hover:bg-zinc-800/80",
      highlight: "text-orange-400",
    },
  },
  konfusion: {
    nav: {
      scrolledContainer:
        "bg-black/35 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-black/40",
      switchVenueButton:
        "bg-orange-600/80 hover:bg-orange-500/90 text-white border-orange-500/40 hover:border-orange-400/70 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all duration-300",
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
      container:
        "bg-gradient-to-b from-zinc-900/60 to-black border border-purple-500/15 hover:border-purple-400/40",
      shadow: "shadow-xl hover:shadow-2xl hover:shadow-purple-900/30",
      imageOverlay:
        "bg-gradient-to-t from-black via-transparent to-transparent",
      overlay:
        "bg-gradient-to-t from-black/95 via-purple-950/55 to-transparent",
      typeBadge: "bg-purple-600/90 text-white",
      accentText: "text-purple-400",
      nameText: "text-white",
      genreText: "text-purple-200/70",
      bioText: "text-purple-200/60",
      socialButton:
        "bg-white/10 text-white/70 hover:bg-purple-600 hover:text-white",
      socialButtonHover: "hover:shadow-lg hover:shadow-purple-600/20",
      nextBadge: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
      nextBadgeGlow: "",
      divider: "border-purple-500/15",
    },
    photoGallery: {
      hoverOverlay: "bg-purple-900/70",
    },
    dealCard: {
      container:
        "bg-black/60 border border-purple-500/25 hover:border-purple-400/50 transition-all duration-300",
      imageOverlay:
        "bg-gradient-to-t from-black/80 via-black/20 to-transparent",
      dayBadge: "bg-purple-600 text-white",
      titleText: "text-white",
      descriptionText: "text-purple-200/80",
      activeDayTab:
        "bg-purple-600 text-white shadow-lg shadow-purple-600/30",
      inactiveDayTab:
        "bg-black/60 text-purple-300/60 hover:text-white hover:bg-black/80",
      highlight: "text-purple-400",
    },
  },
};

export function getVenueStyles(variant: VenueVariant): VenueStyleConfig {
  return venueStyles[variant];
}
