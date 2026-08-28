import { envAppConfig } from "../env/app.env";
import { envPublicConfig } from "../env/public.env";

export const appConfig = Object.freeze({
  app: {
    name: envPublicConfig.APP_NAME,
    version: envPublicConfig.APP_VERSION,
    description: envPublicConfig.APP_DESCRIPTION,
    environment: envAppConfig.NODE_ENV,
    locale: "en",
    timezone: "UTC",
  },

  site: {
    url: envPublicConfig.SITE_URL,
    name: envPublicConfig.APP_NAME,
    title: envPublicConfig.SITE_TITLE,
    description: envPublicConfig.APP_DESCRIPTION,

    logoUrl: envPublicConfig.LOGO_URL,
    ogImageUrl: envPublicConfig.OG_IMAGE_URL,

    theme: envPublicConfig.ACTIVE_THEME,

    author: {
      name: envPublicConfig.AUTHOR_NAME,
      url: envPublicConfig.AUTHOR_URL,
    },
  },

  logging: {
    enabled: envAppConfig.NODE_ENV !== "production",
    stackTrace: envAppConfig.NODE_ENV !== "production",
  },

  headers: {
    requestId: "X-Request-Id",
    traceId: "X-Trace-Id",
    poweredBy: "X-Powered-By",
  },

  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100,
  },

  routes: {
    home: "/",
    about: "/about",

    policy: "/policy",
    privacy: "/privacy",

    robots: "/robots.txt",
    sitemap: "/sitemap.xml",
    favicon: "/favicon.ico",
  },

  keywords: [
    // Brand / core
    "My Roleplay",
    "Roleplayer",
    "Roleplay",
    "RP",
    // Category LifeInvader
    "lifeinvader",
    "life invader",
    "lifeinvader ads studio",
    "lifeinvader ad generator",
    "life invader ad generator",
    // Category ad generators
    "lifeinvader car ad generator",
    "lifeinvader house ad generator",
    "lifeinvader business ad generator",
    "lifeinvader clothing ad generator",
    "lifeinvader item ad generator",
    "gta rp car ad generator",
    "gta rp house ad generator",
    "gta rp business ad maker",
    "gta 5 rp classified ads generator",
    // Server / platform terms
    "gta rp",
    "gta 5 roleplay",
    "grand rp",
    "grand rp lifeinvader",
    "grand rp advertisement generator",
    "gta rp advertisement maker",
    "gta rp ad format",
    "gta roleplay classifieds",
  ],
});

export type AppConfig = typeof appConfig;
