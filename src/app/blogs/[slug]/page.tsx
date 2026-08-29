import type { Metadata } from "next";
import "@/styles/features/blogs/blogs.css";
import { notFound } from "next/navigation";
import AdsServices from "@/components/features/ads-sense/AdsServices";
import BlogContent from "@/components/features/blogs/BlogContent";
import BlogPostHero from "@/components/features/blogs/BlogPostHero";
import Markdown from "@/components/ui/markdown/Markdown";
import { getAllContent, getContentBySlug } from "@/packages/utils/content-hub";

export function generateStaticParams() {
  return getAllContent().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blogs/[slug]">): Promise<Metadata> {
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

const BlogPostPage = async ({ params }: PageProps<"/blogs/[slug]">) => {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) notFound();

  const { normalized } = item;

  return (
    <article>
      <BlogPostHero normalized={normalized} />

      <AdsServices>
        <div className="li-blog-post">
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
        </div>
      </AdsServices>
    </article>
  );
};

export default BlogPostPage;
