import type { StaticImageData } from "next/image";

// GTA 5 images
import gta5RoleplayGuide from "@/assets/images/gta5/gta5-roleplay-guide.jpg";
// GTA 6 images
import gta6ExtendedLookCover from "@/assets/images/gta6/gta6-extended-look-cover.jpg";
import gta6ExtendedLook01 from "@/assets/images/gta6/gta6-extened-look-01.jpg";
import gta6ExtendedLook02 from "@/assets/images/gta6/gta6-extened-look-02.jpg";
import gta6ExtendedLook03 from "@/assets/images/gta6/gta6-extened-look-03.jpg";
import gta6ExtendedLook04 from "@/assets/images/gta6/gta6-extened-look-04.jpg";

// LifeInvader images
import lifeinvaderAdsPolicy from "@/assets/images/lifeinvader/lifeinvader-ads-policy.jpg";
// family images
import family7RankSystem from "@/assets/images/roleplay/family-7-ranking-system.jpg";
import family10RankSystem from "@/assets/images/roleplay/family-10-ranking-system.jpg";
import familyBonusSystem from "@/assets/images/roleplay/family-bonus-system.jpg";
import familyEventsSystem from "@/assets/images/roleplay/family-events-system.jpg";
// Roleplay images
import roleplayBasicTerms from "@/assets/images/roleplay/roleplay-basic-terms.jpg";
import roleplayFairplayRules from "@/assets/images/roleplay/roleplay-fairplay-rules.jpg";
import roleplayGeneralRules from "@/assets/images/roleplay/roleplay-general-rules.jpg";
import roleplayHowToMakeMoney from "@/assets/images/roleplay/roleplay-how-to-make-money.jpg";

/**
 * Single place to register every locally-bundled image used across blogs,
 * docs, and page banners. As the image count grows, add the import above
 * and one line below — nothing else in the app should ever hardcode an
 * image path or URL directly (see `get-image.ts`'s `getImageSrc`, which is
 * the only thing that should read this registry).
 *
 * Key convention: the filename as it appears in `coverImage`/`images`
 * fields in content configs (`blogs.config.ts`, `docs.config.ts`, etc.),
 * e.g. `coverImage: "gta6-extended-look-cover.jpg"`.
 */
export const imageRegistry = {
  // GTA 5 images
  "roleplay-gta5-guide.jpg": gta5RoleplayGuide,

  // GTA 6 images
  "gta6-extended-look-cover.jpg": gta6ExtendedLookCover,
  "gta6-extened-look-01.jpg": gta6ExtendedLook01,
  "gta6-extened-look-02.jpg": gta6ExtendedLook02,
  "gta6-extened-look-03.jpg": gta6ExtendedLook03,
  "gta6-extened-look-04.jpg": gta6ExtendedLook04,

  // LifeInvader images
  "lifeinvader-ads-policy.jpg": lifeinvaderAdsPolicy,

  // Roleplay images
  "roleplay-basic-terms.jpg": roleplayBasicTerms,
  "roleplay-fairplay-rules.jpg": roleplayFairplayRules,
  "roleplay-general-rules.jpg": roleplayGeneralRules,
  "roleplay-how-to-make-money.jpg": roleplayHowToMakeMoney,

  // family images
  "family-10-ranking-system.jpg": family10RankSystem,
  "family-7-ranking-system.jpg": family7RankSystem,
  "family-events-system.jpg": familyEventsSystem,
  "family-bonus-system.jpg": familyBonusSystem,
} satisfies Record<string, StaticImageData>;

/** Autocomplete-friendly union of every registered local image key. */
export type RegisteredImageKey = keyof typeof imageRegistry;

/**
 * Small pool of themed stock photos used when a post/doc doesn't supply its
 * own `coverImage`. Picked deterministically per-slug in
 * `content-normalize.ts` (same doc always gets the same fallback) rather
 * than randomly, so the choice is stable across builds and doesn't shuffle
 * on every deploy.
 */
export const FALLBACK_COVER_IMAGES = [
  "https://images.unsplash.com/photo-1686678951896-b991cf404912?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1746653776326-282757d666c1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1698812004183-2c13601de23e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1715733965672-5c6a4c450f1e?auto=format&fit=crop&w=1600&q=80",
] as const;

/**
 * One-off page/section banners that aren't tied to a specific post or doc
 * (so they don't belong in `imageRegistry`'s per-content lookup, and aren't
 * a fallback pool either). Add new page banners here by name instead of
 * inlining a URL/import in the component that renders them.
 */
export const PAGE_BANNER_IMAGES = {
  blogsIndexMasthead:
    "https://images.unsplash.com/photo-1746653776326-282757d666c1?auto=format&fit=crop&w=1920&q=80",
} as const;
