"use client";

import { siteConfig, socialLinks } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const FinalCta = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="rp-final-cta">
      <div ref={revealRef} className="rp-final-cta__inner reveal-on-scroll">
        <h2>
          Stop guessing.
          <br />
          Start playing{" "}
          <span className="rp-final-cta__accent">like a pro.</span>
        </h2>
        <p className="rp-final-cta__subline">
          Free to read. Built by players, for players.
        </p>

        <div className="rp-final-cta__ctas">
          <a href={siteConfig.rulebookHref} className="rp-btn rp-btn--primary">
            Read the Rulebook
          </a>
        </div>

        <div className="rp-social-row">
          {socialLinks.map((social) => (
            <a key={social.id} href={social.href}>
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
