import type { Metadata } from "next";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { DoctorPortrait } from "@/components/doctor-portrait";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { doctors } from "@/lib/doctors";

export const metadata: Metadata = {
  title: "Our Consultants",
  description:
    "Dr. Esha (BDS, MDS) leads Excel Dental Clinic & Implant Centre in Sector 21C, Faridabad, with specialist consultants in implantology and orthodontics.",
};

const [principal, ...consultants] = doctors;

function Credentials({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid gap-3">
      {items.map((c, i) => (
        <div
          key={i}
          className="flex items-start gap-4 rounded-2xl border border-line bg-background px-5 py-4"
        >
          <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-xs uppercase tracking-wider text-subtle">
              {c.label}
            </p>
            <p className="text-sm font-medium text-foreground">{c.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

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

      {/* Principal dentist */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <DoctorPortrait
              doctor={principal}
              priority
              className="mx-auto max-w-sm lg:mx-0 lg:max-w-none"
            />
            <p className="mt-6 font-display text-2xl font-medium text-foreground">
              {principal.name}
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-subtle">
              {principal.qualification} · {principal.role}
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                eyebrow="Principal dentist"
                title="Qualified, specialist-led care"
              />
              <div className="mt-8 space-y-5 text-[0.95rem] leading-relaxed text-muted">
                {principal.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-8">
                <Credentials items={principal.credentials} />
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

      {/* Visiting specialists */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Specialist consultants"
              title="Specialists for specific procedures"
              lede="Implant and orthodontic cases are handled with a visiting specialist, so complex treatment stays in experienced hands."
            />
          </Reveal>

          <Stagger className="mt-14 grid gap-8 lg:grid-cols-2">
            {consultants.map((doctor) => (
              <StaggerItem key={doctor.id} className="h-full">
                <article
                  id={doctor.id}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-background p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <DoctorPortrait
                      doctor={doctor}
                      ratio="aspect-[4/5]"
                      sizes="(max-width: 640px) 60vw, 200px"
                      className="mx-auto w-full max-w-[15rem] shrink-0 sm:mx-0 sm:w-44"
                    />
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-medium text-foreground">
                        {doctor.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent">
                        {doctor.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {doctor.summary}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-muted">
                    {doctor.bio.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  <div className="mt-7">
                    <Credentials items={doctor.credentials} />
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
