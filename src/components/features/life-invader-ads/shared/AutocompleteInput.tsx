"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import "@/styles/ui/li-input.css";
import "@/styles/features/life-invader-ads/autocomplete.css";

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
  maxSuggestions?: number;
  disabled?: boolean;
}

const AutocompleteInput = (props: AutocompleteInputProps) => {
  const {
    value,
    onChange,
    options,
    placeholder,
    label,
    maxSuggestions = 8,
    disabled = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return options
      .filter((item) => item.toLowerCase().includes(q))
      .slice(0, maxSuggestions);
  }, [value, options, maxSuggestions]);

  useEffect(() => {
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (option: string) => {
    onChange(option);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || matches.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? matches.length - 1 : prev - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      const picked = matches[activeIndex];
      if (picked) selectOption(picked);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="li-autocomplete" ref={rootRef}>
      {label ? <span className="li-autocomplete__label">{label}</span> : null}
      <input
        className="lifeinvader-input"
        type="text"
        role="combobox"
        aria-expanded={open && matches.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />
      {open && matches.length > 0 ? (
        <div id={listId} className="li-autocomplete__list" role="listbox">
          {matches.map((option, index) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              className={`li-autocomplete__option${index === activeIndex ? " is-active" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AutocompleteInput;
