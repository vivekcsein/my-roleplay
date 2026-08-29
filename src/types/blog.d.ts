/* =========================================================
 * BLOG IMAGE
 * ========================================================= */

export interface BlogImage {
  src: string;
  alt: string;
  caption?: string;
}

/* =========================================================
 * BLOG CONTENT
 * ========================================================= */

export type BlogHeadingLevel = 2 | 3 | 4;

export type BlogCalloutVariant = "info" | "warning" | "success" | "danger";

export type BlogEmbedProvider =
  | "iframe"
  | "codepen"
  | "codesandbox"
  | "stackblitz"
  | "figma"
  | "custom";

export interface BlogParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface BlogHeadingBlock {
  type: "heading";
  text: string;
  level: BlogHeadingLevel;
}

export interface BlogListBlock {
  type: "list";
  items: string[];
  ordered?: boolean;
}

export interface BlogImageBlock {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogQuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

export interface BlogCodeBlock {
  type: "code";
  code: string;
  language?: string;
  filename?: string;
}

export interface BlogLinkBlock {
  type: "link";
  text: string;
  href: string;
  external?: boolean;
}

export interface BlogVideoBlock {
  type: "video";
  src: string;
  title?: string;
}

export interface BlogDividerBlock {
  type: "divider";
}

export interface BlogCalloutBlock {
  type: "callout";
  variant: BlogCalloutVariant;
  title?: string;
  text: string;
}

export interface BlogTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface BlogEmbedBlock {
  type: "embed";
  url: string;
  provider: BlogEmbedProvider;
  title?: string;
  height?: number;
}

export interface BlogGalleryBlock {
  type: "gallery";
  images: BlogImage[];
}

export interface BlogYoutubeBlock {
  type: "youtube";
  videoId: string;
  title?: string;
  startTime?: number;
}

export interface BlogTweetBlock {
  type: "tweet";
  tweetId: string;
}

export interface BlogGithubBlock {
  type: "github";
  url: string;
  title?: string;
}

export interface BlogFileBlock {
  type: "file";
  src: string;
  name: string;
  description?: string;
  size?: string;
}

export interface BlogButtonBlock {
  type: "button";
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  external?: boolean;
}

export interface BlogAccordionBlock {
  type: "accordion";
  title: string;
  content: BlogContentBlock[];
  defaultOpen?: boolean;
}

export interface BlogColumnsBlock {
  type: "columns";
  columns: BlogContentBlock[][];
}

/* =========================================================
 * CONTENT UNION
 * ========================================================= */

export type BlogContentBlock =
  | BlogParagraphBlock
  | BlogHeadingBlock
  | BlogListBlock
  | BlogImageBlock
  | BlogQuoteBlock
  | BlogCodeBlock
  | BlogLinkBlock
  | BlogVideoBlock
  | BlogDividerBlock
  | BlogCalloutBlock
  | BlogTableBlock
  | BlogEmbedBlock
  | BlogGalleryBlock
  | BlogYoutubeBlock
  | BlogTweetBlock
  | BlogGithubBlock
  | BlogFileBlock
  | BlogButtonBlock
  | BlogAccordionBlock
  | BlogColumnsBlock;

/* =========================================================
 * BLOG POST
 * ========================================================= */

export interface BlogPost {
  /**
   * Unique identifier for the blog post.
   *
   * Example:
   * "gta6-extended-look"
   */
  key: string;

  /**
   * Blog post title.
   */
  title: string;

  /**
   * Short description/excerpt.
   *
   * Used on blog cards, SEO metadata and previews.
   */
  description: string;

  category: string;

  tags: string[];

  /**
   * URL slug.
   *
   * Example:
   * "gta-6-extended-look"
   */
  slug: string;

  /**
   * Frontend route.
   *
   * Example:
   * "blogs/gta-6-extended-look"
   */
  path: string;

  /**
   * Cover/banner image.
   */
  coverImage?: string;

  /**
   * Author display name.
   */
  author: string;

  /**
   * ISO 8601 publication date.
   *
   * Example:
   * "2026-08-28T12:00:00.000Z"
   */
  publishedAt: string;

  /**
   * Ordered list of content blocks.
   */
  content: BlogContentBlock[];
}

/* =========================================================
 * BLOG COLLECTION
 * ========================================================= */

export interface BlogsConfig {
  key: "BLOGS";

  title: string;

  description: string;

  slug: string;

  path: string;

  posts: BlogPost[];
}
