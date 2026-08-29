"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGsapParallaxOptions {
  /** How far the image drifts as its section scrolls through the viewport,
   * in percent of the image's own height. Higher = more dramatic. */
  strength?: number;
}

/**
 * Classic scroll-scrubbed parallax for a banner image: the element behind
 * `imageRef` drifts vertically — slower than the page — as `triggerRef`
 * scrolls through the viewport, so it reads as sitting "behind" the
 * content instead of pinned flat to it.
 *
 * `triggerRef` is passed in (rather than created here) so this can share
 * the same section element another hook is already using as a ref target
 * — e.g. `useGsapBlogAnimation`'s `containerRef` — without needing to merge
 * two refs onto one DOM node.
 *
 * The image element `imageRef` is attached to must be sized larger than
 * its container (e.g. `scale(1.15)` or `height: 120%` in CSS) so the drift
 * never reveals an empty edge — this hook only handles the motion, not the
 * oversizing.
 */
export const useGsapParallax = (
  triggerRef: RefObject<HTMLElement | null>,
  { strength = 20 }: UseGsapParallaxOptions = {},
) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current || !imageRef.current) return;

      const mm = gsap.matchMedia();

      // Full strength on tablet/desktop; gentler on small phones, where a
      // large drift is more likely to reveal empty edges on short screens.
      // Both conditions must be listed explicitly — matchMedia.add() only
      // invokes its callback for combinations that actually match, so
      // without an explicit "desktop" branch the animation would silently
      // never run at all above the mobile breakpoint.
      mm.add(
        {
          isMobile: "(max-width: 640px)",
          isDesktop: "(min-width: 641px)",
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const distance = isMobile ? strength * 0.5 : strength;

          gsap.fromTo(
            imageRef.current,
            { yPercent: -distance / 2 },
            {
              yPercent: distance / 2,
              ease: "none",
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: triggerRef },
  );

  return { imageRef };
};
