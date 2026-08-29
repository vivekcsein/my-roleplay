"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Entrance animations for the `/blogs` pages. Attach `containerRef` to the
 * outermost wrapper, then mark elements with one of two classes:
 *
 * - `.gsap-animate-hero`  — masthead content (eyebrow/title/subtitle/meta).
 *   Fades + slides in once, staggered, as soon as the page mounts — this is
 *   always above the fold so there's no need to wait for scroll.
 * - `.gsap-animate-card`  — grid/card items (e.g. `BlogCard`). Revealed in
 *   batches via ScrollTrigger as they scroll into view, so cards further
 *   down the index page don't all animate before the user ever sees them.
 *
 * Safe to use on pages that only have one of the two groups — an empty
 * `querySelectorAll` result is a no-op for both branches.
 */
export const useGsapBlogAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const heroElements =
        containerRef.current.querySelectorAll(".gsap-animate-hero");
      if (heroElements.length) {
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
        );
      }

      const cardElements =
        containerRef.current.querySelectorAll(".gsap-animate-card");
      if (cardElements.length) {
        ScrollTrigger.batch(cardElements, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
              },
            ),
        });
      }
    },
    { scope: containerRef },
  );

  return { containerRef };
};
