"use client";

import { Home } from "lucide-react";

import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useAdData } from "@/packages/hooks/useAdData";
import { useHouseAdForm } from "@/packages/hooks/useHouseAdForm";
import AutocompleteInput from "../shared/AutocompleteInput";
import CheckboxPill from "../shared/CheckboxPill";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";
import TransactionToggle from "../shared/TransactionToggle";

const HouseAdsPanel = () => {
  const { data } = useAdData("house");
  const locations = data?.primary ?? [];

  const form = useHouseAdForm();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <Home size={20} />
        <h2>House Ads Creator</h2>
      </header>

      <div className="li-form">
        <FieldGroup label="Transaction Type">
          <TransactionToggle
            value={form.transaction}
            onChange={form.setTransaction}
          />
        </FieldGroup>

        <div className="li-form__row">
          <FieldGroup label="House Number" hint="Optional">
            <Input
              value={form.houseNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                form.setHouseNumber(e.target.value)
              }
              disabled={form.isApartment}
              placeholder="e.g. 42"
            />
          </FieldGroup>

          <FieldGroup label="Apartment">
            <div className="li-pill-group">
              <CheckboxPill
                checked={form.isApartment}
                onChange={form.setIsApartment}
              >
                It's an apartment
              </CheckboxPill>
            </div>
          </FieldGroup>
        </div>

        {form.isApartment ? (
          <FieldGroup label="Apartment No." hint="Optional">
            <Input
              value={form.apartmentNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                form.setApartmentNumber(e.target.value)
              }
              placeholder="e.g. 12B"
            />
          </FieldGroup>
        ) : null}

        <FieldGroup label="Garage Space" hint="Optional">
          <div className="li-pill-group">
            {form.garageOptions.map((option) => (
              <CheckboxPill
                key={option.id}
                checked={form.garages.has(option.id)}
                onChange={() => form.toggleGarage(option.id)}
              >
                {option.label}
              </CheckboxPill>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="Warehouse Space" hint="Optional">
          <div className="li-pill-group">
            {form.warehouseOptions.map((option) => (
              <CheckboxPill
                key={option.id}
                checked={form.warehouses.has(option.id)}
                onChange={() => form.toggleWarehouse(option.id)}
              >
                {option.label}
              </CheckboxPill>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="Features" hint="Optional">
          <div className="li-pill-group">
            {form.featureOptions.map((option) => (
              <CheckboxPill
                key={option.id}
                checked={form.features.has(option.id)}
                onChange={() => form.toggleFeature(option.id)}
              >
                {option.label}
              </CheckboxPill>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="Others" hint="Optional">
          <div className="li-pill-group">
            {form.otherOptions.map((option) => (
              <CheckboxPill
                key={option.id}
                checked={form.others.has(option.id)}
                onChange={() => form.toggleOther(option.id)}
              >
                {option.label}
              </CheckboxPill>
            ))}
          </div>
        </FieldGroup>

        <div className="li-form__row">
          <FieldGroup label="View" hint="Optional">
            <select
              className="lifeinvader-input"
              value={form.view}
              onChange={(e) => form.setView(e.target.value)}
            >
              {form.viewOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Location" hint="Optional">
            <AutocompleteInput
              value={form.location}
              onChange={form.setLocation}
              options={locations}
              placeholder="e.g. Vinewood Hills"
            />
          </FieldGroup>
        </div>

        <FieldGroup
          label="Price / Budget"
          hint='Optional — numbers or shorthand like "2.5m"'
        >
          <Input
            value={form.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              form.setPrice(e.target.value)
            }
            placeholder="e.g. 2.5m"
          />
        </FieldGroup>

        <FieldGroup label="Output">
          <OutputBox text={form.output} />
        </FieldGroup>
      </div>
    </section>
  );
};

export default HouseAdsPanel;
