"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  deobfuscate,
  type ObfuscatedPayload,
} from "@/packages/security/obfuscate";
import type { AdCategory, NormalizedAdData } from "@/types/ads";

const CACHE_PREFIX = "li-ads-cache:";
const REVALIDATE_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

interface CacheEntry {
  data: NormalizedAdData;
  version: string | null;
  fetchedAt: number;
}

interface ApiResponse {
  version: string | null;
  payload?: ObfuscatedPayload;
  notModified?: boolean;
}

const cacheKey = (category: AdCategory) => `${CACHE_PREFIX}${category}`;

const readCache = (category: AdCategory): CacheEntry | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(cacheKey(category));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (!parsed?.data || typeof parsed.fetchedAt !== "number") return null;
    return parsed;
  } catch {
    // Corrupt cache — treat as empty and let a fresh fetch overwrite it.
    return null;
  }
};

const writeCache = (category: AdCategory, entry: CacheEntry) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(cacheKey(category), JSON.stringify(entry));
  } catch {
    // Storage full/unavailable — non-fatal, data still works in-memory.
  }
};

interface UseAdDataResult {
  data: NormalizedAdData | null;
  loading: boolean;
  error: string | null;
}

/**
 * Loads a category's ad dataset, preferring localStorage cache and
 * revalidating against the server at most once every 7 days (or when
 * the cache is missing/corrupt).
 */
export const useAdData = (category: AdCategory): UseAdDataResult => {
  const [data, setData] = useState<NormalizedAdData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestedRef = useRef(false);

  const fetchFresh = useCallback(
    async (knownVersion: string | null, hasCachedData: boolean) => {
      try {
        const qs = knownVersion ? `?v=${encodeURIComponent(knownVersion)}` : "";
        const res = await fetch(`/api/ads-data/${category}${qs}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const body = (await res.json()) as ApiResponse;

        if (body.notModified) {
          // Server confirms our cached copy is still current — just bump the timestamp.
          const cached = readCache(category);
          if (cached) {
            writeCache(category, { ...cached, fetchedAt: Date.now() });
          }
          return;
        }

        if (!body.payload) throw new Error("Malformed response");

        const decoded = deobfuscate<NormalizedAdData>(body.payload);
        writeCache(category, {
          data: decoded,
          version: body.version,
          fetchedAt: Date.now(),
        });
        setData(decoded);
        setError(null);
      } catch (err) {
        if (!hasCachedData) {
          setError(
            err instanceof Error ? err.message : "Failed to load ad data",
          );
        }
        // If we already have cached data, fail silently in the background —
        // stale data is still usable.
      } finally {
        setLoading(false);
      }
    },
    [category],
  );

  useEffect(() => {
    if (requestedRef.current) return;
    requestedRef.current = true;

    const cached = readCache(category);
    if (cached) {
      setData(cached.data);
      setLoading(false);
    }

    const isStale = !cached || Date.now() - cached.fetchedAt > REVALIDATE_MS;
    if (isStale) {
      void fetchFresh(cached?.version ?? null, Boolean(cached));
    }
  }, [category, fetchFresh]);

  return { data, loading, error };
};
