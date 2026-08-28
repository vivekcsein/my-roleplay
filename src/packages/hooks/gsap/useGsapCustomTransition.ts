"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";

export type AnimationStyle = "slideUpScale" | "skewFade" | "elasticPop";

interface UseGsapTransitionOptions {
  preset?: AnimationStyle;
  duration?: number;
  stagger?: number;
  ease?: string;
}

export const useGsapCustomTransition = (
  options: UseGsapTransitionOptions = {},
) => {
  const {
    preset = "slideUpScale",
    duration = 0.9,
    stagger = 0.12,
    ease = "power4.out",
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const activeSlideContainer = containerRef.current.querySelector(
        '.swiper-slide-active [data-animate="true"]',
      );
      if (!activeSlideContainer) return;

      const elements = activeSlideContainer.querySelectorAll(".gsap-animate");
      if (!elements.length) return;

      // Define presets for custom transition dynamics
      const getAnimationParams = () => {
        switch (preset) {
          case "skewFade":
            return {
              from: { opacity: 0, y: 40, skewY: 4, scale: 0.96 },
              to: { opacity: 1, y: 0, skewY: 0, scale: 1 },
            };
          case "elasticPop":
            return {
              from: { opacity: 0, scale: 0.85, y: 20 },
              to: { opacity: 1, scale: 1, y: 0 },
            };
          default:
            return {
              from: { opacity: 0, y: 50, scale: 0.98 },
              to: { opacity: 1, y: 0, scale: 1 },
            };
        }
      };

      const { from, to } = getAnimationParams();

      // Kill active tweens to prevent overlap during rapid slide switches
      gsap.killTweensOf(elements);

      gsap.fromTo(elements, from, {
        ...to,
        duration,
        stagger,
        ease,
        clearProps: "transform",
      });
    },
    { dependencies: [activeIndex, preset], scope: containerRef },
  );

  return { containerRef, handleSlideChange, activeIndex };
};
