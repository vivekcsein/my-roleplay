"use client";

import { MEDIANET_AD_UNITS } from "@/packages/configs/ads.config";
import SidebarAd from "./SidebarAd";

interface RightSidebarAdProps {
  className?: string;
}

const RightSidebarAd = ({ className = "" }: RightSidebarAdProps) => {
  const unit = MEDIANET_AD_UNITS.right;
  return (
    <SidebarAd
      crid={unit.crid}
      width={unit.width}
      height={unit.height}
      className={`li-partner-slot--end ${className}`.trim()}
    />
  );
};

export default RightSidebarAd;
