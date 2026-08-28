import SkylineSVG from "@/components/ui/svg/skyline";
import { heroTags, siteConfig } from "@/packages/configs/data.config";

const Hero = () => {
  return (
    <section id="top" className="rp-hero">
      <div className="rp-hero__glow" aria-hidden="true" />

      <SkylineSVG />

      <span
        className="rp-hero__corner rp-hero__corner--tl"
        aria-hidden="true"
      />
      <span
        className="rp-hero__corner rp-hero__corner--br"
        aria-hidden="true"
      />

      <div className="rp-hero__inner">
        <span className="rp-eyebrow">Unofficial player field manual</span>

        <h1 className="rp-hero__title">
          Master Every Roleplay.
          <br />
          On <span className="rp-hero__title-accent">Every</span> Server.
        </h1>

        <p className="rp-hero__sub">
          A complete field guide for <b>PoliceRP</b>, <b>GangRP</b>,{" "}
          <b>LifeInvader</b>, and <b>EMS</b> — built so newcomers stop guessing
          and start playing like a five-year veteran on day one.
        </p>

        <div className="rp-hero__tags">
          {heroTags.map((tag) => (
            <span key={tag.id} className="rp-tag">
              {tag.label}
            </span>
          ))}
        </div>

        <div className="rp-hero__ctas">
          <a href={siteConfig.rulebookHref} className="rp-btn rp-btn--primary">
            Explore the Rulebook →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
