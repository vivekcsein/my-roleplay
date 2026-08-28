"use client";

import { platforms } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const PlatformCoverage = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="rp-section">
      <div className="rp-wrap">
        <div className="rp-section-head reveal-on-scroll is-visible">
          <div className="rp-section-label">Platform Coverage</div>
          <h2>
            Built for every
            <br />
            major RP platform.
          </h2>
        </div>

        <div ref={revealRef} className="rp-platform-strip reveal-on-scroll">
          {platforms.map((platform) => (
            <div key={platform.id} className="rp-platform-item">
              {platform.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
