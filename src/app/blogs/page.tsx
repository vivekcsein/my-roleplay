import type { Metadata } from "next";
import BlogCard from "@/components/features/blogs/BlogCard";
import { getAllContent } from "@/packages/utils/content-hub";
import "@/styles/features/blogs/blogs.css";

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

  return (
    <div className="li-blog-index">
      <header className="li-blog-index__header">
        <p className="li-blog-index__eyebrow">My Roleplay · Blog</p>
        <h1 className="li-blog-index__title">
          GTA RP Guides &amp; LifeInvader Tips
        </h1>
        <p className="li-blog-index__subtitle">
          Practical guides for LifeInvader ad formatting, Grand RP and Eclipse
          RP conventions, and getting up to speed on GTA roleplay servers fast.
        </p>
      </header>

      <div className="li-blog-index__grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogsIndexPage;
