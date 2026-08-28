import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.config";
import { getAllBlogPosts } from "@/packages/content/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();

  return [
    {
      url: appConfig.site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${appConfig.site.url}/life-invader-ads`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${appConfig.site.url}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${appConfig.site.url}/blogs/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
