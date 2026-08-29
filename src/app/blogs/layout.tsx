import type { ReactNode } from "react";
import { Footer } from "@/components/layouts/Footer";
import "@/styles/features/home/homepage.css";
import BlogHeader from "@/components/features/blogs/BlogHeader";

interface BlogsLayoutProps {
  children: ReactNode;
}

// No longer wraps in <AdsServices> here — the hero/masthead banners
// (BlogsIndexView, BlogPostHero) need to render full-bleed, edge-to-edge
// on every screen size, but AdsServices' rail layout adds side padding.
// Each page now wraps just its reading column in <AdsServices>, keeping
// the banner outside of it. See BlogsIndexView.tsx and blogs/[slug]/page.tsx.
const BlogsLayout = ({ children }: BlogsLayoutProps) => {
  return (
    <>
      <BlogHeader />
      {children}
      <Footer />
    </>
  );
};

export default BlogsLayout;
