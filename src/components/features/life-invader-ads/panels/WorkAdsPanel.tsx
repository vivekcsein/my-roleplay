"use client";

import { LucideWorkflow } from "lucide-react";
import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useAdData } from "@/packages/hooks/useAdData";
import { useWorkAds } from "@/packages/hooks/useWorkAds";
import AutocompleteInput from "../shared/AutocompleteInput";
import CheckboxPill from "../shared/CheckboxPill";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";

const WorkAdsPanel = () => {
  const { data } = useAdData("work");
  const workSuggestions = data?.primary ?? [];

  const form = useWorkAds();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <LucideWorkflow size={20} />
        <h2>Work Ads Creator</h2>
      </header>

      <div className="li-form">
        <FieldGroup label="Job / Hiring Ad">
          <AutocompleteInput
            value={form.text}
            onChange={form.setText}
            options={workSuggestions}
            placeholder="Start typing or pick a suggestion…"
          />
        </FieldGroup>

        <FieldGroup label="Salary">
          <Input
            value={form.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              form.setPrice(e.target.value)
            }
            placeholder="e.g. 60k"
          />
        </FieldGroup>

        <FieldGroup label="Payment Type">
          <div className="li-pill-group">
            <CheckboxPill
              checked={form.paymentType === "day"}
              onChange={() => form.setPaymentType("day")}
            >
              Per Day
            </CheckboxPill>
            <CheckboxPill
              checked={form.paymentType === "hour"}
              onChange={() => form.setPaymentType("hour")}
            >
              Per Hour
            </CheckboxPill>
          </div>
        </FieldGroup>

        <FieldGroup label="Output">
          <OutputBox
            text={form.output}
            placeholder="Enter or pick a work ad to generate your ad…"
          />
        </FieldGroup>
      </div>
    </section>
  );
};

export default WorkAdsPanel;
