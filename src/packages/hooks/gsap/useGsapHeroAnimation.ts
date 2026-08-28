"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";

export const useGsapHeroAnimation = () => {
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

      const animatedElements =
        activeSlideContainer.querySelectorAll(".gsap-animate");
      if (!animatedElements.length) return;

      gsap.fromTo(
        animatedElements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [activeIndex], scope: containerRef },
  );

  return { containerRef, handleSlideChange, activeIndex };
};
