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
  defaultTheme: "system",
  enableSystem: true,
} as const;
