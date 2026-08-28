"use client";

import { useState } from "react";
import { ruleEntries } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const RulesPreview = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const defaultOpenId =
    ruleEntries.find((rule) => rule.defaultOpen)?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleRule = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="rules" className="rp-section">
      <div className="rp-wrap">
        <div className="rp-section-head reveal-on-scroll is-visible">
          <div className="rp-section-label">Rulebook Preview</div>
          <h2>
            Read before
            <br />
            you spawn in.
          </h2>
          <p>Three core standards every server expects you to already know.</p>
        </div>

        <div ref={revealRef} className="rp-rulebook reveal-on-scroll">
          {ruleEntries.map((rule) => {
            const isOpen = openId === rule.id;
            return (
              <div
                key={rule.id}
                className={`rp-rule-item${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="rp-rule-item__head"
                  aria-expanded={isOpen}
                  onClick={() => toggleRule(rule.id)}
                >
                  <span className="rp-rule-item__head-left">
                    <span className="rp-rule-item__code">{rule.code}</span>
                    <span className="rp-rule-item__title">{rule.title}</span>
                  </span>
                  <span className="rp-rule-item__toggle" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="rp-rule-item__body">
                  <p className="rp-rule-item__body-inner">{rule.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
