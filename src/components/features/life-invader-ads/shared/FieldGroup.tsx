import type { ReactNode } from "react";

interface FieldGroupProps {
  label?: string;
  children: ReactNode;
  hint?: string;
}

const FieldGroup = ({ label, children, hint }: FieldGroupProps) => {
  return (
    <div className="li-field">
      {label ? <span className="li-field__label">{label}</span> : null}
      {children}
      {hint ? <span className="li-field__hint">{hint}</span> : null}
    </div>
  );
};

export default FieldGroup;
