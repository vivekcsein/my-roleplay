import type { StaticImageData } from "next/image";
import type { DocEntry } from "@/packages/utils/get-docs";
import type { BlogContentBlock, BlogPost } from "@/types/blog";
import { FALLBACK_COVER_IMAGES } from "../configs/images.config";
import { getImageSrc } from "./get-image";

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
  /** Banner image for the card grid and the post masthead. Always populated —
   * either the source's own registered/external image or a deterministic
   * themed fallback. `StaticImageData` for locally-registered images (see
   * `images.config.ts`), a plain URL string for external/fallback ones —
   * `next/image`'s `src` prop accepts both natively, so callers never need
   * to know or care which one they got. */
  coverImage: string | StaticImageData;
};

/** ~200 words/minute, rounded up, minimum 1 minute. */
const estimateReadTimeFromWordCount = (wordCount: number): number =>
  Math.max(1, Math.ceil(wordCount / 200));

const pickFallbackCoverImage = (slug: string): string => {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_COVER_IMAGES[hash % FALLBACK_COVER_IMAGES.length];
};

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

const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(Boolean).length;
};

const countWordsFromBlock = (block: BlogContentBlock): number => {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
    case "callout":
    case "link":
    case "button":
      return countWords("text" in block ? block.text : "");

    case "code":
      return countWords(block.code);

    case "list":
      return countWords(block.items.join(" "));

    case "image":
      return 0;

    case "gallery":
      return countWords(
        block.images
          .map((image) => `${image.alt} ${image.caption ?? ""}`)
          .join(" "),
      );

    case "table":
      return countWords([...block.headers, ...block.rows.flat()].join(" "));

    case "embed":
      return countWords(block.title ?? "");

    case "video":
    case "youtube":
    case "tweet":
    case "github":
    case "file":
    case "divider":
      return 0;

    case "accordion":
      return block.content.reduce(
        (total, child) => total + countWordsFromBlock(child),
        0,
      );

    case "columns":
      return block.columns
        .flat()
        .reduce((total, child) => total + countWordsFromBlock(child), 0);

    default:
      return 0;
  }
};

export const normalizeBlogPost = (post: BlogPost): NormalizedContentItem => {
  const wordCount = post.content.reduce(
    (total, block) => total + countWordsFromBlock(block),
    0,
  );

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    category: post.category,
    tags: post.tags,
    author: post.author,
    publishedAt: post.publishedAt,
    readTimeMinutes: estimateReadTimeFromWordCount(wordCount),
    source: "post",
    coverImage: post.coverImage
      ? (getImageSrc(post.coverImage) ?? pickFallbackCoverImage(post.slug))
      : pickFallbackCoverImage(post.slug),
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
    coverImage: doc.coverImage
      ? (getImageSrc(doc.coverImage) ?? pickFallbackCoverImage(doc.slug))
      : pickFallbackCoverImage(doc.slug),
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
