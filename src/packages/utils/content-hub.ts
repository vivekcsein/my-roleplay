import { getAllBlogPosts, getBlogPostBySlug } from "@/packages/content/blogs";
import {
  type NormalizedContentItem,
  normalizeBlogPost,
  normalizeDoc,
  normalizeDocsList,
  sortByNewestFirst,
} from "@/packages/utils/content-normalize";
import {
  type DocEntry,
  getAllDocs,
  getDocBySlug,
  getDocContent,
} from "@/packages/utils/get-docs";
import type { BlogPost } from "@/types/blog";

/**
 * Single source of truth for everything rendered under `/blogs`. Merges
 * JSON blog posts (`src/data/blogs.json`) and markdown docs
 * (`docsConfig.docsList` + `src/docs/**`) into one normalized, sorted list
 * — see `packages/utils/content-normalize.ts` for the shared shape.
 *
 * Slugs are expected to be unique across both sources; if a doc and a post
 * ever share a slug, the post wins and the doc is dropped (posts are
 * treated as the primary content type for `/blogs`).
 */
export const getAllContent = (): NormalizedContentItem[] => {
  const posts = getAllBlogPosts().map(normalizeBlogPost);
  const postSlugs = new Set(posts.map((post) => post.slug));

  const docs = normalizeDocsList(getAllDocs(), getDocContent).filter(
    (doc) => !postSlugs.has(doc.slug),
  );

  return [...posts, ...docs].sort(sortByNewestFirst);
};

export type ContentDetail =
  | { source: "post"; normalized: NormalizedContentItem; post: BlogPost }
  | {
      source: "doc";
      normalized: NormalizedContentItem;
      doc: DocEntry;
      markdown: string;
    };

/** Looks up a single `/blogs/[slug]` entry across both sources. Posts are
 * checked first (see `getAllContent` for the slug-collision rule), and
 * returns `null` when neither source has a match — callers should route
 * that to `notFound()`. */
export const getContentBySlug = (slug: string): ContentDetail | null => {
  const post = getBlogPostBySlug(slug);
  if (post) {
    return { source: "post", normalized: normalizeBlogPost(post), post };
  }

  const doc = getDocBySlug([slug]);
  if (doc) {
    const markdown = getDocContent(doc);
    return {
      source: "doc",
      normalized: normalizeDoc(doc, markdown),
      doc,
      markdown,
    };
  }

  return null;
};
