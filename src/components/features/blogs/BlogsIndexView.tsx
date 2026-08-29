"use client";

import Image from "next/image";
import BlogCard from "@/components/features/blogs/BlogCard";
import { useGsapBlogAnimation } from "@/packages/hooks/gsap/useGsapBlogAnimation";
import type { NormalizedContentItem } from "@/packages/utils/content-normalize";

interface BlogsIndexViewProps {
  posts: NormalizedContentItem[];
}

// Fixed banner for the index masthead — the page itself isn't tied to a
// single post, so this doesn't come from content-normalize's per-item logic.
const MASTHEAD_IMAGE =
  "https://images.unsplash.com/photo-1746653776326-282757d666c1?auto=format&fit=crop&w=1920&q=80";

const BlogsIndexView = ({ posts }: BlogsIndexViewProps) => {
  const { containerRef } = useGsapBlogAnimation();

  return (
    <section ref={containerRef}>
      <div className="li-blog-masthead">
        <div className="li-blog-masthead__image-wrapper">
          <Image
            src={MASTHEAD_IMAGE}
            alt="My Roleplay blog"
            fill
            sizes="100vw"
            priority
            className="li-blog-masthead__image"
          />
        </div>
        <div className="li-blog-masthead__overlay" />

        <div className="li-blog-masthead__content">
          <div className="li-blog-index__header">
            <p className="li-blog-index__eyebrow gsap-animate-hero">
              My Roleplay · Blog
            </p>
            <h1 className="li-blog-index__title gsap-animate-hero">
              GTA RP Guides &amp; LifeInvader Tips
            </h1>
            <p className="li-blog-index__subtitle gsap-animate-hero">
              Practical guides for LifeInvader ad formatting, Grand RP and
              Eclipse RP conventions, and getting up to speed on GTA roleplay
              servers fast.
            </p>
          </div>
        </div>
      </div>

      <div className="li-blog-index">
        <div className="li-blog-index__grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsIndexView;
