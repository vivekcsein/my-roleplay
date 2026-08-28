"use client";

import { CoverIcon } from "@/components/ui/icons/CoverIcon";
import { coverItems } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const WhatWeCover = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="cover" className="rp-section">
      <div className="rp-wrap">
        <div className="rp-section-head reveal-on-scroll is-visible">
          <div className="rp-section-label">What We Cover</div>
          <h2>
            Everything RP life
            <br />
            throws at you.
          </h2>
          <p>
            One field manual, six disciplines. Pick what you need, skip what you
            don&apos;t.
          </p>
        </div>

        <div ref={revealRef} className="rp-cover-grid reveal-on-scroll">
          {coverItems.map((item) => (
            <div key={item.id} className="rp-cover-card">
              <div className="rp-cover-card__icon">
                <CoverIcon name={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
