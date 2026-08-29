import type { BlogsConfig } from "@/types/blog";

import { gta6ExtendedLookConfig } from "./blogs/gta6-extended-look";

export const blogsConfig: BlogsConfig = {
  key: "BLOGS",

  title: "Blog",

  description:
    "Guides and tips for GTA RP — LifeInvader ad formatting, Grand RP, Libra RP and Eclipse RP server rules, and everything else to help you roleplay like a veteran.",

  slug: "blogs",

  path: "blogs",

  posts: [gta6ExtendedLookConfig],
};
