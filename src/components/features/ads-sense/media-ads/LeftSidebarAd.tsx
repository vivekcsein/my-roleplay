"use client";

import { MEDIANET_AD_UNITS } from "@/packages/configs/ads.config";
import SidebarAd from "./SidebarAd";

interface LeftSidebarAdProps {
  className?: string;
}

const LeftSidebarAd = ({ className = "" }: LeftSidebarAdProps) => {
  const unit = MEDIANET_AD_UNITS.left;
  return (
    <SidebarAd
      crid={unit.crid}
      width={unit.width}
      height={unit.height}
      className={`li-partner-slot--start ${className}`.trim()}
    />
  );
};

export default LeftSidebarAd;
