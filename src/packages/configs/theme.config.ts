/**
 * Shared motion durations (ms), so components animate in sync
 * instead of every file inventing its own "0.2s ease" constant.
 */
export const MOTION_DURATION = {
  instant: 100,
  fast: 150,
  base: 250,
  slow: 400,
} as const;

export type MotionDurationKey = keyof typeof MOTION_DURATION;

// theme configs
export const THEME_STORAGE_KEY = "theme";

export const themeConfig = {
  storageKey: THEME_STORAGE_KEY,
  defaultTheme: "dark",
  enableSystem: false,
  /** No theme toggle exists anywhere in the UI — the site is dark-only by
   * design. Forcing it here (rather than just setting a default) means
   * next-themes never reads localStorage/system preference and never has
   * a reason to switch away from dark, which is what was silently
   * fighting the old forced-dark inline script in apply-theme.ts. */
  forcedTheme: "dark",
} as const;
