"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import {
  AD_SLOT_LABEL,
  GOOGLE_AD_DEFAULTS,
  GOOGLE_ADSENSE_CLIENT,
  type GoogleAdFormat,
} from "@/packages/configs/ads.config";

interface GoogleAdUnitProps {
  /** The AdSense ad-unit id (data-ad-slot), from your AdSense dashboard. */
  slot?: string;
  /** AdSense responsive ad format hint. */
  format?: GoogleAdFormat;
  /** Whether the unit should stretch to its container's width. */
  fullWidthResponsive?: boolean;
  className?: string;
  /** Overrides the default `display:block`. */
  style?: CSSProperties;
  label?: string;
}

/** Renders a single Google AdSense display ad unit. */
const GoogleAdUnit = ({
  slot = "",
  format = GOOGLE_AD_DEFAULTS.format,
  fullWidthResponsive = GOOGLE_AD_DEFAULTS.fullWidthResponsive,
  className = "",
  style,
  label = AD_SLOT_LABEL,
}: GoogleAdUnitProps) => {
  const requested = useRef(false);

  useEffect(() => {
    if (!GOOGLE_ADSENSE_CLIENT || !slot || requested.current) return;
    if (typeof window === "undefined") return;

    requested.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense script not ready / blocked — fail silently, slot stays empty.
    }
  }, [slot]);

  if (!GOOGLE_ADSENSE_CLIENT || !slot) return null;

  return (
    <div className={`li-partner-slot ${className}`.trim()}>
      <span className="li-partner-slot__label">{label}</span>
      <ins
        className="adsbygoogle"
        style={style ?? { display: "block" }}
        data-ad-client={GOOGLE_ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
};

export default GoogleAdUnit;
