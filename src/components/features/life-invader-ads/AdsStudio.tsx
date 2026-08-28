"use client";

import { useState } from "react";
import "@/styles/features/life-invader-ads/studio.css";
import Image from "next/image";
import { Link } from "@/components/ui";
import type { AdCategory } from "@/types/ads";
import { AD_PANELS } from "./panels";
import AdTabs from "./shared/AdTabs";

const AdsStudio = () => {
  const [active, setActive] = useState<AdCategory>("car");
  const ActivePanel = AD_PANELS[active];

  return (
    <div className="li-studio">
      <div className="li-studio__intro">
        <div className="li-studio__eyebrow flex justify-between">
          <Image
            src="/life-invader.png"
            alt="LifeInvader logo"
            width={200}
            height={200}
            aspect-ratio={1}
          />
          <Link href="/">Home</Link>
        </div>
        <p className="li-studio__subtitle">
          Build a clean, correctly-formatted classified ad in seconds — pick a
          category, fill in the details, copy the result.
        </p>
      </div>

      <AdTabs active={active} onChange={setActive} />

      <div
        id={`li-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`li-tab-${active}`}
        className="li-studio__panel"
      >
        <ActivePanel />
      </div>
    </div>
  );
};

export default AdsStudio;
