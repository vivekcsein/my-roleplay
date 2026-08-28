"use client";

import { Shirt } from "lucide-react";
import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useAdData } from "@/packages/hooks/useAdData";
import { useClothingAdForm } from "@/packages/hooks/useClothingAdForm";
import AutocompleteInput from "../shared/AutocompleteInput";
import CheckboxPill from "../shared/CheckboxPill";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";
import TransactionToggle from "../shared/TransactionToggle";

const ClothingAdsPanel = () => {
  const { data } = useAdData("clothing");
  const clothingItems = data?.primary ?? [];

  const form = useClothingAdForm();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <Shirt size={20} />
        <h2>Clothing Ads Creator</h2>
      </header>

      <div className="li-form">
        <FieldGroup label="Transaction Type">
          <TransactionToggle
            value={form.transaction}
            onChange={form.setTransaction}
          />
        </FieldGroup>

        <FieldGroup>
          <div className="li-pill-group">
            <CheckboxPill checked={form.trading} onChange={form.setTrading}>
              Trading Option
            </CheckboxPill>
          </div>
        </FieldGroup>

        <div className="li-form__row">
          <FieldGroup label="Color">
            <select
              className="lifeinvader-input"
              value={form.color}
              onChange={(e) => form.setColor(e.target.value)}
            >
              {form.colorOptions.map((color) => (
                <option key={color || "none"} value={color}>
                  {color
                    ? color[0]?.toUpperCase() + color.slice(1)
                    : "Select a color"}
                </option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Gender">
            <select
              className="lifeinvader-input"
              value={form.gender}
              onChange={(e) => form.setGender(e.target.value)}
            >
              {form.genderOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FieldGroup>
        </div>

        <FieldGroup label="Clothing Name">
          <AutocompleteInput
            value={form.name}
            onChange={form.setName}
            options={clothingItems}
            placeholder="Start typing…"
          />
        </FieldGroup>

        <FieldGroup label="Price">
          <Input
            value={form.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              form.setPrice(e.target.value)
            }
            placeholder="e.g. 400000"
          />
        </FieldGroup>

        <FieldGroup label="Output">
          <OutputBox
            text={form.output}
            placeholder="Enter a clothing name to generate your ad…"
          />
        </FieldGroup>
      </div>
    </section>
  );
};

export default ClothingAdsPanel;
