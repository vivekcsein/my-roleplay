"use client";

import { Building2 } from "lucide-react";

import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useAdData } from "@/packages/hooks/useAdData";
import { useBusinessAdForm } from "@/packages/hooks/useBusinessAdForm";
import AutocompleteInput from "../shared/AutocompleteInput";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";
import TransactionToggle from "../shared/TransactionToggle";

const BusinessAdsPanel = () => {
  const { data } = useAdData("business");
  const businessNames = data?.primary ?? [];
  const locationSuggestions = data?.secondary ?? [];

  const form = useBusinessAdForm();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <Building2 size={20} />
        <h2>Business Ads Creator</h2>
      </header>

      <div className="li-form">
        <FieldGroup label="Transaction Type">
          <TransactionToggle
            value={form.transaction}
            onChange={form.setTransaction}
          />
        </FieldGroup>

        <FieldGroup label="Business Name">
          <AutocompleteInput
            value={form.businessName}
            onChange={form.setBusinessName}
            options={businessNames}
            placeholder="e.g. weed plantation"
          />
        </FieldGroup>

        {form.isPlantation ? (
          <FieldGroup label="Plantation Category">
            <div className="li-pill-group">
              {form.plantationCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`li-pill${form.plantationCategory === category ? " is-active" : ""}`}
                  onClick={() =>
                    form.setPlantationCategory(
                      form.plantationCategory === category ? "" : category,
                    )
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </FieldGroup>
        ) : null}

        <div className="li-form__row">
          <FieldGroup label="Business Number" hint="Optional">
            <Input
              value={form.businessNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                form.setBusinessNumber(e.target.value)
              }
              placeholder="e.g. 12"
            />
          </FieldGroup>

          <FieldGroup label="Location">
            <AutocompleteInput
              value={form.location}
              onChange={form.setLocation}
              options={locationSuggestions}
              placeholder="e.g. Paleto Bay"
            />
          </FieldGroup>
        </div>

        <FieldGroup label="Price / Budget" hint="Optional">
          <Input
            value={form.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              form.setPrice(e.target.value)
            }
            placeholder="e.g. 1.2m"
          />
        </FieldGroup>

        <FieldGroup label="Output">
          <OutputBox
            text={form.output}
            placeholder="Enter a business name to generate your ad…"
          />
        </FieldGroup>
      </div>
    </section>
  );
};

export default BusinessAdsPanel;
