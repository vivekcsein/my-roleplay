import { useId } from "react";
import type { TransactionType } from "@/types/ads";

interface TransactionToggleProps {
  value: TransactionType;
  onChange: (value: TransactionType) => void;
}

const OPTIONS: TransactionType[] = ["Selling", "Buying"];

const TransactionToggle = ({ value, onChange }: TransactionToggleProps) => {
  const name = useId();

  return (
    <div className="li-toggle" role="radiogroup" aria-label="Transaction type">
      {OPTIONS.map((option) => (
        <label
          key={option}
          className={`li-toggle__option${value === option ? " is-active" : ""} li-toggle__option--${option.toLowerCase()}`}
        >
          <input
            type="radio"
            name={name}
            className="li-toggle__input"
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default TransactionToggle;
