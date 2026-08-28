"use client";

import { siteConfig, testimonials } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const CommunityTrust = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="discord" className="rp-section">
      <div className="rp-wrap">
        <div className="rp-section-head reveal-on-scroll is-visible">
          <div className="rp-section-label">Community</div>
          <h2>
            Trusted by players
            <br />
            and server owners.
          </h2>
        </div>

        <div className="rp-community-top reveal-on-scroll is-visible">
          <div className="rp-member-count">
            <span className="rp-member-count__num">
              {siteConfig.discordMemberCount}
            </span>
            <span className="rp-member-count__label">Discord Members</span>
          </div>
          <span className="rp-live-dot">Community active now</span>
        </div>

        <div ref={revealRef} className="rp-testimonials reveal-on-scroll">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rp-testimonial">
              <div className="rp-testimonial__stars" aria-hidden="true">
                ★★★★★
              </div>
              <p>&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="rp-testimonial__who">
                <b>{testimonial.authorName}</b>
                {testimonial.authorRole}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
