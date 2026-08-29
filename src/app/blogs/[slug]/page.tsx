import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContent from "@/components/features/blogs/BlogContent";
import Markdown from "@/components/ui/markdown/Markdown";
import { getAllContent, getContentBySlug } from "@/packages/utils/content-hub";
import { formatContentDate } from "@/packages/utils/content-normalize";
import "@/styles/features/blogs/blogs.css";

export function generateStaticParams() {
  return getAllContent().map(({ slug }) => ({ slug }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) return {};

  const { normalized } = item;

  return {
    title: normalized.title,
    description: normalized.excerpt,
    alternates: {
      canonical: `/blogs/${normalized.slug}`,
    },
    openGraph: {
      type: "article",
      title: normalized.title,
      description: normalized.excerpt,
      publishedTime: normalized.publishedAt,
      authors: [normalized.author],
      tags: normalized.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: normalized.title,
      description: normalized.excerpt,
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) notFound();

  const { normalized } = item;

  return (
    <article className="li-blog-post">
      <header className="li-blog-post__header">
        <p className="li-blog-index__eyebrow">{normalized.category}</p>
        <h1 className="li-blog-post__title">{normalized.title}</h1>
        <div className="li-blog-card__meta">
          <span>{normalized.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatContentDate(normalized.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{normalized.readTimeMinutes} min read</span>
        </div>
      </header>

      {item.source === "post" ? (
        <BlogContent blocks={item.post.content} />
      ) : (
        <Markdown content={item.markdown} />
      )}

      {normalized.tags.length > 0 ? (
        <footer className="li-blog-post__tags">
          {normalized.tags.map((tag) => (
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
