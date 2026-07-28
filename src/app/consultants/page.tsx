import type { Metadata } from "next";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Consultants",
  description:
    "Dr. Walia (BDS, MDS) leads Excel Dental Clinic & Implant Centre in Sector 21C, Faridabad.",
};

const credentials = [
  { label: "Qualification", value: "BDS, MDS" },
  { label: "Role", value: "Founder & Principal Dentist" },
  { label: "Formerly", value: "Consultant, Clove Dental" },
  { label: "Formerly", value: "Consultant, Axiss Dental" },
];

export default function ConsultantsPage() {
  return (
    <>
      <PageHero
        eyebrow="Consultants"
        title={
          <>
            The team behind <em className="text-accent">Excel Dental</em>
          </>
        }
        lede="Your treatment is led by a qualified specialist from start to finish."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-surface p-8">
              <h2 className="font-display text-2xl font-medium text-foreground">
                Dr. Walia
              </h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-subtle">
                BDS, MDS · Founder
              </p>
              <div className="mt-6 grid gap-3">
                {credentials.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-background px-5 py-4"
                  >
                    <GraduationCap className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-subtle">
                        {c.label}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {c.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Principal dentist"
                title="Qualified, specialist-led care"
              />
              <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-muted">
                <p>
                  Dr. Walia (BDS, MDS) is the founder and principal dentist at
                  Excel Dental, with previous experience as a consultant at
                  Clove Dental and Axiss Dental — two of India&rsquo;s largest
                  dental networks.
                </p>
                <p>
                  Her postgraduate training supports the clinic&rsquo;s main
                  areas of care: dental implants, root canal treatment,
                  orthodontics and preventive dentistry. Patients are seen by
                  the specialist throughout their treatment, with a clear
                  explanation at each step.
                </p>
                <p>
                  Specialist consultants also join the clinic for specific
                  procedures where required.
                </p>
              </div>

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

      <CtaBand />
    </>
  );
}
