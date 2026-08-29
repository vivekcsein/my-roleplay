import { useMemo } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import type { HeroConfig } from "../configs/hero.config";

export const useSwiperOptions = (config: HeroConfig): SwiperOptions => {
  const {
    autoplay = true,
    autoplayDelay = 5000,
    effect = "fade",
    showPagination = true,
    showNavigation = true,
  } = config;

  return useMemo(
    () => ({
      modules: [Navigation, Pagination, Autoplay, EffectFade],
      effect,
      speed: 800,
      loop: true,
      autoplay: autoplay
        ? { delay: autoplayDelay, disableOnInteraction: false }
        : false,
      pagination: showPagination
        ? {
            el: ".custom-swiper-pagination",
            clickable: true,
          }
        : false,
      navigation: showNavigation
        ? {
            prevEl: ".custom-swiper-prev",
            nextEl: ".custom-swiper-next",
          }
        : false,
    }),
    [autoplay, autoplayDelay, effect, showPagination, showNavigation],
  );
};
