import type { AnimationStyle } from "../hooks/gsap/useGsapCustomTransition";

export interface HeroSlide {
  id: string;
  badge?: string;
  title: string;
  description: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  /**
   * Background image. Either a single URL used at every screen size, or a
   * per-breakpoint object so you can art-direct a tighter crop for mobile
   * instead of relying on `object-cover` to crop a wide desktop image.
   * `desktop` is required as the fallback source; `mobile`/`tablet` are
   * optional overrides swapped in via CSS breakpoints (no JS/layout shift).
   */
  imageUrl?: string | { mobile?: string; tablet?: string; desktop: string };
  customContent?: React.ReactNode;
}

export interface HeroConfig {
  slides: HeroSlide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  effect?: "fade" | "slide";
  transitionPreset?: AnimationStyle;
  showPagination?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export const heroConfigData: HeroConfig = {
  autoplay: true,
  autoplayDelay: 5000,
  effect: "fade",
  transitionPreset: "skewFade",
  showPagination: true,
  showNavigation: true,
  className: "h-[90vh] min-h-[600px]",
  slides: [
    {
      id: "gta-6-extended-look",
      badge: "GTA 6 Reveal",
      title:
        "GTA 6 Extended Look: 26 Minutes of Vice City & Dynamic Character Switching",
      description:
        "Rockstar drops an extensive gameplay showcase featuring Jason and Lucia. Explore dynamic NPC interactions, expanded Leonida mapping, and seamless crime mechanics.",
      primaryCta: {
        text: "Watch Showcase",
        href: "https://youtu.be/tJbzMqJGH4k",
      },
      secondaryCta: {
        text: "Breakdown & Lore",
        href: "https://youtu.be/toQkKWEs2iE",
      },
      imageUrl:
        "https://cdna.artstation.com/p/assets/images/images/083/606/350/large/nishal-basheer-sketch1736346215942.jpg?1736358261",
    },
    {
      id: "grand-rp-migration-2026",
      badge: "Grand RP News",
      title:
        "Grand Role Play Major Expansion: Shifting to FiveM, Serbian Server Already migrated",
      description:
        "Grand RP is shifting to FiveM, and the Serbian server has already been migrated. Check out the new features and get ready to play like a five-year veteran!",
      primaryCta: {
        text: "View Grand RP Guide",
        href: "/blogs/grand-rp-update-aug-2026",
      },
      secondaryCta: {
        text: "Visit Serbian Server",
        href: "https://gta5grand.com/",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "fivem-enhanced-launch",
      badge: "FiveM Platform Update",
      title:
        "FiveM Enhanced Early Access: Next-Gen Graphics & 120 Tick Servers",
      description:
        "Rockstar's official FiveM team launches support for GTA V Enhanced. Experience higher tick rates, overhauled network sync, and GTA VI-rivaling visual upgrades on supported RP servers.",
      primaryCta: {
        text: "Read RP Update",
        href: "/news/fivem-enhanced-launch",
      },
      secondaryCta: {
        text: "Server Patch Notes",
        href: "/guides/fivem-enhanced-setup",
      },
      imageUrl:
        "https://c4.wallpaperflare.com/wallpaper/821/1/187/core-roleplay-grand-theft-auto-grand-theft-auto-v-roleplaying-fivem-hd-wallpaper-preview.jpg",
    },
  ],
};
