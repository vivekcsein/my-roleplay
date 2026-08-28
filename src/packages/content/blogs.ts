import blogsData from "@/data/blogs.json";
import type { BlogPost } from "@/types/blog";

const posts = blogsData as BlogPost[];

const byNewestFirst = (a: BlogPost, b: BlogPost) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

export const getAllBlogPosts = (): BlogPost[] => [...posts].sort(byNewestFirst);

export const getAllBlogSlugs = (): string[] => posts.map((post) => post.slug);

export const getBlogPostBySlug = (slug: string): BlogPost | null =>
  posts.find((post) => post.slug === slug) ?? null;

/** ~200 words/minute, rounded up, minimum 1 minute. */
export const estimateReadTimeMinutes = (post: BlogPost): number => {
  const wordCount = post.content.reduce((total, block) => {
    if (block.type === "list")
      return total + block.items.join(" ").split(/\s+/).length;
    return total + block.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.ceil(wordCount / 200));
};

export const formatPublishedDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
