import type { DocEntry } from "@/packages/utils/get-docs";
import type { BlogPost } from "@/types/blog";

/**
 * Shared shape the `/blogs` index and card list render, regardless of
 * whether the underlying content is a JSON blog post (`src/data/blogs.json`)
 * or a markdown doc (`docsConfig.docsList` + `src/docs/**`).
 *
 * `source` tells the dynamic `[slug]` route which renderer to use
 * (`BlogContent` for "post", the existing `Markdown` component for "doc") —
 * see `packages/content/content-hub.ts`.
 */
export type NormalizedContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  /** ISO date string — normalized so both sources can be sorted/formatted the same way. */
  publishedAt: string;
  readTimeMinutes: number;
  source: "post" | "doc";
};

/** ~200 words/minute, rounded up, minimum 1 minute. */
const estimateReadTimeFromWordCount = (wordCount: number): number =>
  Math.max(1, Math.ceil(wordCount / 200));

export const formatContentDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/** docsConfig dates are authored as "DD/MM/YYYY" — convert to a real ISO
 * date string so docs sort/format identically to blog posts' ISO dates. */
const parseDocDate = (ddmmyyyy: string): string => {
  const [day, month, year] = ddmmyyyy.split("/").map(Number);

  if (!day || !month || !year) return ddmmyyyy;

  return new Date(Date.UTC(year, month - 1, day)).toISOString();
};

export const normalizeBlogPost = (post: BlogPost): NormalizedContentItem => {
  const wordCount = post.content.reduce((total, block) => {
    if (block.type === "list")
      return total + block.items.join(" ").split(/\s+/).length;
    if (block.type === "image") return total;
    return total + block.text.split(/\s+/).length;
  }, 0);

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    author: post.author,
    publishedAt: post.publishedAt,
    readTimeMinutes: estimateReadTimeFromWordCount(wordCount),
    source: "post",
  };
};

export const normalizeDoc = (
  doc: DocEntry,
  markdown: string,
): NormalizedContentItem => {
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.description ?? "",
    // docPath looks like "ads/ads-policy-guide" — the segment before the
    // last "/" reads as a reasonable category label; falls back to "Docs".
    category: doc.docPath.includes("/")
      ? (doc.docPath.split("/").at(0) ?? "Docs")
      : "Docs",
    tags: doc.keywords ?? [],
    author: "My Roleplay",
    publishedAt: parseDocDate(doc.createdAt),
    readTimeMinutes: estimateReadTimeFromWordCount(wordCount),
    source: "doc",
  };
};

/** Normalizes the full docs list without needing each doc's markdown body
 * (used for listing/index views where only metadata is displayed). */
export const normalizeDocsList = (
  docs: DocEntry[],
  getContent: (doc: DocEntry) => string,
): NormalizedContentItem[] =>
  docs.map((doc) => normalizeDoc(doc, getContent(doc)));

export const sortByNewestFirst = (
  a: NormalizedContentItem,
  b: NormalizedContentItem,
) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
