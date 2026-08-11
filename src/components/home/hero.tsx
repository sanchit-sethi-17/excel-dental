"use client";

import { m } from "motion/react";
import { BadgeCheck, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui";
import { Photo } from "@/components/photo";
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
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-muted"
          >
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {site.legalName} · Faridabad
          </m.p>

          <m.h1
            {...rise(0.15)}
            className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl"
          >
            Smile with <em className="text-accent">confidence</em>.
          </m.h1>

          <m.p
            {...rise(0.28)}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Comprehensive dental care in Faridabad — from routine check-ups to
            implants, root canal and orthodontics.
          </m.p>

          <m.div {...rise(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/book" size="lg">
              Book an appointment
            </ButtonLink>
            <ButtonLink href="/treatments" variant="secondary" size="lg">
              View treatments
            </ButtonLink>
          </m.div>

          <m.div
            {...rise(0.52)}
            className="mt-10 flex items-center gap-3 text-sm text-muted"
          >
            <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
            <p>
              Led by <span className="font-medium text-foreground">Dr. Esha</span>,
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
              <Photo
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80"
                alt="Modern dental treatment room at Excel Dental"
                ratio="aspect-[3/4]"
                priority
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </m.div>
            <div className="col-span-5 flex flex-col justify-center gap-4">
              <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              >
                <Photo
                  src="https://images.unsplash.com/photo-1653508310729-7d6d2e2fd6c9?auto=format&fit=crop&w=1600&q=80"
                  alt="Dentist examining a patient"
                  ratio="aspect-square"
                  sizes="(max-width: 1024px) 40vw, 20vw"
                />
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                className="rounded-2xl border border-line bg-surface p-5 shadow-sm"
              >
                <p className="font-display text-lg italic text-accent">
                  Smile with confidence
                </p>
                <p className="mt-1 text-sm leading-snug text-muted">
                  Comprehensive care for the whole family.
                </p>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
