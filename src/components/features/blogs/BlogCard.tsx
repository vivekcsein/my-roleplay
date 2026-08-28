import Link from "next/link";
import {
  estimateReadTimeMinutes,
  formatPublishedDate,
} from "@/packages/content/blogs";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${post.slug}`} className="li-blog-card">
      <span className="li-blog-card__category">{post.category}</span>
      <h2 className="li-blog-card__title">{post.title}</h2>
      <p className="li-blog-card__excerpt">{post.excerpt}</p>
      <div className="li-blog-card__meta">
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <span>{formatPublishedDate(post.publishedAt)}</span>
        <span aria-hidden="true">·</span>
        <span>{estimateReadTimeMinutes(post)} min read</span>
      </div>
    </Link>
  );
};

export default BlogCard;
