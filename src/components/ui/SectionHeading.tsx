import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";

type Tone = "dark" | "sand";

export function Eyebrow({
  index,
  children,
  tone = "dark",
  className,
}: {
  index?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-steel-400" : "text-umber-soft",
        className,
      )}
    >
      {index && (
        <span className={tone === "dark" ? "text-gold" : "text-copper"}>{index}</span>
      )}
      <span
        aria-hidden
        className={cn("h-px w-8", tone === "dark" ? "bg-steel-600" : "bg-umber/30")}
      />
      <span>{children}</span>
    </p>
  );
}

type SectionHeadingProps = {
  id?: string;
  index?: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
};

/** Eyebrow + large editorial title + optional intro, aligned on the 12-col grid */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  intro,
  tone = "dark",
  as = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-8", className)}>
      <div className="col-span-12 lg:col-span-8">
        <Eyebrow index={index} tone={tone}>
          {eyebrow}
        </Eyebrow>
        <RevealText
          id={id}
          as={as}
          className={cn(
            "mt-7 text-headline font-semibold text-balance",
            tone === "dark" ? "text-steel-50" : "text-umber",
            titleClassName,
          )}
        >
          {title}
        </RevealText>
      </div>
      {intro && (
        <div className="col-span-12 self-end lg:col-span-4">
          <div
            className={cn(
              "max-w-md text-lead",
              tone === "dark" ? "text-steel-400" : "text-umber-soft",
            )}
          >
            {intro}
          </div>
        </div>
      )}
    </div>
  );
}
