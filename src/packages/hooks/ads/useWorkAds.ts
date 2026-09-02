"use client";

import { useMemo, useState } from "react";
import { cleanSpacing, ensureTerminalPeriod } from "@/packages/utils/ad-text";

export type PaymentType = "day" | "hour" | "";

/**
 * Parses shorthand price input ("450k", "2.5m", "120000") into a
 * formatted salary string, or "Negotiable" when empty/invalid.
 * Local variant of ad-text's formatPrice — that helper's label type is
 * locked to "Price" | "Budget", so we keep this small parser separate
 * rather than widening a shared type for one panel.
 */
const formatSalary = (raw: string, paymentType: PaymentType): string => {
  const trimmed = raw.trim();
  const suffix =
    paymentType === "day"
      ? " per day"
      : paymentType === "hour"
        ? " per hour"
        : "";

  if (!trimmed) return "Salary: Negotiable";

  const match = /^(\d+(?:\.\d+)?)\s*(k|m)?$/i.exec(trimmed);
  if (!match) return "Salary: Negotiable";

  const [, numStr, unitSuffix] = match;
  const num = Number.parseFloat(numStr ?? "0");
  if (Number.isNaN(num)) return "Salary: Negotiable";

  if (unitSuffix?.toLowerCase() === "m") {
    const formatted =
      num % 1 === 0
        ? num.toFixed(0)
        : num.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `Salary: $${formatted} Million${suffix}`;
  }

  const value =
    unitSuffix?.toLowerCase() === "k"
      ? Math.round(num * 1000)
      : Math.round(num);
  return `Salary: $${value.toLocaleString("en-US")}${suffix}`;
};

export const useWorkAds = () => {
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [paymentType, setPaymentTypeState] = useState<PaymentType>("");

  const selectSuggestion = (suggestion: string) => {
    setText(suggestion);
  };

  const setPaymentType = (type: PaymentType) => {
    setPaymentTypeState((prev) => (prev === type ? "" : type));
  };

  const output = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return "";

    return ensureTerminalPeriod(
      cleanSpacing(`${trimmed}. ${formatSalary(price, paymentType)}`),
    );
  }, [text, price, paymentType]);

  return {
    text,
    setText,
    selectSuggestion,
    price,
    setPrice,
    paymentType,
    setPaymentType,
    output,
  };
};
