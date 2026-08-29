import Image from "next/image";

const BlogHeader = () => {
  return (
    <nav className="rp-nav">
      <a href="/" className="rp-nav__logo">
        <span className="rp-nav__logo-dot" aria-hidden="true" />
        <Image src={"/logo.png"} width={150} height={150} alt="logo" />
      </a>
    </nav>
  );
};

export default BlogHeader;
