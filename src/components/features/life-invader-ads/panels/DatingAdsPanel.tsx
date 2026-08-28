"use client";
import { User } from "lucide-react";
import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useAdData } from "@/packages/hooks/useAdData";
import { useDatingAds } from "@/packages/hooks/useDatingAds";
import AutocompleteInput from "../shared/AutocompleteInput";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";

const DatingAdsPanel = () => {
  const { data } = useAdData("dating");
  const datingOptions = data?.primary ?? [];

  const form = useDatingAds();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <User size={20} />
        <h2>Dating Ads Creator</h2>
      </header>

      <div className="li-form">
        <FieldGroup label="What are you looking for?">
          <AutocompleteInput
            value={form.selectedOption}
            onChange={form.setSelectedOption}
            options={datingOptions}
            placeholder="Start typing or pick an option…"
          />
        </FieldGroup>

        {form.showFullName ? (
          <FieldGroup label="Full Name">
            <Input
              value={form.fullName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                form.setFullName(e.target.value)
              }
              placeholder="e.g. John Doe"
            />
          </FieldGroup>
        ) : null}

        <FieldGroup label="Output">
          <OutputBox
            text={form.output}
            placeholder="Select a dating option to generate your ad…"
          />
        </FieldGroup>
      </div>
    </section>
  );
};

export default DatingAdsPanel;
