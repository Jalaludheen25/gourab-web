import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "outline" | "light" | "dark";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-between gap-6 overflow-hidden chamfer font-mono text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-500 ease-[var(--ease-expo)] focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-obsidian hover:bg-gold-light",
  outline:
    "text-steel-50 bg-white/[0.03] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] hover:bg-white/[0.08] hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.4)] backdrop-blur-sm",
  light: "bg-umber text-bone hover:bg-copper",
  dark: "text-umber shadow-[inset_0_0_0_1px_rgb(42_37_31/0.3)] hover:bg-umber hover:text-bone",
};

const sizes: Record<Size, string> = {
  md: "h-12 pl-5 pr-4",
  lg: "h-14 pl-6 pr-5 sm:h-16 sm:pl-7 sm:pr-6",
};

function ArrowSwap() {
  return (
    <span aria-hidden className="relative block size-4 overflow-hidden">
      <ArrowRight
        strokeWidth={1.5}
        className="absolute inset-0 size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-[140%]"
      />
      <ArrowRight
        strokeWidth={1.5}
        className="absolute inset-0 size-4 -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-expo)] group-hover/btn:translate-x-0"
      />
    </span>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
};

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isNative = external || /^(tel:|mailto:|https?:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      <ArrowSwap />
    </>
  );

  const el = isNative ? (
    <a href={href} className={classes} data-cursor="link" {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} data-cursor="link" {...rest}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  magnetic = true,
  type = "button",
  ...rest
}: ButtonProps) {
  const el = (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], "disabled:cursor-not-allowed disabled:opacity-60", className)}
      data-cursor="link"
      {...rest}
    >
      <span>{children}</span>
      <ArrowSwap />
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Inline text link with an arrow and drawn underline */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      data-cursor="link"
      className={cn(
        "group/btn inline-flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.2em]",
        className,
      )}
    >
      <span className="link-draw pb-1">{children}</span>
      <ArrowSwap />
    </Link>
  );
}
