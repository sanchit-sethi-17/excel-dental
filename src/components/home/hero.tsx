"use client";

import { m } from "motion/react";
import { BadgeCheck, MapPin } from "lucide-react";
import { ButtonLink, PlaceholderImage } from "@/components/ui";
import { EASE } from "@/components/reveal";
import { site } from "@/lib/site";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft warm glow behind the composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand-soft/70 blur-3xl"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="lg:col-span-6">
          <m.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-stone-600"
          >
            <MapPin className="h-3.5 w-3.5 text-brand" />
            {site.legalName} · Faridabad
          </m.p>

          <m.h1
            {...rise(0.15)}
            className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink text-balance sm:text-6xl lg:text-7xl"
          >
            Smile with <em className="text-brand">confidence</em>.
          </m.h1>

          <m.p
            {...rise(0.28)}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg"
          >
            Honest, specialist-led dentistry in Sector 21C — root canal
            treatment, dental implants, orthodontics, and the preventive care
            that keeps small problems small.
          </m.p>

          <m.div {...rise(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/book" size="lg">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/treatments" variant="secondary" size="lg">
              Explore treatments
            </ButtonLink>
          </m.div>

          <m.div
            {...rise(0.52)}
            className="mt-10 flex items-center gap-3 text-sm text-stone-600"
          >
            <BadgeCheck className="h-5 w-5 shrink-0 text-brand" />
            <p>
              Led by <span className="font-medium text-ink">Dr. Esha Walia</span>,
              BDS, MDS — formerly consultant at Clove Dental &amp; Axiss Dental
            </p>
          </m.div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-12 gap-4">
            <m.div
              className="col-span-7"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              <PlaceholderImage ratio="aspect-[3/4]" tone="brand" label="Clinic" />
            </m.div>
            <div className="col-span-5 flex flex-col justify-center gap-4">
              <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              >
                <PlaceholderImage ratio="aspect-square" tone="light" />
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-medium text-brand">
                  4
                </p>
                <p className="mt-1 text-sm leading-snug text-stone-600">
                  focus specialities under one roof
                </p>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
