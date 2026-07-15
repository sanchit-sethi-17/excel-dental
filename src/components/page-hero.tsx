import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui";

/** Consistent inner-page header. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-48 h-[28rem] w-[28rem] rounded-full bg-brand-soft/60 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <Reveal>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
              {lede}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
