import "@/styles/features/home/homepage.css";
import { heroConfigData } from "@/packages/configs/hero.config";
import { CommunityTrust } from "./CommunityTrust";
import { FaqSection } from "./FaqSection";
import { FinalCta } from "./FinalCta";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";
import { PlatformCoverage } from "./PlatformCoverage";
import { ProblemSection } from "./ProblemSection";
import { RulesPreview } from "./RulesPreview";
import { WhatWeCover } from "./WhatWeCover";

export const HomePage = () => {
  return (
    <main>
      <HeroSection config={heroConfigData} />
      <ProblemSection />
      <WhatWeCover />
      <RulesPreview />
      <HowItWorks />
      <PlatformCoverage />
      <CommunityTrust />
      <FaqSection />
      <FinalCta />
    </main>
  );
};
