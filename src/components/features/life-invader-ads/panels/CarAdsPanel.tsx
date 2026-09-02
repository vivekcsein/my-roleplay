"use client";

import { Car } from "lucide-react";
import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useCarAdForm } from "@/packages/hooks/ads/useCarAdForm";
import { useAdData } from "@/packages/hooks/useAdData";
import AutocompleteInput from "../shared/AutocompleteInput";
import CheckboxPill from "../shared/CheckboxPill";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";
import TransactionToggle from "../shared/TransactionToggle";

const CarAdsPanel = () => {
  const { data } = useAdData("car");
  const carNames = data?.primary ?? [];

  const form = useCarAdForm();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <Car size={20} />
        <h2>Car Ads Creator</h2>
      </header>

      <div className="li-form">
        <FieldGroup label="Transaction Type">
          <TransactionToggle
            value={form.transaction}
            onChange={form.setTransaction}
          />
        </FieldGroup>

        <FieldGroup label="Car Name">
          <AutocompleteInput
            value={form.carName}
            onChange={form.setCarName}
            options={carNames}
            placeholder="Start typing a car name…"
          />
        </FieldGroup>

        <FieldGroup>
          <div className="li-pill-group">
            <CheckboxPill checked={form.trading} onChange={form.setTrading}>
              Trading Option
            </CheckboxPill>
          </div>
        </FieldGroup>

        {form.trading ? (
          <FieldGroup label="Trading For">
            <AutocompleteInput
              value={form.tradingCar}
              onChange={form.setTradingCar}
              options={carNames}
              placeholder="Car you'd trade for…"
            />
          </FieldGroup>
        ) : null}

        <FieldGroup label="Configuration Type">
          <div className="li-pill-group">
            {form.configOptions.map((option) => (
              <CheckboxPill
                key={option.id}
                checked={form.configTypes.has(option.id)}
                onChange={() => form.toggleConfig(option.id)}
              >
                {option.label}
              </CheckboxPill>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup label="Extras">
          <div className="li-pill-group">
            {form.extraOptions.map((option) => (
              <CheckboxPill
                key={option.id}
                checked={form.extras.has(option.id)}
                onChange={() => form.toggleExtra(option.id)}
              >
                {option.label}
              </CheckboxPill>
            ))}
          </div>
        </FieldGroup>

        <FieldGroup
          label="Price / Budget"
          hint='Numbers, or shorthand like "450k" / "2.5m"'
        >
          <Input
            value={form.budget}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              form.setBudget(e.target.value)
            }
            placeholder="e.g. 450k"
          />
        </FieldGroup>

        <FieldGroup label="Output">
          <OutputBox text={form.output} />
        </FieldGroup>
      </div>
    </section>
  );
};

export default CarAdsPanel;
