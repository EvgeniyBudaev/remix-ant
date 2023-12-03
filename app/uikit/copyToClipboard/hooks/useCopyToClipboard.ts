import { useState } from "react";

type TCopiedValue = string | null;
type TCopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [TCopiedValue, TCopyFn] {
  const [copiedText, setCopiedText] = useState<TCopiedValue>(null);

  const copy: TCopyFn = async (text) => {
    if (!navigator?.clipboard) {
      const textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setCopiedText(text);
        return true;
      } catch (error) {
        console.warn("Copy to clipboard failed.", error);
        setCopiedText(null);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed.", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
