import type { StaticImageData } from "next/image";
import howToMakeMoneyBanner from "@/assets/images/gta5/how-to-make-money-banner.jpg";
import roleplayGuideBanner from "@/assets/images/gta5/roleplay-guide-banner.jpg";
import gta6ExtendedLookCover from "@/assets/images/gta6/gta6-extended-look-cover.jpg";
import LiAdsPolicyBanner from "@/assets/images/lifeinvader/li-ads-policy-banner.jpg";
/** Small pool of themed stock photos used when a post/doc doesn't supply its
 * own `coverImage`/`images`. Picked deterministically per-slug (same doc
 * always gets the same fallback) rather than randomly, so the choice is
 * stable across builds and doesn't shuffle on every deploy. */
export const FALLBACK_COVER_IMAGES = [
  "https://images.unsplash.com/photo-1686678951896-b991cf404912?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1746653776326-282757d666c1?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1698812004183-2c13601de23e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1715733965672-5c6a4c450f1e?auto=format&fit=crop&w=1600&q=80",
];

export const imageRegistry: Record<string, StaticImageData> = {
  "gta6-extended-look-cover.jpg": gta6ExtendedLookCover,
  "roleplay-guide-banner.jpg": roleplayGuideBanner,
  "li-ads-policy-banner.jpg": LiAdsPolicyBanner,
  "how-to-make-money-banner.jpg": howToMakeMoneyBanner,
};
