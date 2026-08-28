"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { HeroConfig } from "@/packages/configs/hero.config";
import { useGsapCustomTransition } from "@/packages/hooks/gsap/useGsapCustomTransition";
import { useSwiperOptions } from "@/packages/hooks/useSwiperOptions";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

interface HeroProps {
  config: HeroConfig;
}

export const HeroSection: React.FC<HeroProps> = ({ config }) => {
  const {
    slides,
    transitionPreset = "skewFade",
    showPagination = true,
    showNavigation = true,
    className = "",
  } = config;

  const { containerRef, handleSlideChange } = useGsapCustomTransition({
    preset: transitionPreset,
    duration: 1,
    stagger: 0.14,
    ease: "power3.out",
  });

  const swiperOptions = useSwiperOptions(config);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-background text-foreground ${className}`}
    >
      <Swiper
        {...swiperOptions}
        onSlideChange={handleSlideChange}
        className="w-full h-[85vh] min-h-137.5 max-h-225"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div data-animate="true" className="relative w-full h-full">
              {slide.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                    width={1920}
                    height={1080}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-background/40" />
                </div>
              )}

              <div className="relative z-10 container mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-24">
                {slide.customContent ? (
                  <div className="gsap-animate">{slide.customContent}</div>
                ) : (
                  <div className="max-w-3xl space-y-4 md:space-y-6">
                    {slide.badge && (
                      <div className="gsap-animate inline-flex items-center rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs md:text-sm font-semibold text-secondary-foreground backdrop-blur-md">
                        {slide.badge}
                      </div>
                    )}

                    <h1 className="gsap-animate text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                      {slide.title}
                    </h1>

                    <p className="gsap-animate text-base sm:text-lg md:text-xl text-muted-foreground line-clamp-3 max-w-2xl">
                      {slide.description}
                    </p>

                    <div className="gsap-animate flex flex-wrap gap-4 pt-2">
                      {slide.primaryCta && (
                        <a
                          href={slide.primaryCta.href}
                          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm md:text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {slide.primaryCta.text}
                        </a>
                      )}
                      {slide.secondaryCta && (
                        <a
                          href={slide.secondaryCta.href}
                          className="inline-flex items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-md px-6 py-3 text-sm md:text-base font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {slide.secondaryCta.text}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <div className="hidden sm:flex absolute right-8 bottom-8 z-20 items-center gap-2">
          <button
            type="button"
            aria-label="Previous Slide"
            className="custom-swiper-prev flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-accent hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next Slide"
            className="custom-swiper-next flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-accent hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="custom-swiper-pagination absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 [&_.swiper-pagination-bullet]:bg-muted-foreground [&_.swiper-pagination-bullet-active]:bg-primary [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet]:rounded-full" />
      )}
    </div>
  );
};
