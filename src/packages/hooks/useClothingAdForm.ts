"use client";

import { useMemo, useState } from "react";
import {
  cleanSpacing,
  ensureTerminalPeriod,
  formatPrice,
} from "@/packages/utils/ad-text";
import type { TransactionType } from "@/types/ads";

const COLOR_OPTIONS = [
  "",
  "red",
  "blue",
  "green",
  "black",
  "white",
  "yellow",
  "purple",
  "orange",
  "pink",
  "gray",
] as const;

const GENDER_OPTIONS = [
  { value: "", label: "Any" },
  { value: " for men", label: "Men" },
  { value: " for women", label: "Women" },
] as const;

export const useClothingAdForm = () => {
  const [transaction, setTransaction] = useState<TransactionType>("Selling");
  const [trading, setTrading] = useState(false);
  const [color, setColor] = useState<string>("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [price, setPrice] = useState("");

  const output = useMemo(() => {
    if (!name.trim()) return "";

    const priceText = formatPrice(price, transaction);

    const body = trading
      ? `Selling or trading ${color} ${name.trim()}${gender}`
      : `${transaction} ${color} ${name.trim()}${gender}`;

    return ensureTerminalPeriod(cleanSpacing(`${body}. ${priceText}`));
  }, [transaction, trading, color, name, gender, price]);

  return {
    transaction,
    setTransaction,
    trading,
    setTrading,
    color,
    setColor,
    name,
    setName,
    gender,
    setGender,
    price,
    setPrice,
    output,
    colorOptions: COLOR_OPTIONS,
    genderOptions: GENDER_OPTIONS,
  };
};
