import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { AdCategory } from "@/types/ads";
import PanelSkeleton from "../shared/PanelSkeleton";

const withSkeleton = (loader: () => Promise<{ default: ComponentType }>) =>
  dynamic(loader, { loading: () => <PanelSkeleton />, ssr: false });

export const AD_PANELS: Record<AdCategory, ComponentType> = {
  car: withSkeleton(() => import("./CarAdsPanel")),
  house: withSkeleton(() => import("./HouseAdsPanel")),
  clothing: withSkeleton(() => import("./ClothingAdsPanel")),
  items: withSkeleton(() => import("./ItemsAdsPanel")),
  business: withSkeleton(() => import("./BusinessAdsPanel")),
  work: withSkeleton(() => import("./WorkAdsPanel")),
  dating: withSkeleton(() => import("./DatingAdsPanel")),
};
