// Ad category identifiers — single source of truth for tabs, routes, and data lookups.
export type AdCategory =
  | "car"
  | "house"
  | "clothing"
  | "items"
  | "business"
  | "work"
  | "dating";

declare global {
  interface Window {
    _mNHandle?: {
      queue: Array<() => void>;
    };
    _mNDetails?: {
      loadTag: (crid: string, size: string, elementId: string) => void;
    };
    adsbygoogle?: unknown[];
  }
}

export type TransactionType = "Buying" | "Selling";

/** Raw shape of each JSON file under src/data — flat name lists only. */
export interface CarDataset {
  carNames: string[];
}

export interface HouseDataset {
  locationList: string[];
}

export interface ClothingDataset {
  clothingItems: string[];
}

export interface ItemsDataset {
  itemsList: string[];
}

export interface BusinessDataset {
  businessNames: string[];
  locationSuggestions: string[];
}

export interface DatingDataset {
  SEARCH_DATING_OPTIONS: string[];
}

export interface WorkDataset {
  WORK_SUGGESTIONS: string[];
}

export type AdDataset =
  | CarDataset
  | HouseDataset
  | ClothingDataset
  | ItemsDataset
  | BusinessDataset
  | DatingDataset
  | WorkDataset;

/** Normalized shape every category resolves to on the client: just named lists. */
export interface NormalizedAdData {
  primary: string[];
  secondary?: string[];
}
