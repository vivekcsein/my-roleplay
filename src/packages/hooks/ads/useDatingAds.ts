"use client";

import { useMemo, useState } from "react";
import { cleanSpacing, ensureTerminalPeriod } from "@/packages/utils/ad-text";

const SPECIFIC_PERSON_OPTION = "Looking for a specific person.";

export const useDatingAds = () => {
  const [selectedOption, setSelectedOptionState] = useState("");
  const [fullName, setFullName] = useState("");

  const showFullName = selectedOption === SPECIFIC_PERSON_OPTION;

  const setSelectedOption = (option: string) => {
    setSelectedOptionState(option);
    if (option !== SPECIFIC_PERSON_OPTION) {
      setFullName("");
    }
  };

  const output = useMemo(() => {
    if (!selectedOption) return "";

    if (showFullName && fullName.trim()) {
      return ensureTerminalPeriod(
        cleanSpacing(`Looking for ${fullName.trim()}`),
      );
    }

    return selectedOption;
  }, [selectedOption, showFullName, fullName]);

  return {
    selectedOption,
    setSelectedOption,
    fullName,
    setFullName,
    showFullName,
    output,
  };
};
