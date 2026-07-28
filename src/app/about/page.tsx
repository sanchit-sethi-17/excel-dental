import type { Metadata } from "next";
import {
  ClipboardList,
  Landmark,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Photo } from "@/components/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Excel Dental Clinic & Implant Centre — a specialist-led dental practice in Sector 21C, Faridabad, led by Dr. Walia (BDS, MDS).",
};

const values = [
  {
    icon: ClipboardList,
    title: "Honest advice",
    text: "A clear diagnosis and honest options. If treatment can wait, we say so.",
  },
  {
    icon: ShieldCheck,
    title: "Strict hygiene",
    text: "Instrument sterilisation and single-use disposables on every visit.",
  },
  {
    icon: Microscope,
    title: "Modern equipment",
    text: "Digital X-rays and modern techniques for accurate, comfortable care.",
  },
  {
    icon: Users,
    title: "Care for all ages",
    text: "From a child's first check-up to implants — care for the whole family.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Focused, <em className="text-accent">specialist-led</em> care
          </>
        }
        lede="Excel Dental Clinic & Implant Centre is a dental practice in Sector 21C, Faridabad, led by Dr. Walia (BDS, MDS)."
      />

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Why we started Excel Dental" />
            <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-muted">
              <p>
                Dr. Walia founded Excel Dental after working as a consultant at
                Clove Dental and Axiss Dental. The aim was simple: a focused
                clinic where the specialist who examines you is the one who
                treats you.
              </p>
              <p>
                We provide implants, root canal treatment, orthodontics and
                preventive care, along with the everyday dentistry a family
                needs — each with a clear explanation and an honest
                recommendation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <Photo
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80"
                alt="Treatment room at Excel Dental"
                ratio="aspect-[3/4]"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
              <Photo
                src="https://images.unsplash.com/photo-1653508310729-7d6d2e2fd6c9?auto=format&fit=crop&w=1600&q=80"
                alt="Dentist with a patient"
                ratio="aspect-[3/4]"
                className="mt-8"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title="How we work"
              align="center"
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="flex h-full gap-5 rounded-2xl border border-line bg-background p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-sm">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
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
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-panel p-10 sm:p-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <Landmark className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">
                  In Sector 21C, Faridabad
                </h2>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-stone-300">
                  {site.address.line1}, {site.address.line2}.
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
