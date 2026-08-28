import type { ReactNode } from "react";

interface CheckboxPillProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  disabled?: boolean;
}

const CheckboxPill = ({
  checked,
  onChange,
  children,
  disabled,
}: CheckboxPillProps) => {
  return (
    <label
      className={`li-pill${checked ? " is-active" : ""}${disabled ? " is-disabled" : ""}`}
    >
      <input
        type="checkbox"
        className="li-pill__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </label>
  );
};

export default CheckboxPill;
