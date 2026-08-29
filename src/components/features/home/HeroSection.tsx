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
import HeroCta from "./HeroCta";

interface HeroProps {
  config: HeroConfig;
}

/** Normalizes `slide.imageUrl` (string or per-breakpoint object) into the
 * up-to-3 sources we render, each gated behind a Tailwind breakpoint class
 * so the browser only downloads/paints the one matching its viewport. */
const resolveHeroImages = (
  imageUrl: NonNullable<HeroConfig["slides"][number]["imageUrl"]>,
) => {
  if (typeof imageUrl === "string") {
    return [{ src: imageUrl, wrapperClassName: "block" }];
  }

  const { mobile, tablet, desktop } = imageUrl;
  const images: { src: string; wrapperClassName: string }[] = [];

  if (mobile) {
    images.push({
      src: mobile,
      wrapperClassName: tablet ? "block md:hidden" : "block lg:hidden",
    });
  }
  if (tablet) {
    images.push({
      src: tablet,
      wrapperClassName: mobile
        ? "hidden md:block lg:hidden"
        : "block lg:hidden",
    });
  }
  images.push({
    src: desktop,
    wrapperClassName: mobile || tablet ? "hidden lg:block" : "block",
  });

  return images;
};

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
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div data-animate="true" className="relative w-full h-full">
              {slide.imageUrl && (
                <div className="absolute inset-0 z-0">
                  {resolveHeroImages(slide.imageUrl).map((image) => (
                    <div
                      key={image.src}
                      className={`absolute inset-0 ${image.wrapperClassName}`}
                    >
                      <Image
                        src={image.src}
                        alt={slide.title}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className="object-cover object-center"
                      />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-background/40" />
                </div>
              )}

              <div className="relative z-10 container mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-16 md:pb-24">
                {slide.customContent ? (
                  <div className="gsap-animate">{slide.customContent}</div>
                ) : (
                  <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4 md:space-y-6">
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

                    <div className="gsap-animate flex flex-wrap justify-center gap-4 pt-2">
                      {slide.primaryCta && <HeroCta cta={slide.primaryCta} />}
                      {slide.secondaryCta && (
                        <HeroCta cta={slide.secondaryCta} />
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
