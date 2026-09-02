import Image from "next/image";
import { navLinks } from "@/packages/configs/data.config";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <nav className="rp-nav">
      <a href="#top" className="rp-nav__logo">
        <span className="rp-nav__logo-dot" aria-hidden="true" />
        <Image src={"/logo.png"} width={150} height={150} alt="logo" />
      </a>

      <div className="rp-nav__links">
        {navLinks.map((link) => (
          <a key={link.id} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Header;
