import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Photo } from "@/components/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { focusTreatments, otherServices } from "@/lib/treatments";

export const metadata: Metadata = {
  title: "Treatments Offered",
  description:
    "Dental implants, root canal treatment, orthodontics and preventive care in Faridabad — plus crowns, extractions, dentures, gum care and child dentistry.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title={
          <>
            Complete dental care, <em className="text-accent">one clinic</em>
          </>
        }
        lede="From routine check-ups to implants and full-mouth rehabilitation. Every treatment begins with a clear diagnosis."
      />

      {/* Core treatments — image cards linking to detail pages */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeading eyebrow="Core treatments" title="Our main areas of care" />
        </Reveal>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {focusTreatments.map((t) => (
            <StaggerItem key={t.slug} className="h-full">
              <Link
                href={`/treatments/${t.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Photo
                  src={t.image}
                  alt={t.imageAlt}
                  ratio="aspect-[16/10]"
                  className="rounded-none"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-accent">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {t.name}
                    </h3>
                  </div>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {t.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Additional services — image cards */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="More services"
              title="Everything else your family needs"
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <StaggerItem key={s.name} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-background shadow-sm">
                  <Photo
                    src={s.image}
                    alt={s.imageAlt}
                    ratio="aspect-[3/2]"
                    className="rounded-none"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2.5">
                      <s.icon className="h-4.5 w-4.5 shrink-0 text-accent" />
                      <h3 className="font-medium text-foreground">{s.name}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {s.blurb}
                    </p>
                    {s.description && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-subtle">
                        {s.description}
                      </p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
