import type { StaticImageData } from "next/image";
import { imageRegistry } from "../configs/images.config";

/**
 * Resolves an image path from the local image registry.
 *
 * Local:
 *   /assets/images/gta6/gta6-extended-look-cover.jpg
 *
 * External:
 *   https://example.com/image.jpg
 *
 * Returns the original external URL or the registered
 * StaticImageData for local images.
 */
export const getImageSrc = (
  src?: string,
): StaticImageData | string | undefined => {
  if (!src) {
    return undefined;
  }

  // External image
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Local registered image
  return (imageRegistry as Record<string, StaticImageData>)[src] ?? src;
};

/* =========================================================
 * CHECK IMAGE
 * ========================================================= */

/**
 * Checks whether an image exists in the local registry.
 */
export const hasLocalImage = (src?: string): boolean => {
  if (!src) {
    return false;
  }

  return src in imageRegistry;
};
