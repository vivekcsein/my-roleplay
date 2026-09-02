"use client";

import { useMemo, useState } from "react";
import {
  cleanSpacing,
  ensureTerminalPeriod,
  formatPrice,
} from "@/packages/utils/ad-text";
import type { TransactionType } from "@/types/ads";

const PLANTATION_CATEGORIES = ["10-Bed", "15-Bed", "20-Bed"] as const;

export const useBusinessAdForm = () => {
  const [transaction, setTransaction] = useState<TransactionType>("Selling");
  const [businessName, setBusinessName] = useState("");
  const [plantationCategory, setPlantationCategory] = useState<string>("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const isPlantation = businessName.toLowerCase().includes("plantation");

  const output = useMemo(() => {
    const name = businessName.trim();
    if (!name) return "";

    let body = `${transaction}`;

    if (plantationCategory && isPlantation) {
      const stripped = name
        .replace(/ business/i, "")
        .replace(/\d+-bed /i, "")
        .trim();
      body += ` ${plantationCategory} ${stripped}`;
    } else if (businessNumber.trim()) {
      body += ` ${name.replace(/ business/i, "").trim()} №${businessNumber.trim()}`;
    } else if (
      name.toLowerCase().includes("business") &&
      !name.toLowerCase().includes("plantation business")
    ) {
      body += ` ${name}`;
    } else {
      body += ` ${name} business`;
    }

    if (location.trim()) body += ` in ${location.trim()}`;

    const priceText = formatPrice(price, transaction);

    return ensureTerminalPeriod(cleanSpacing(`${body}. ${priceText}`));
  }, [
    transaction,
    businessName,
    plantationCategory,
    isPlantation,
    businessNumber,
    location,
    price,
  ]);

  return {
    transaction,
    setTransaction,
    businessName,
    setBusinessName,
    isPlantation,
    plantationCategory,
    setPlantationCategory,
    businessNumber,
    setBusinessNumber,
    location,
    setLocation,
    price,
    setPrice,
    output,
    plantationCategories: PLANTATION_CATEGORIES,
  };
};
