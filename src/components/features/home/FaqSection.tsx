"use client";

import { useState } from "react";
import { faqEntries } from "@/packages/configs/data.config";
import { useScrollReveal } from "@/packages/hooks/useScrollReveal";

export const FaqSection = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const defaultOpenId = faqEntries.find((faq) => faq.defaultOpen)?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleFaq = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="rp-section">
      <div className="rp-wrap" style={{ maxWidth: 800 }}>
        <div
          className="rp-section-head reveal-on-scroll is-visible"
          style={{ maxWidth: "none" }}
        >
          <div className="rp-section-label">FAQ</div>
          <h2>Questions, answered.</h2>
        </div>

        <div ref={revealRef} className="reveal-on-scroll">
          {faqEntries.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rp-faq-item${isOpen ? " is-open" : ""}`}
              >
                <button
                  type="button"
                  className="rp-faq-item__head"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h3>{faq.question}</h3>
                  <span className="rp-faq-item__toggle" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="rp-faq-item__body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
