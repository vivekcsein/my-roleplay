"use client";

import {
  Building2,
  Car,
  Home,
  LucideWorkflow,
  Shirt,
  ShoppingBag,
  User,
} from "lucide-react";
import type { AdCategory } from "@/types/ads";

interface TabDefinition {
  id: AdCategory;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const TABS: TabDefinition[] = [
  { id: "car", label: "Car Ads", icon: Car },
  { id: "house", label: "House Ads", icon: Home },
  { id: "clothing", label: "Clothing Ads", icon: Shirt },
  { id: "items", label: "Item Ads", icon: ShoppingBag },
  { id: "business", label: "Business Ads", icon: Building2 },
  { id: "work", label: "Work Ads", icon: LucideWorkflow },
  { id: "dating", label: "Dating Ads", icon: User },
];

interface AdTabsProps {
  active: AdCategory;
  onChange: (category: AdCategory) => void;
}

const AdTabs = ({ active, onChange }: AdTabsProps) => {
  return (
    <div className="li-tabs" role="tablist" aria-label="Ad categories">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          id={`li-tab-${id}`}
          aria-selected={active === id}
          aria-controls={`li-panel-${id}`}
          className={`li-tabs__item${active === id ? " is-active" : ""}`}
          onClick={() => onChange(id)}
        >
          <Icon size={17} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default AdTabs;
