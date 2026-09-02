"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Light/dark switch for the header. Mounts to "unknown" on the server (and
 * for one tick on the client) since next-themes can't know the stored
 * preference until after hydration — rendering a neutral placeholder
 * until then avoids a flash of the wrong icon/hydration mismatch.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rp-nav__theme-toggle"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
    >
      {mounted ? (
        isDark ? (
          <Sun size={18} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Moon size={18} strokeWidth={2} aria-hidden="true" />
        )
      ) : (
        <span className="rp-nav__theme-toggle-placeholder" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
