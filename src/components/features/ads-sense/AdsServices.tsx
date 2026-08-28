import type { ReactNode } from "react";
import GoogleAdUnit from "@/components/features/ads-sense/google-ads/GoogleAdUnit";
import { GOOGLE_AD_SLOTS } from "@/packages/configs/ads.config";
import "@/styles/features/ads-sense/ads-services.css";

interface AdsServicesProps {
  children: ReactNode;
  /** Overrides the default left ad-unit id (from NEXT_PUBLIC_GOOGLE_ADSENSE_LEFT_SLOT). */
  leftSlot?: string;
  /** Overrides the default right ad-unit id (from NEXT_PUBLIC_GOOGLE_ADSENSE_RIGHT_SLOT). */
  rightSlot?: string;
  /** Hide one or both rails for a given page without removing the wrapper. */
  hideLeft?: boolean;
  hideRight?: boolean;
  className?: string;
}

/**
 * The single place in the app that decides what ad renders on the left and
 * right of a page's content. Every route that wants side ads wraps its
 * content in <AdsServices> instead of reaching for a specific ad provider
 * component directly — swap the ad network, resize the rails, or add a
 * third provider here once, and every consumer (blogs, life-invader-ads,
 * future pages) picks it up automatically.
 *
 * Usage:
 *   <AdsServices>{children}</AdsServices>
 *
 * Per-route overrides (e.g. a page with its own dedicated ad units):
 *   <AdsServices leftSlot="1234567890" rightSlot="0987654321">{children}</AdsServices>
 */
const AdsServices = ({
  children,
  leftSlot,
  rightSlot,
  hideLeft = false,
  hideRight = false,
  className = "",
}: AdsServicesProps) => {
  const resolvedLeftSlot = leftSlot ?? GOOGLE_AD_SLOTS.left ?? "";
  const resolvedRightSlot = rightSlot ?? GOOGLE_AD_SLOTS.right ?? "";

  return (
    <div className={`li-layout-split ${className}`.trim()}>
      <div className="li-layout-split__rail li-layout-split__rail--start">
        {!hideLeft ? <GoogleAdUnit slot={resolvedLeftSlot} /> : null}
      </div>

      <div className="li-layout-split__content">{children}</div>

      <div className="li-layout-split__rail li-layout-split__rail--end">
        {!hideRight ? <GoogleAdUnit slot={resolvedRightSlot} /> : null}
      </div>
    </div>
  );
};

export default AdsServices;
