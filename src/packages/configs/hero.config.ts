import type { AnimationStyle } from "../hooks/gsap/useGsapCustomTransition";

export interface HeroSlide {
  id: string;
  badge?: string;
  title: string;
  description: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  imageUrl?: string;
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
      id: "eldoria-review",
      badge: "Featured Content",
      title: "ELDORIA ARRIVES! | Comprehensive Review & New Beginner's Guide",
      description:
        "Discover the world of Eldoria, available today. Read our detailed breakdown of core gameplay mechanics, beginner strategies, and world lore.",
      primaryCta: { text: "Read Review", href: "/reviews/eldoria" },
      secondaryCta: { text: "Watch Trailer", href: "/media/eldoria-trailer" },
      imageUrl:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "esports-arena-live",
      badge: "Pro League Finals Live",
      title: "Global Esports Arena: Match Analysis, Standings & Results",
      description:
        "Watch the intense final battles unfold live in the championship arena. Track your favorite teams and real-time tournament standings.",
      primaryCta: { text: "Watch Now", href: "/live/esports-finals" },
      secondaryCta: { text: "View Standings", href: "/esports/standings" },
      imageUrl:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80",
    },
    {
      id: "mw3-loadouts",
      badge: "Meta Strategy",
      title: "Top Loadouts & Class Setups for Competitive Domination",
      description:
        "Dominating MW3: The Best Class Setups. Master the current competitive meta with our expert attachment breakdowns and weapon perks.",
      primaryCta: { text: "Get The Guide", href: "/guides/mw3-loadouts" },
      imageUrl:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1920&q=80",
    },
  ],
};
