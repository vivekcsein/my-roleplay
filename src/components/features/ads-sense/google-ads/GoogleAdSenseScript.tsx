"use client";

import Script from "next/script";
import { GOOGLE_ADSENSE_CLIENT } from "@/packages/configs/ads.config";

/**
 * Mount once near the root of the app (e.g. in the root layout). Loads
 * Google AdSense's adsbygoogle.js so any <GoogleAdUnit /> instances on the
 * page can request a fill. Also declares the `google-adsense-account` meta
 * tag, which is Google's site-ownership signal for AdSense (separate from
 * Search Console's `google-site-verification` tag).
 *
 * Renders nothing if NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT isn't set.
 */
const GoogleAdSenseScript = () => {
  if (!GOOGLE_ADSENSE_CLIENT) return null;

  return (
    <>
      <meta name="google-adsense-account" content={GOOGLE_ADSENSE_CLIENT} />
      <Script
        id="google-adsense-loader"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
};

export default GoogleAdSenseScript;
