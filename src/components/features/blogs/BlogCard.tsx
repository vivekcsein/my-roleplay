import Image from "next/image";
import Link from "next/link";
import type { NormalizedContentItem } from "@/packages/utils/content-normalize";
import { formatContentDate } from "@/packages/utils/content-normalize";

interface BlogCardProps {
  post: NormalizedContentItem;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="li-blog-card gsap-animate-card"
    >
      <div className="li-blog-card__image-wrapper">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          className="li-blog-card__image"
        />
      </div>

      <div className="li-blog-card__body">
        <span className="li-blog-card__category">{post.category}</span>
        <h2 className="li-blog-card__title">{post.title}</h2>
        <p className="li-blog-card__excerpt">{post.excerpt}</p>
        <div className="li-blog-card__meta">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatContentDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
