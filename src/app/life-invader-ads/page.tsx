import LeftSidebarAd from "@/components/features/ads-sense/media-ads/LeftSidebarAd";
import RightSidebarAd from "@/components/features/ads-sense/media-ads/RightSidebarAd";
import AdsStudio from "@/components/features/life-invader-ads/AdsStudio";
import "@/styles/features/ads-sense/sidebar-ad.css";

const LifeInvaderAdsPage = () => {
  return (
    <div className="li-layout-split">
      <div className="li-layout-split__rail li-layout-split__rail--start">
        <LeftSidebarAd />
      </div>

      <div className="li-layout-split__content">
        <AdsStudio />
      </div>

      <div className="li-layout-split__rail li-layout-split__rail--end">
        <RightSidebarAd />
      </div>
    </div>
  );
};

export default LifeInvaderAdsPage;
