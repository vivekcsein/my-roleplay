"use client";

import Image from "next/image";
import AdsServices from "@/components/features/ads-sense/AdsServices";
import BlogCard from "@/components/features/blogs/BlogCard";
import { PAGE_BANNER_IMAGES } from "@/packages/configs/images.config";
import { useGsapBlogAnimation } from "@/packages/hooks/gsap/useGsapBlogAnimation";
import type { NormalizedContentItem } from "@/packages/utils/content-normalize";

interface BlogsIndexViewProps {
  posts: NormalizedContentItem[];
}

const BlogsIndexView = ({ posts }: BlogsIndexViewProps) => {
  const { containerRef } = useGsapBlogAnimation();

  return (
    <section ref={containerRef}>
      <div className="li-blog-masthead">
        <div className="li-blog-masthead__image-wrapper">
          <Image
            src={PAGE_BANNER_IMAGES.blogsIndexMasthead}
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
              The Ultimate GTA RP Playbook
            </h1>
            <p className="li-blog-index__subtitle gsap-animate-hero">
              Understand the basics of roleplay, learn the common terms and
              rules, and check out top FiveM servers such as NoPixel, Eclipse,
              and MafiaCity.
            </p>
          </div>
        </div>
      </div>

      <div className="li-blog-index">
        <AdsServices>
          <div className="li-blog-index__grid">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </AdsServices>
      </div>
    </section>
  );
};

export default BlogsIndexView;
