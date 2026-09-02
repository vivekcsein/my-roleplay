import { getFilePath } from "../utils/get-file";

export { getFilePath } from "../utils/get-file";

const path = "/";

export type DocsItem = {
  key: string;
  title: string;
  description?: string;
  slug: string;
  /** Category/slug composite string — reference-only metadata, not a navigable route.
   * The real in-site link is computed from `slug` — see normalizeDocsList() in
   * packages/utils/content-normalize.ts. */
  docPath: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  keywords?: string[];
  images?: string[];
  coverImage?: string;
};

export const docsConfig = {
  key: "DOCS",
  title: "Documentation",
  description:
    "Explore organized guides, references, tutorials, and resources to help you learn, build, and work more effectively.",
  slug: "docs",
  path: "docs",

  docsList: [
    {
      key: "lifeinvader-ads-policy",
      title: "LifeInvader Ads Policy",
      description:
        "A comprehensive guide to the LifeInvader ad format, including the rules, guidelines, and best practices.",
      slug: "ads-policy-guide",
      docPath: "ads/ads-policy-guide",
      coverImage: "lifeinvader-ads-policy.jpg",
      file: getFilePath(`${path}/lifeinvader-ads-policy.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: ["ads", "lifeinvader", "ad", "format", "guidelines", "rules"],
      images: [],
    },
    {
      key: "character-building-guide",
      title: "Character Building Guide",
      description:
        "A step-by-step guide to building a character that fits your role and playstyle.",
      slug: "character-building-guide",
      docPath: "character-building/character-building-guide",
      coverImage: "roleplay-gta5-guide.jpg",
      file: getFilePath(`${path}/character-building-guide.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "character",
        "building",
        "guide",
        "step-by-step",
        "roleplay",
        "playing",
        "style",
      ],
    },
    {
      key: "roleplay-basic-terms",
      title: "Roleplay Basic Terms",
      description:
        "A reference guide to the basic terms and concepts you'll need to know to play in a roleplay server.",
      slug: "roleplay-basic-terms",
      docPath: "roleplay-basic-terms",
      coverImage: "roleplay-basic-terms.jpg",
      file: getFilePath(`${path}/roleplay-basic-terms.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "roleplay",
        "basic",
        "terms",
        "concepts",
        "server",
        "playing",
        "game",
        "games",
      ],
    },
    {
      key: "roleplay-fairplay-rules",
      title: "Fairplay Rules",
      description:
        "A comprehensive guide to Fairplay, the roleplaying system used by the Grand Theft Auto Online community.",
      slug: "roleplay-fairplay-rules",
      docPath: "roleplay-fairplay/roleplay-fairplay-rules",
      coverImage: "roleplay-fairplay-rules.jpg",
      file: getFilePath(`${path}/roleplay-fairplay-rules.md`),
      createdAt: "18/08/2024",
      updatedAt: "22/08/2025",
      keywords: [
        "roleplay",
        "fairplay",
        "guide",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
    {
      key: "roleplay-general-rules",
      title: "General Rules",
      description:
        "A comprehensive guide to the rules and guidelines of the Grand Theft Auto Online community.",
      slug: "roleplay-general-rules",
      docPath: "roleplay-general-rules",
      coverImage: "roleplay-general-rules.jpg",
      file: getFilePath(`${path}/roleplay-general-rules.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "roleplay",
        "general",
        "rules",
        "guidelines",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
    {
      key: "roleplay-money-guide",
      title: "Money Guide",
      description:
        "A comprehensive guide to the economy of the Grand Theft Auto Online community.",
      slug: "roleplay-money-guide",
      docPath: "roleplay-money/roleplay-money-guide",
      coverImage: "roleplay-how-to-make-money.jpg",
      file: getFilePath(`${path}/roleplay-money-guide.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "roleplay",
        "money",
        "guide",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
    {
      key: "family-10-rank-system",
      title: "Family 10 Ranking System",
      description:
        "A comprehensive guide to the 10 rank system used by the Grand Theft Auto Online community.",
      slug: "family-10-rank-system",
      docPath: "family-10-rank-system",
      coverImage: "family-10-ranking-system.jpg",
      file: getFilePath(`${path}/family-10-ranking-system.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "family",
        "10",
        "rank",
        "system",
        "guide",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
    {
      key: "family-7-rank-system",
      title: "Family 7 Ranking System",
      description:
        "A comprehensive guide to the 7 rank system used by the Grand Theft Auto Online community.",
      slug: "family-7-rank-system",
      docPath: "family-7-rank-system",
      coverImage: "family-7-ranking-system.jpg",
      file: getFilePath(`${path}/family-7-ranking-system.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "family",
        "7",
        "rank",
        "system",
        "guide",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
    {
      key: "family-events-system",
      title: "Family Events System",
      description:
        "A comprehensive guide to the events system used by the Grand Theft Auto Online community.",
      slug: "family-events-system",
      docPath: "family-events-system",
      coverImage: "family-events-system.jpg",
      file: getFilePath(`${path}/family-events-system.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "family",
        "events",
        "system",
        "guide",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
    {
      key: "family-bonus-system",
      title: "Family Bonus System",
      description:
        "A comprehensive guide to the bonus system used by the GTA RP Top Families.",
      slug: "family-bonus-system",
      docPath: "family-bonus-system",
      coverImage: "family-bonus-system.jpg",
      file: getFilePath(`${path}/family-bonus-system.md`),
      createdAt: "22/08/2026",
      updatedAt: "22/08/2026",
      keywords: [
        "family",
        "bonus",
        "system",
        "guide",
        "game",
        "games",
        "community",
        "gta",
        "gtao",
      ],
    },
  ],
} satisfies {
  key: string;
  title: string;
  description: string;
  slug: string;
  path: string;
  docsList: DocsItem[];
};
