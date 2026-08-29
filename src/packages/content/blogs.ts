import { blogsConfig } from "@/packages/configs/blogs.config";
import type { BlogContentBlock, BlogPost } from "@/types/blog";

const posts: BlogPost[] = blogsConfig.posts;

const byNewestFirst = (a: BlogPost, b: BlogPost): number =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

export const getAllBlogPosts = (): BlogPost[] => [...posts].sort(byNewestFirst);

export const getAllBlogSlugs = (): string[] => posts.map((post) => post.slug);

export const getBlogPostBySlug = (slug: string): BlogPost | null =>
  posts.find((post) => post.slug === slug) ?? null;

/* =========================================================
 * READ TIME
 * ========================================================= */

const getBlockText = (block: BlogContentBlock): string => {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
    case "code":
    case "link":
    case "video":
    case "callout":
    case "embed":
    case "button":
    case "youtube":
    case "github":
      return [
        "text" in block ? block.text : "",
        "title" in block && block.title ? block.title : "",
      ]
        .filter(Boolean)
        .join(" ");

    case "list":
      return block.items.join(" ");

    case "image":
      return [block.alt, block.caption ?? ""].join(" ");

    case "gallery":
      return block.images
        .map((image) => `${image.alt} ${image.caption ?? ""}`)
        .join(" ");

    case "table":
      return [...block.headers, ...block.rows.flat()].join(" ");

    case "file":
      return [block.name, block.description ?? ""].join(" ");

    case "tweet":
      return "";

    case "divider":
      return "";

    case "accordion":
      return block.content.map(getBlockText).join(" ");

    case "columns":
      return block.columns.flat().map(getBlockText).join(" ");

    default:
      return "";
  }
};

/**
 * Estimates reading time at approximately 200 words/minute.
 *
 * Minimum: 1 minute.
 */
export const estimateReadTimeMinutes = (post: BlogPost): number => {
  const text = post.content.map(getBlockText).join(" ").trim();

  if (!text) {
    return 1;
  }

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 200));
};

/* =========================================================
 * DATE
 * ========================================================= */

export const formatPublishedDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
