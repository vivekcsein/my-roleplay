import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "c4.wallpaperflare.com" },
      { protocol: "https", hostname: "cdna.artstation.com" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
