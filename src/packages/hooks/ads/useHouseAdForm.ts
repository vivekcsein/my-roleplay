"use client";

import { useMemo, useState } from "react";
import {
  cleanSpacing,
  ensureTerminalPeriod,
  formatPrice,
} from "@/packages/utils/ad-text";
import type { TransactionType } from "@/types/ads";

const GARAGE_OPTIONS = [
  { id: "g2", label: "2 g.s.", phrase: "2 g.s." },
  { id: "g5", label: "5 g.s.", phrase: "5 g.s." },
  { id: "g9", label: "9 g.s.", phrase: "9 g.s." },
  { id: "g25", label: "25 g.s.", phrase: "25 g.s." },
] as const;

const WAREHOUSE_OPTIONS = [
  { id: "w3", label: "3 w.h.", phrase: "3 w.h." },
  { id: "w4", label: "4 w.h.", phrase: "4 w.h." },
  { id: "w5", label: "5 w.h.", phrase: "5 w.h." },
] as const;

const FEATURE_OPTIONS = [
  { id: "garden", label: "Garden", phrase: "a garden" },
  { id: "interior", label: "Custom Interior", phrase: "custom interior" },
  { id: "insurance", label: "Insurance", phrase: "insurance" },
] as const;

const OTHER_OPTIONS = [
  { id: "helipad", label: "Helipad", phrase: "helipad" },
  { id: "tennis", label: "Tennis Court", phrase: "tennis court" },
  { id: "driveway", label: "Long Driveway", phrase: "long driveway" },
  { id: "pool", label: "Swimming Pool", phrase: "swimming pool" },
] as const;

const VIEW_OPTIONS = [
  { value: "", label: "No preference" },
  { value: "a nice view", label: "Nice view" },
  { value: "a beautiful view", label: "Beautiful view" },
  { value: "a great view", label: "Great view" },
  { value: "a good view", label: "Good view" },
] as const;

type GarageId = (typeof GARAGE_OPTIONS)[number]["id"];
type WarehouseId = (typeof WAREHOUSE_OPTIONS)[number]["id"];
type FeatureId = (typeof FEATURE_OPTIONS)[number]["id"];
type OtherId = (typeof OTHER_OPTIONS)[number]["id"];

const makeToggler =
  <T extends string>(setter: React.Dispatch<React.SetStateAction<Set<T>>>) =>
  (id: T) => {
    setter((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

export const useHouseAdForm = () => {
  const [transaction, setTransaction] = useState<TransactionType>("Selling");
  const [houseNumber, setHouseNumber] = useState("");
  const [isApartment, setIsApartment] = useState(false);
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [garages, setGarages] = useState<Set<GarageId>>(new Set());
  const [warehouses, setWarehouses] = useState<Set<WarehouseId>>(new Set());
  const [features, setFeatures] = useState<Set<FeatureId>>(new Set());
  const [others, setOthers] = useState<Set<OtherId>>(new Set());
  const [view, setView] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const toggleGarage = makeToggler(setGarages);
  const toggleWarehouse = makeToggler(setWarehouses);
  const toggleFeature = makeToggler(setFeatures);
  const toggleOther = makeToggler(setOthers);

  const output = useMemo(() => {
    let subject: string;
    if (isApartment) {
      subject = apartmentNumber.trim()
        ? `apartment №${apartmentNumber.trim()}`
        : "an apartment";
    } else if (houseNumber.trim()) {
      subject = `house №${houseNumber.trim()}`;
    } else {
      subject = "a house";
    }

    const gardenPhrase = FEATURE_OPTIONS.filter(
      (f) => f.id === "garden" && features.has(f.id),
    ).map((f) => f.phrase);
    const otherFeaturePhrases = FEATURE_OPTIONS.filter(
      (f) => f.id !== "garden" && features.has(f.id),
    ).map((f) => f.phrase);
    const garagePhrases = GARAGE_OPTIONS.filter((g) => garages.has(g.id)).map(
      (g) => g.phrase,
    );
    const warehousePhrases = WAREHOUSE_OPTIONS.filter((w) =>
      warehouses.has(w.id),
    ).map((w) => w.phrase);
    const otherPhrases = OTHER_OPTIONS.filter((o) => others.has(o.id)).map(
      (o) => o.phrase,
    );

    const mainFeatures = [
      ...gardenPhrase,
      ...garagePhrases,
      ...warehousePhrases,
      ...otherFeaturePhrases,
      ...otherPhrases,
    ];

    let body = `${transaction === "Selling" ? "Selling" : "Buying"} ${subject}`;

    if (mainFeatures.length > 0) {
      body +=
        mainFeatures.length === 1
          ? ` with ${mainFeatures[0]}`
          : ` with ${mainFeatures.slice(0, -1).join(", ")} and ${mainFeatures[mainFeatures.length - 1]}`;
    }

    if (view) body += ` and ${view}`;
    if (location.trim()) body += `  ${location.trim()}`;

    const priceText = formatPrice(price, transaction);

    return ensureTerminalPeriod(cleanSpacing(`${body}. ${priceText}`));
  }, [
    transaction,
    houseNumber,
    isApartment,
    apartmentNumber,
    garages,
    warehouses,
    features,
    others,
    view,
    location,
    price,
  ]);

  return {
    transaction,
    setTransaction,
    houseNumber,
    setHouseNumber,
    isApartment,
    setIsApartment,
    apartmentNumber,
    setApartmentNumber,
    garages,
    toggleGarage,
    warehouses,
    toggleWarehouse,
    features,
    toggleFeature,
    others,
    toggleOther,
    view,
    setView,
    location,
    setLocation,
    price,
    setPrice,
    output,
    garageOptions: GARAGE_OPTIONS,
    warehouseOptions: WAREHOUSE_OPTIONS,
    featureOptions: FEATURE_OPTIONS,
    otherOptions: OTHER_OPTIONS,
    viewOptions: VIEW_OPTIONS,
  };
};
