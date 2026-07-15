import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/logo";

const buttonVariants = {
  primary:
    "bg-brand text-white hover:bg-brand-deep shadow-sm hover:shadow-md hover:-translate-y-px",
  secondary:
    "border border-stone-300 bg-white text-ink hover:border-stone-400 hover:bg-stone-50",
  ghost: "text-brand hover:bg-brand-soft",
  inverted: "bg-white text-ink hover:bg-stone-100 shadow-sm hover:-translate-y-px",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
}) {
  const classes = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
    size === "lg" ? "px-7 py-3.5 text-base" : "px-5.5 py-2.5 text-sm"
  } ${buttonVariants[variant]} ${className ?? ""}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] text-brand ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h2
        className={`font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            invert ? "text-stone-300" : "text-stone-600"
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

const placeholderTones = {
  light: {
    bg: "bg-gradient-to-br from-stone-100 to-stone-200",
    mark: "text-stone-300/60",
  },
  brand: {
    bg: "bg-gradient-to-br from-brand-soft to-[#efd9cf]",
    mark: "text-brand/20",
  },
  ink: {
    bg: "bg-gradient-to-br from-stone-800 to-ink",
    mark: "text-stone-700",
  },
} as const;

/**
 * Stand-in for real clinic photography (client will supply later).
 * Fixed aspect ratios mean photos can be swapped in with zero layout shift.
 */
export function PlaceholderImage({
  ratio = "aspect-[4/3]",
  tone = "light",
  label,
  className,
}: {
  /** any Tailwind aspect-* class */
  ratio?: string;
  tone?: keyof typeof placeholderTones;
  label?: string;
  className?: string;
}) {
  const t = placeholderTones[tone];
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl ${ratio} ${t.bg} ${className ?? ""}`}
    >
      <LogoMark
        className={`absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 ${t.mark}`}
      />
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-stone-500 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
