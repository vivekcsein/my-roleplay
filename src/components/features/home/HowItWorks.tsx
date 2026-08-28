"use client";

import { howItWorksSteps } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const HowItWorks = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how" className="rp-section">
      <div className="rp-wrap">
        <div className="rp-section-head reveal-on-scroll is-visible">
          <div className="rp-section-label">How It Works</div>
          <h2>
            Three steps to
            <br />
            your first shift.
          </h2>
        </div>

        <div ref={revealRef} className="rp-steps reveal-on-scroll">
          {howItWorksSteps.map((step, index) => (
            <div key={step.id} className="rp-step">
              <span className="rp-step__num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index < howItWorksSteps.length - 1 ? (
                <span className="rp-step__arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
