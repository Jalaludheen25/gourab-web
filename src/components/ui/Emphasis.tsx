import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Renders "plain *accent* plain" with the accent in the italic serif */
export function Emphasis({ text, accentClassName }: { text: string; accentClassName?: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em
            key={i}
            className={cn("font-serif font-normal italic tracking-[-0.02em]", accentClassName)}
          >
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
