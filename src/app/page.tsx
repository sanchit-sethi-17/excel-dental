import Link from "next/link";
import {
  ArrowRight,
  Clock,
  HeartHandshake,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/marquee";
import { Reviews } from "@/components/reviews";
import { MapEmbed } from "@/components/map-embed";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ButtonLink, PlaceholderImage, SectionHeading } from "@/components/ui";
import { focusTreatments } from "@/lib/treatments";
import { site } from "@/lib/site";

const whyUs = [
  {
    icon: Stethoscope,
    title: "Specialist-led care",
    text: "Every treatment plan is made by a qualified specialist — BDS, MDS — not handed down a corporate protocol.",
  },
  {
    icon: HeartHandshake,
    title: "Honest advice first",
    text: "We explain what we see, what your options are, and what we'd choose for our own family. Then you decide.",
  },
  {
    icon: ShieldCheck,
    title: "Sterilisation you can see",
    text: "Instrument sterilisation and single-use disposables follow strict protocols — and we're happy to show you.",
  },
  {
    icon: Microscope,
    title: "Modern, precise equipment",
    text: "Digital X-rays and rotary endodontics mean gentler procedures, fewer visits, and predictable outcomes.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Focus treatments */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What we do"
              title="Four things, done properly"
              lede="We deliberately focus on the treatments that matter most — and refer honestly when something isn't our speciality."
            />
            <ButtonLink href="/treatments" variant="secondary">
              All treatments
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusTreatments.map((t) => (
            <StaggerItem key={t.slug} className="h-full">
              <Link
                href={`/treatments/${t.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <t.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium text-ink">
                  {t.shortName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {t.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Why Excel Dental */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Why Excel Dental"
              title={
                <>
                  Quiet, careful dentistry —{" "}
                  <em className="text-brand">no upselling, no drama</em>
                </>
              }
              lede="A dental visit shouldn't feel like a sales pitch. Our promise is simple: a clear diagnosis, honest options, and treatment done well the first time."
            />
            <div className="mt-10">
              <ButtonLink href="/about" variant="secondary">
                More about the clinic
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          <Stagger className="grid gap-8 sm:grid-cols-2">
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Doctor spotlight */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
          <Reveal className="lg:col-span-5">
            <PlaceholderImage ratio="aspect-[4/5]" tone="ink" label="Dr. Esha Walia" />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Your consultant
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Dr. Esha Walia
              </h2>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-stone-400">
                BDS, MDS
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300">
                Before founding Excel Dental, Dr. Walia served as a consultant
                at Clove Dental and Axiss Dental — experience across thousands
                of cases that now shapes a practice built on precision and
                patient comfort.
              </p>
              <ul className="mt-8 grid max-w-lg gap-3 text-sm text-stone-300 sm:grid-cols-2">
                <li className="rounded-xl border border-stone-800 bg-stone-900/60 px-4 py-3">
                  Ex-Consultant, Clove Dental
                </li>
                <li className="rounded-xl border border-stone-800 bg-stone-900/60 px-4 py-3">
                  Ex-Consultant, Axiss Dental
                </li>
              </ul>
              <div className="mt-9">
                <ButtonLink href="/consultants" variant="inverted">
                  Meet our consultants
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Visit us */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Visit us"
              title="In the heart of Sector 21C"
              lede="Easy to reach at Huda Market, with parking nearby."
            />
            <ul className="mt-8 space-y-5 text-[0.95rem] text-stone-700">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <a href={site.phoneHref} className="transition-colors hover:text-brand">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.time} className="block">
                      {h.days && <span className="font-medium text-ink">{h.days}: </span>}
                      {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="/book">Book an appointment</ButtonLink>
              <ButtonLink href={site.maps.directionsUrl} variant="secondary" external>
                Get directions
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <MapEmbed className="min-h-96" />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
