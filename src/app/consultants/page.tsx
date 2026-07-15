import type { Metadata } from "next";
import { ArrowRight, GraduationCap, Quote } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ButtonLink, PlaceholderImage, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Consultants",
  description:
    "Meet Dr. Esha Walia (BDS, MDS) and the consultant team at Excel Dental Clinic & Implant Centre, Faridabad.",
};

const credentials = [
  { label: "Qualification", value: "BDS, MDS" },
  { label: "Formerly", value: "Consultant, Clove Dental" },
  { label: "Formerly", value: "Consultant, Axiss Dental" },
];

/**
 * PLACEHOLDER — additional consultants' names, photos, and specialities
 * to be supplied by the client. The cards below define the layout.
 */
const upcomingConsultants = [
  { role: "Orthodontic Consultant" },
  { role: "Implant & Oral Surgery Consultant" },
];

export default function ConsultantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultants"
        title={
          <>
            The people behind the <em className="text-brand">practice</em>
          </>
        }
        lede="A clinic is only as good as the hands and judgement of its clinicians. Meet the team that treats you."
      />

      {/* Dr. Esha Walia — full profile */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <PlaceholderImage ratio="aspect-[4/5]" tone="brand" label="Dr. Esha Walia" />
            <div className="mt-6 grid gap-3">
              {credentials.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4"
                >
                  <GraduationCap className="h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium text-ink">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Principal consultant"
                title="Dr. Esha Walia"
                lede="BDS, MDS — Founder, Excel Dental Clinic & Implant Centre"
              />
              <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-stone-600">
                <p>
                  Dr. Walia brings the discipline of high-volume corporate
                  dentistry — years as a consultant with Clove Dental and Axiss
                  Dental, two of India&rsquo;s largest dental networks — into a
                  setting where each patient gets the time their case actually
                  needs.
                </p>
                <p>
                  Her postgraduate training (MDS) underpins the clinic&rsquo;s
                  focus areas: root canal treatment, implant dentistry,
                  orthodontics, and preventive care. Patients know her for
                  unhurried explanations and a conservative philosophy — the
                  best treatment is the least treatment that truly solves the
                  problem.
                </p>
              </div>

              <figure className="mt-10 rounded-2xl border border-stone-200 bg-white p-8">
                <Quote className="h-6 w-6 text-brand" aria-hidden="true" />
                <blockquote className="mt-4 font-display text-xl italic leading-relaxed text-ink">
                  My rule is simple: I only recommend what I would choose for my
                  own family. Everything else follows from that.
                </blockquote>
                <figcaption className="mt-4 text-sm text-stone-500">
                  Dr. Esha Walia
                </figcaption>
              </figure>

              <div className="mt-10">
                <ButtonLink href="/book" size="lg">
                  Book a consultation
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Visiting consultants — placeholders */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="The wider team"
              title="Visiting consultants"
              lede="Specialist consultants join us for specific procedures. Full profiles are being added."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {upcomingConsultants.map((c) => (
              <StaggerItem key={c.role}>
                <div className="rounded-2xl border border-dashed border-stone-300 bg-cream p-6">
                  <PlaceholderImage ratio="aspect-square" tone="light" />
                  <p className="mt-5 font-medium text-ink">{c.role}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    Profile coming soon
                  </p>
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
