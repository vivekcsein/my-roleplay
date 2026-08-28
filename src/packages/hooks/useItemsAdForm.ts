"use client";

import { useMemo, useState } from "react";
import {
  cleanSpacing,
  ensureTerminalPeriod,
  formatPrice,
  joinNaturally,
} from "@/packages/utils/ad-text";
import type { TransactionType } from "@/types/ads";

export interface ItemEntry {
  id: string;
  name: string;
  quantity: string;
}

const MAX_ITEMS = 3;

const makeEntry = (id: string): ItemEntry => ({ id, name: "", quantity: "" });

let entryCounter = 0;
const nextId = () => `item-${entryCounter++}`;

export const useItemsAdForm = () => {
  const [transaction, setTransaction] = useState<TransactionType>("Selling");
  const [trading, setTrading] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [respectively, setRespectively] = useState(false);
  const [items, setItems] = useState<ItemEntry[]>([makeEntry(nextId())]);
  const [prices, setPrices] = useState<string[]>([""]);

  const addItem = () => {
    if (items.length >= MAX_ITEMS || trading) return;
    setItems((prev) => [...prev, makeEntry(nextId())]);
    setPrices((prev) => [...prev, ""]);
  };

  const removeItem = () => {
    if (items.length <= 1) return;
    setItems((prev) => prev.slice(0, -1));
    setPrices((prev) => prev.slice(0, -1));
  };

  const updateItemName = (id: string, name: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item)),
    );
  };

  const updateItemQuantity = (id: string, quantity: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const updatePrice = (index: number, value: string) => {
    setPrices((prev) => prev.map((p, i) => (i === index ? value : p)));
  };

  const handleSetTrading = (value: boolean) => {
    setTrading(value);
    if (value) {
      setIsBulk(false);
      setItems((prev) => prev.slice(0, 1));
      setPrices((prev) => prev.slice(0, 1));
    }
  };

  const activeItems = items.filter((item) => item.name.trim().length > 0);

  const output = useMemo(() => {
    if (activeItems.length === 0) return "";

    const itemPhrases = activeItems.map((item) => {
      const qty = Number.parseInt(item.quantity, 10);
      return qty > 1 ? `${qty}x ${item.name.trim()}` : item.name.trim();
    });

    const itemsText = joinNaturally(itemPhrases);
    const bulkText = isBulk && !trading ? " in bulk" : "";

    let body = trading
      ? `Selling or trading ${itemsText}`
      : `${transaction} ${itemsText}${bulkText}`;

    if (trading) {
      return ensureTerminalPeriod(cleanSpacing(body));
    }

    const label = transaction === "Buying" ? "Budget" : "Price";

    if (activeItems.length > 1 && respectively) {
      const priceTexts = activeItems.map((_, i) =>
        formatPrice(prices[i] ?? "", transaction, label).replace(
          `${label}: `,
          "",
        ),
      );
      body += `. ${label}: ${priceTexts.join(", ")} respectively`;
    } else {
      const priceText = formatPrice(prices[0] ?? "", transaction, label);
      body += `. ${priceText}`;
    }

    return ensureTerminalPeriod(cleanSpacing(body));
  }, [activeItems, isBulk, trading, transaction, respectively, prices]);

  return {
    transaction,
    setTransaction,
    trading,
    setTrading: handleSetTrading,
    isBulk,
    setIsBulk,
    respectively,
    setRespectively,
    items,
    addItem,
    removeItem,
    updateItemName,
    updateItemQuantity,
    prices,
    updatePrice,
    output,
    canAddItem: items.length < MAX_ITEMS && !trading,
    canRemoveItem: items.length > 1,
    showRespectively: activeItems.length > 1 && !trading,
    maxItems: MAX_ITEMS,
  };
};
