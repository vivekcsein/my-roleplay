import { envAdsConfig } from "../env/ads.env";

/** Shared fallback label shown above every ad slot, regardless of provider. */
export const AD_SLOT_LABEL = "Advertisement";

// --- Media.net -------------------------------------------------------------

export const MEDIANET_CID = envAdsConfig.MEDIANET_CID;

export interface MediaNetAdUnit {
  crid: string | undefined;
  width: number;
  height: number;
}

/** Per-placement Media.net ad-unit config (crid + fixed slot dimensions). */
export const MEDIANET_AD_UNITS: Record<"left" | "right", MediaNetAdUnit> = {
  left: {
    crid: envAdsConfig.MEDIANET_LEFT_CRID,
    width: 160,
    height: 600,
  },
  right: {
    crid: envAdsConfig.MEDIANET_RIGHT_CRID,
    width: 160,
    height: 600,
  },
};

// --- Google AdSense ----------------------------------------------------

export const GOOGLE_ADSENSE_CLIENT = envAdsConfig.GOOGLE_ADSENSE_CLIENT;

export const GOOGLE_SITE_VERIFICATION = envAdsConfig.GOOGLE_SITE_VERIFICATION;

/** Default left/right AdSense ad-unit ids used by <AdsServices />. */
export const GOOGLE_AD_SLOTS: Record<"left" | "right", string | undefined> = {
  left: envAdsConfig.GOOGLE_ADSENSE_LEFT_SLOT,
  right: envAdsConfig.GOOGLE_ADSENSE_RIGHT_SLOT,
};

export type GoogleAdFormat = "auto" | "rectangle" | "vertical" | "horizontal";

/** Default rendering behavior for a <GoogleAdUnit /> when not overridden per-instance. */
export const GOOGLE_AD_DEFAULTS: {
  format: GoogleAdFormat;
  fullWidthResponsive: boolean;
} = {
  format: "auto",
  fullWidthResponsive: true,
};
