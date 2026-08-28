"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";

import Button from "@/components/ui/buttons/LifeInvaderButton";
import Input from "@/components/ui/inputs/LifeInvaderInput";
import { useAdData } from "@/packages/hooks/useAdData";
import { useItemsAdForm } from "@/packages/hooks/useItemsAdForm";
import AutocompleteInput from "../shared/AutocompleteInput";
import CheckboxPill from "../shared/CheckboxPill";
import FieldGroup from "../shared/FieldGroup";
import OutputBox from "../shared/OutputBox";
import TransactionToggle from "../shared/TransactionToggle";

const ItemsAdsPanel = () => {
  const { data } = useAdData("items");
  const itemNames = data?.primary ?? [];

  const form = useItemsAdForm();

  return (
    <section className="li-panel-card">
      <header className="li-panel-card__header">
        <ShoppingBag size={20} />
        <h2>Item Ads Creator</h2>
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
            {!form.trading ? (
              <CheckboxPill checked={form.isBulk} onChange={form.setIsBulk}>
                In Bulk
              </CheckboxPill>
            ) : null}
          </div>
        </FieldGroup>

        <FieldGroup label={`Items (${form.items.length} of ${form.maxItems})`}>
          <div className="li-item-list">
            {form.items.map((item, index) => (
              <div className="li-item-row" key={item.id}>
                <div className="li-item-row__name">
                  <AutocompleteInput
                    value={item.name}
                    onChange={(value) => form.updateItemName(item.id, value)}
                    options={itemNames}
                    placeholder={`Item ${index + 1} name…`}
                  />
                </div>
                <Input
                  className="li-item-row__qty"
                  value={item.quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    form.updateItemQuantity(item.id, e.target.value)
                  }
                  placeholder="Qty"
                  inputMode="numeric"
                />
                {!form.trading ? (
                  <Input
                    className="li-item-row__price"
                    value={form.prices[index] ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      form.updatePrice(index, e.target.value)
                    }
                    placeholder="Price"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="li-form__actions">
            <Button type="button" onClick={form.removeItem}>
              <span className="li-output__copy-btn">
                <Minus size={16} />
              </span>
            </Button>
            <Button type="button" onClick={form.addItem}>
              <span className="li-output__copy-btn">
                <Plus size={16} />
              </span>
            </Button>
          </div>
        </FieldGroup>

        {form.showRespectively ? (
          <FieldGroup>
            <div className="li-pill-group">
              <CheckboxPill
                checked={form.respectively}
                onChange={form.setRespectively}
              >
                Use "respectively" for multiple prices
              </CheckboxPill>
            </div>
          </FieldGroup>
        ) : null}

        <FieldGroup label="Output">
          <OutputBox
            text={form.output}
            placeholder="Add at least one item to generate your ad…"
          />
        </FieldGroup>
      </div>
    </section>
  );
};

export default ItemsAdsPanel;
