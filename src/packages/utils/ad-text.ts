import type { TransactionType } from "@/types/ads";

/**
 * Parses shorthand price input ("450k", "2.5m", "120000") into a
 * formatted string, or "Negotiable" when empty/invalid.
 */
export const formatPrice = (
  raw: string,
  transaction: TransactionType,
  label: "Price" | "Budget" = transaction === "Selling" ? "Price" : "Budget",
): string => {
  const trimmed = raw.trim();
  if (!trimmed) return `${label}: Negotiable`;

  const match = /^(\d+(?:\.\d+)?)\s*(k|m)?$/i.exec(trimmed);
  if (!match) return `${label}: Negotiable`;

  const [, numStr, suffix] = match;
  const num = Number.parseFloat(numStr ?? "0");
  if (Number.isNaN(num)) return `${label}: Negotiable`;

  if (suffix?.toLowerCase() === "m") {
    const formatted =
      num % 1 === 0
        ? num.toFixed(0)
        : num.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `${label}: $${formatted} Million`;
  }

  const value =
    suffix?.toLowerCase() === "k" ? Math.round(num * 1000) : Math.round(num);
  return `${label}: $${value.toLocaleString("en-US")}`;
};

/** Joins a list of phrases in natural English: "a, b and c". */
export const joinNaturally = (items: string[]): string => {
  const filtered = items.filter(Boolean);
  if (filtered.length === 0) return "";
  if (filtered.length === 1) return filtered[0] ?? "";
  const last = filtered[filtered.length - 1];
  return `${filtered.slice(0, -1).join(", ")} and ${last}`;
};

/** Collapses repeated whitespace and trims — used after template concatenation. */
export const cleanSpacing = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

/** Ensures the generated ad text ends with exactly one period. */
export const ensureTerminalPeriod = (text: string): string => {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
};
