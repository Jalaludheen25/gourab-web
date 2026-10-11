import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Renders the supplied GTS artwork only — never re-drawn or re-typed.
 * Every variant is an exact crop of reference/arabic.png, so the Arabic name
 * keeps its original style, proportions and alignment:
 *  - "lockup":   monogram beside the wordmark (header)
 *  - "wordmark": GOURAB TECHNICAL / SERVICES LLC / Arabic name
 *  - "stacked":  monogram above the wordmark, without the skyline (loader, curtain)
 */
type LogoProps = {
  variant?: "lockup" | "wordmark" | "stacked";
  className?: string;
  eager?: boolean;
};

const ART = {
  mark: { src: "/brand/gts-mark.png", w: 900, h: 661 },
  wordmark: { src: "/brand/gts-wordmark.png", w: 1400, h: 395 },
  stacked: { src: "/brand/gts-logo-stacked.png", w: 1400, h: 1226 },
} as const;

const ALT = `${site.legalName} — ${site.arabicName}`;

export function Logo({ variant = "lockup", className, eager = false }: LogoProps) {
  const loading = eager ? "eager" : "lazy";

  if (variant === "lockup") {
    return (
      <span className={cn("flex h-full items-center gap-[0.4rem]", className)}>
        <Image
          src={ART.mark.src}
          width={ART.mark.w}
          height={ART.mark.h}
          alt=""
          aria-hidden
          className="h-full w-auto"
          sizes="80px"
          loading={loading}
        />
        <Image
          src={ART.wordmark.src}
          width={ART.wordmark.w}
          height={ART.wordmark.h}
          alt={ALT}
          className="h-full w-auto"
          sizes="200px"
          loading={loading}
        />
      </span>
    );
  }

  const art = variant === "stacked" ? ART.stacked : ART.wordmark;
  const sizes = variant === "stacked" ? "(min-width: 1024px) 420px, 60vw" : "(min-width: 1024px) 560px, 85vw";

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
