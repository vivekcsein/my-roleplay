import { z } from "zod";

const publicEnvSchema = z.object({
  // App
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default("My Roleplay"),

  NEXT_PUBLIC_APP_VERSION: z.string().trim().default("2.0.0"),

  NEXT_PUBLIC_APP_DESCRIPTION: z
    .string()
    .trim()
    .min(1)
    .default(
      "A complete field guide for PoliceRP, GangRP, LifeInvader, and EMS — built so newcomers stop guessing and start playing like a five-year veteran on day one",
    ),

  // Site
  NEXT_PUBLIC_SITE_URL: z.url().trim().default("http://localhost:3000"),

  NEXT_PUBLIC_SITE_TITLE: z
    .string()
    .trim()
    .min(1)
    .default("My Roleplay: Master Every Roleplay On Every Server"),

  NEXT_PUBLIC_LOGO_URL: z.string().trim().default("/logo.png"),

  NEXT_PUBLIC_OG_IMAGE_URL: z.string().trim().optional(),

  NEXT_PUBLIC_ACTIVE_THEME: z.enum(["system", "light", "dark"]).default("dark"),

  // Site owner / author — shown in metadata.authors and used for `rel=author` credit
  NEXT_PUBLIC_SITE_AUTHOR_NAME: z.string().trim().default("My Roleplay"),

  NEXT_PUBLIC_SITE_AUTHOR_URL: z.string().trim().default(""),
});

const parsedPublicEnv = publicEnvSchema.safeParse(process.env);

if (!parsedPublicEnv.success) {
  console.error("❌ Invalid public environment variables:");

  for (const issue of parsedPublicEnv.error.issues) {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  }

  throw new Error("Public environment validation failed");
}

export const envPublicConfig = Object.freeze({
  APP_NAME: parsedPublicEnv.data.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: parsedPublicEnv.data.NEXT_PUBLIC_APP_VERSION,
  APP_DESCRIPTION: parsedPublicEnv.data.NEXT_PUBLIC_APP_DESCRIPTION,

  SITE_URL: parsedPublicEnv.data.NEXT_PUBLIC_SITE_URL,
  SITE_TITLE: parsedPublicEnv.data.NEXT_PUBLIC_SITE_TITLE,

  LOGO_URL: parsedPublicEnv.data.NEXT_PUBLIC_LOGO_URL,
  OG_IMAGE_URL: parsedPublicEnv.data.NEXT_PUBLIC_OG_IMAGE_URL,

  ACTIVE_THEME: parsedPublicEnv.data.NEXT_PUBLIC_ACTIVE_THEME,

  AUTHOR_NAME: parsedPublicEnv.data.NEXT_PUBLIC_SITE_AUTHOR_NAME,
  AUTHOR_URL: parsedPublicEnv.data.NEXT_PUBLIC_SITE_AUTHOR_URL,
});

export type EnvPublicConfig = typeof envPublicConfig;
