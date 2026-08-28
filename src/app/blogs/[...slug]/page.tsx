import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContent from "@/components/features/blogs/BlogContent";
import {
  estimateReadTimeMinutes,
  formatPublishedDate,
  getAllBlogSlugs,
  getBlogPostBySlug,
} from "@/packages/content/blogs";
import "@/styles/features/blogs/blogs.css";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const BlogPostPage = async ({ params }: PageProps<"/blogs/[slug]">) => {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="li-blog-post">
      <header className="li-blog-post__header">
        <p className="li-blog-index__eyebrow">{post.category}</p>
        <h1 className="li-blog-post__title">{post.title}</h1>
        <div className="li-blog-card__meta">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatPublishedDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{estimateReadTimeMinutes(post)} min read</span>
        </div>
      </header>

      <BlogContent blocks={post.content} />

      {post.tags.length > 0 ? (
        <footer className="li-blog-post__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="li-blog-post__tag">
              #{tag.replace(/\s+/g, "-")}
            </span>
          ))}
        </footer>
      ) : null}
    </article>
  );
};

export default BlogPostPage;
