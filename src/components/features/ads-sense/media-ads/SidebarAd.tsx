"use client";

import { useEffect, useId, useRef } from "react";
import { AD_SLOT_LABEL } from "@/packages/configs/ads.config";

interface SidebarAdProps {
  crid: string | undefined;
  width: number;
  height: number;
  className?: string;
  label?: string;
}

/**
 * Renders a single Media.net display ad slot.
 *
 * Media.net's contextual script (loaded once globally via <MediaNetScript />)
 * exposes window._mNHandle.queue — each ad unit is requested by pushing a
 * loadTag(crid, "WxH", elementId) call onto that queue once the target <div>
 * exists in the DOM.
 */
const SidebarAd = ({
  crid,
  width,
  height,
  className = "",
  label = AD_SLOT_LABEL,
}: SidebarAdProps) => {
  const reactId = useId();
  const slotId = `mnet-slot-${reactId.replace(/[:]/g, "")}`;
  const requested = useRef(false);

  useEffect(() => {
    if (!crid || requested.current) return;
    if (typeof window === "undefined") return;

    requested.current = true;

    window._mNHandle = window._mNHandle || { queue: [] };
    window._mNHandle.queue = window._mNHandle.queue || [];

    try {
      window._mNHandle.queue.push(() => {
        window._mNDetails?.loadTag(crid, `${width}x${height}`, slotId);
      });
    } catch {
      // Media.net script not ready / blocked — fail silently, slot stays empty.
    }
  }, [crid, width, height, slotId]);

  if (!crid) return null;

  return (
    <aside
      className={`li-partner-slot ${className}`.trim()}
      style={{ width, minHeight: height }}
      aria-label={label}
    >
      <span className="li-partner-slot__label">{label}</span>
      <div id={slotId} style={{ width, height }} />
    </aside>
  );
};

export default SidebarAd;
