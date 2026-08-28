import { siteConfig } from "@/packages/configs/data.config";

export const Footer = () => {
  return (
    <footer className="rp-footer">
      <span className="rp-footer__text">
        © {siteConfig.copyrightYear} {siteConfig.name.toUpperCase()} —{" "}
        {siteConfig.tagline.toUpperCase()}
      </span>
      <span className="rp-footer__text">BUILT BY A ROLE-PLAYER</span>
    </footer>
  );
};
