"use client";

import { problemCases } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const ProblemSection = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="rp-section">
      <div className="rp-wrap">
        <div className="rp-section-head reveal-on-scroll is-visible">
          <div className="rp-section-label">The Problem</div>
          <h2>
            Most newcomers get
            <br />
            burned in week one.
          </h2>
        </div>

        <div ref={revealRef} className="rp-problems reveal-on-scroll">
          {problemCases.map((problem) => (
            <div key={problem.id} className="rp-problem-card">
              <span className="rp-problem-card__num">{problem.caseLabel}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
