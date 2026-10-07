import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders the supplied GTS artwork only — never re-drawn or re-typed.
 * Every variant is an exact crop of the original logo file:
 *  - "mark":      the GTS monogram with crane and swoosh
 *  - "lockup":    monogram beside the wordmark (the horizontal arrangement
 *                 used on the company letterhead)
 *  - "full":      the complete stacked logo with skyline
 *  - "wordmark":  GOURAB TECHNICAL / SERVICES LLC / DUBAI - UAE
 */
type LogoProps = {
  variant?: "mark" | "lockup" | "full" | "wordmark";
  className?: string;
  eager?: boolean;
};

const ART = {
  mark: { src: "/brand/gts-mark.png", w: 900, h: 659 },
  wordmark: { src: "/brand/gts-wordmark.png", w: 1400, h: 311 },
  compact: { src: "/brand/gts-wordmark-compact.png", w: 1400, h: 235 },
  full: { src: "/brand/gts-logo-full.png", w: 1600, h: 1570 },
} as const;

const ALT = "Gourab Technical Services LLC — Dubai, United Arab Emirates";

export function Logo({ variant = "lockup", className, eager = false }: LogoProps) {
  const loading = eager ? "eager" : "lazy";

  if (variant === "lockup") {
    return (
      <span className={cn("flex items-center gap-[0.7em]", className)}>
        <Image
          src={ART.mark.src}
          width={ART.mark.w}
          height={ART.mark.h}
          alt=""
          aria-hidden
          className="h-full w-auto"
          sizes="96px"
          loading={loading}
        />
        <Image
          src={ART.compact.src}
          width={ART.compact.w}
          height={ART.compact.h}
          alt="Gourab Technical Services LLC"
          className="h-[44%] w-auto"
          sizes="220px"
          loading={loading}
        />
      </span>
    );
  }

  const art = variant === "mark" ? ART.mark : variant === "full" ? ART.full : ART.wordmark;
  const sizes =
    variant === "mark"
      ? "(min-width: 1024px) 240px, 160px"
      : variant === "full"
        ? "(min-width: 1024px) 420px, 70vw"
        : "(min-width: 1024px) 560px, 85vw";

  return (
    <Image
      src={art.src}
      width={art.w}
      height={art.h}
      alt={ALT}
      className={cn("h-auto w-full", className)}
      sizes={sizes}
      loading={loading}
    />
  );
}
