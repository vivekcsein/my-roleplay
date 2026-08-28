"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/buttons/LifeInvaderButton";

interface OutputBoxProps {
  text: string;
  placeholder?: string;
}

const OutputBox = ({
  text,
  placeholder = "Fill the form to generate your ad…",
}: OutputBoxProps) => {
  const hasText = text.trim().length > 0;

  const handleCopy = async () => {
    if (!hasText) {
      toast.error("Generate an ad before copying.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Couldn't copy — try selecting the text manually.");
    }
  };

  return (
    <div className="li-output">
      <p className="li-output__text" aria-live="polite">
        {hasText ? text : placeholder}
      </p>
      <Button type="button" onClick={handleCopy}>
        <span className="li-output__copy-btn">
          <Copy size={16} />
          Copy
        </span>
      </Button>
    </div>
  );
};

export default OutputBox;
