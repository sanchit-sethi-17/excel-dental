import type { Metadata } from "next";
import {
  HeartHandshake,
  Landmark,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { PlaceholderImage, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Excel Dental Clinic & Implant Centre — a specialist-led dental practice in Sector 21C, Faridabad, built around honest diagnosis and careful treatment.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Honesty before treatment",
    text: "We tell you what we see and what we'd do if it were our own tooth. If something can wait, we say so. If you don't need treatment, we say that too.",
  },
  {
    icon: ShieldCheck,
    title: "Safety without shortcuts",
    text: "Strict instrument sterilisation, single-use disposables, and clean-room discipline on every chair, for every patient, every time.",
  },
  {
    icon: Microscope,
    title: "Precision as a habit",
    text: "Digital X-rays, rotary endodontics, and careful planning — because well-done dentistry lasts longer and costs less over a lifetime.",
  },
  {
    icon: Users,
    title: "Care for the whole family",
    text: "From a child's first check-up to implants for grandparents — one clinic your family can grow old with.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A clinic built on <em className="text-brand">trust</em>, not
            turnover
          </>
        }
        lede="Excel Dental Clinic & Implant Centre is a specialist-led practice in Sector 21C, Faridabad. We keep the practice deliberately focused: fewer chairs, more time per patient, and treatment plans we'd accept for our own families."
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              title="Why we started Excel Dental"
            />
            <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-stone-600">
              <p>
                After years of consulting at some of India&rsquo;s largest
                dental chains — Clove Dental and Axiss Dental — Dr. Esha Walia
                wanted something those settings couldn&rsquo;t always offer:
                time. Time to diagnose properly, to explain clearly, and to
                treat without watching a clock.
              </p>
              <p>
                Excel Dental was founded on that idea. A focused clinic in the
                heart of Sector 21C where the doctor who examines you is the
                specialist who treats you, where every recommendation comes
                with a plain-language explanation, and where{" "}
                <span className="font-medium text-ink">
                  &ldquo;{site.tagline}&rdquo;
                </span>{" "}
                is a promise about how you'll feel walking out.
              </p>
              <p>
                We concentrate on root canal treatment, dental implants,
                orthodontics, and preventive care — and we do the everyday
                dentistry around them with the same attention.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <PlaceholderImage ratio="aspect-[3/4]" tone="brand" label="Reception" />
              <PlaceholderImage
                ratio="aspect-[3/4]"
                tone="light"
                label="Treatment room"
                className="mt-8"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title="Four principles, non-negotiable"
              align="center"
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="flex h-full gap-5 rounded-2xl border border-stone-200 bg-cream p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                      {v.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Location note */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-ink p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <Landmark className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
                  Rooted in Faridabad
                </h2>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-stone-300">
                  {site.address.line1}, {site.address.line2} — a neighbourhood
                  clinic in the truest sense, serving the families of Sector
                  21C and beyond.
                </p>
              </div>
            </div>
            <a
              href={site.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-ink shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-stone-100"
            >
              Get directions
            </a>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
