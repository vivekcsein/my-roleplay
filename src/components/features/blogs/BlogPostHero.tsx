"use client";

import Image from "next/image";
import { useGsapBlogAnimation } from "@/packages/hooks/gsap/useGsapBlogAnimation";
import { useGsapParallax } from "@/packages/hooks/gsap/useGsapParallax";
import {
  formatContentDate,
  type NormalizedContentItem,
} from "@/packages/utils/content-normalize";

interface BlogPostHeroProps {
  normalized: NormalizedContentItem;
}

const BlogPostHero = ({ normalized }: BlogPostHeroProps) => {
  const { containerRef } = useGsapBlogAnimation();
  const { imageRef } = useGsapParallax(containerRef);

  return (
    <section ref={containerRef} className="li-post-hero">
      <div className="li-post-hero__image-wrapper">
        <div ref={imageRef} className="li-post-hero__image-drift">
          <Image
            src={normalized.coverImage}
            alt={normalized.title}
            fill
            sizes="100vw"
            priority
            className="li-post-hero__image"
          />
        </div>
      </div>
      <div className="li-post-hero__overlay" />

      <div className="li-post-hero__content">
        <p className="li-blog-index__eyebrow gsap-animate-hero">
          {normalized.category}
        </p>
        <h1 className="li-blog-post__title gsap-animate-hero">
          {normalized.title}
        </h1>
        <div className="li-blog-card__meta gsap-animate-hero">
          <span>{normalized.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatContentDate(normalized.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{normalized.readTimeMinutes} min read</span>
        </div>
      </div>
    </section>
  );
};

export default BlogPostHero;
