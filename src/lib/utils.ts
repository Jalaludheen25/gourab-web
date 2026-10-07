import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know the custom type scale from globals.css —
 * otherwise `text-headline` is mistaken for a text colour and dropped when
 * merged with e.g. `text-steel-50`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["mega", "display", "headline", "title", "statement", "lead", "eyebrow"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function absoluteUrl(path: string, base: string) {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
