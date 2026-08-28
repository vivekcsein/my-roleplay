"use client";

import Script from "next/script";
import { MEDIANET_CID } from "@/packages/configs/ads.config";

/**
 * Mount once near the root of the app (e.g. in the root layout). Sets up
 * window._mNHandle.queue before the async Media.net loader runs, so any
 * SidebarAd instances that mounted earlier and already queued a loadTag()
 * call don't get dropped.
 *
 * Renders nothing if NEXT_PUBLIC_MEDIANET_CID isn't set.
 */
const MediaNetScript = () => {
  if (!MEDIANET_CID) return null;

  return (
    <>
      <Script id="medianet-queue-init" strategy="beforeInteractive">
        {`window._mNHandle = window._mNHandle || {}; window._mNHandle.queue = window._mNHandle.queue || [];`}
      </Script>
      <Script
        id="medianet-loader"
        src={`https://contextual.media.net/dmedianet.js?cid=${MEDIANET_CID}`}
        strategy="afterInteractive"
        async
      />
    </>
  );
};

export default MediaNetScript;
