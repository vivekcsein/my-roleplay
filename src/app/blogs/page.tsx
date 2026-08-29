import type { Metadata } from "next";
import BlogsIndexView from "@/components/features/blogs/BlogsIndexView";
import "@/styles/features/blogs/blogs.css";
import { getAllContent } from "@/packages/utils/content-hub";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides and tips for GTA RP — LifeInvader ad formatting, Grand RP and Eclipse RP server rules, and everything else to help you roleplay like a veteran.",
  alternates: {
    canonical: "/blogs",
  },
};

const BlogsIndexPage = () => {
  const posts = getAllContent();

  return <BlogsIndexView posts={posts} />;
};

export default BlogsIndexPage;
