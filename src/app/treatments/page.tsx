import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { focusTreatments, otherServices } from "@/lib/treatments";

export const metadata: Metadata = {
  title: "Treatments Offered",
  description:
    "Root canal treatment, dental implants, orthodontics, and preventive oral care in Faridabad — plus crowns, extractions, dentures, and paediatric dentistry.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments offered"
        title={
          <>
            Focused where it <em className="text-brand">matters most</em>
          </>
        }
        lede="We concentrate on four core specialities and support them with the everyday treatments a family needs. Every plan starts with an honest diagnosis."
      />

      {/* Focus treatments — editorial rows */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-6">
          {focusTreatments.map((t, i) => (
            <Reveal key={t.slug} delay={i * 0.05}>
              <Link
                href={`/treatments/${t.slug}`}
                className="group grid gap-6 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md sm:p-10 lg:grid-cols-12 lg:items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <div className="flex items-start gap-5 lg:col-span-8">
                  <span className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <t.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                      {t.name}
                    </h2>
                    <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-stone-600">
                      {t.excerpt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 lg:col-span-4 lg:justify-end">
                  <div className="hidden gap-5 sm:flex lg:hidden xl:flex">
                    {t.facts.slice(0, 2).map((f) => (
                      <div key={f.label}>
                        <p className="text-xs uppercase tracking-wider text-stone-400">
                          {f.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-ink">
                          {f.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 text-brand transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Supporting services */}
      <section className="border-t border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Also at the clinic"
              title="Everyday dentistry, handled with the same care"
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <StaggerItem key={s.name}>
                <div className="flex h-full gap-4 rounded-2xl border border-stone-200 bg-cream p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-ink">{s.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
                      {s.blurb}
                    </p>
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
