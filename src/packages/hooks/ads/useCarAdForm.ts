"use client";

import { useMemo, useState } from "react";
import {
  cleanSpacing,
  ensureTerminalPeriod,
  formatPrice,
  joinNaturally,
} from "@/packages/utils/ad-text";
import type { TransactionType } from "@/types/ads";

const CONFIG_OPTIONS = [
  { id: "full", label: "Full", phrase: "full configuration" },
  { id: "partial", label: "Partial", phrase: "partial configuration" },
] as const;

const EXTRA_OPTIONS = [
  { id: "visual", label: "Visual Upgrades", phrase: "visual upgrades" },
  { id: "insurance", label: "Insurance", phrase: "insurance" },
  { id: "tuning", label: "Tuning Parts", phrase: "tuning parts" },
  { id: "turbo", label: "Turbo Kit", phrase: "turbo kit" },
  { id: "drift", label: "Drift Kit", phrase: "drift kit" },
] as const;

type ConfigId = (typeof CONFIG_OPTIONS)[number]["id"];
type ExtraId = (typeof EXTRA_OPTIONS)[number]["id"];

export const useCarAdForm = () => {
  const [transaction, setTransaction] = useState<TransactionType>("Selling");
  const [carName, setCarName] = useState("");
  const [trading, setTrading] = useState(false);
  const [tradingCar, setTradingCar] = useState("");
  const [configTypes, setConfigTypes] = useState<Set<ConfigId>>(new Set());
  const [extras, setExtras] = useState<Set<ExtraId>>(new Set());
  const [budget, setBudget] = useState("");

  const toggleConfig = (id: ConfigId) => {
    setConfigTypes((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleExtra = (id: ExtraId) => {
    setExtras((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const output = useMemo(() => {
    const displayName = carName.trim() ? `"${carName.trim()}"` : "a car";

    const configPhrases = CONFIG_OPTIONS.filter((c) =>
      configTypes.has(c.id),
    ).map((c) => c.phrase);
    const configText = configPhrases.length
      ? ` in ${configPhrases.join(" and ")}`
      : "";

    const extraPhrases = EXTRA_OPTIONS.filter((e) => extras.has(e.id)).map(
      (e) => e.phrase,
    );
    const extrasText = extraPhrases.length
      ? ` with ${joinNaturally(extraPhrases)}`
      : "";

    const priceText = formatPrice(budget, transaction);

    let body: string;
    if (trading) {
      const tradeTarget = tradingCar.trim()
        ? ` for "${tradingCar.trim()}"`
        : "";
      body = `${transaction} or trading ${displayName}${tradeTarget}${configText}${extrasText}`;
    } else {
      body = `${transaction} ${displayName}${configText}${extrasText}`;
    }

    return ensureTerminalPeriod(cleanSpacing(`${body}. ${priceText}`));
  }, [carName, trading, tradingCar, configTypes, extras, budget, transaction]);

  return {
    transaction,
    setTransaction,
    carName,
    setCarName,
    trading,
    setTrading,
    tradingCar,
    setTradingCar,
    configTypes,
    toggleConfig,
    extras,
    toggleExtra,
    budget,
    setBudget,
    output,
    configOptions: CONFIG_OPTIONS,
    extraOptions: EXTRA_OPTIONS,
  };
};
