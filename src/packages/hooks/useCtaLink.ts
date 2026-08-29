import { useMemo } from "react";

/** Decides how a CTA href should be treated: absolute http(s) URLs are
 * external (open a real anchor tag), everything else — "/", "#", relative
 * paths — is internal and should go through Next's <Link> for client-side
 * navigation. */
export const useCtaLink = (href: string) => {
  const isExternal = useMemo(() => /^https?:\/\//i.test(href), [href]);
  return { isExternal };
};
