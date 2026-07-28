import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq";
import { Photo } from "@/components/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { focusTreatments, getTreatment } from "@/lib/treatments";

export function generateStaticParams() {
  return focusTreatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return {};
  return {
    title: `${treatment.name} in Faridabad`,
    description: treatment.excerpt,
  };
}

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  return (
    <>
      <PageHero eyebrow="Treatment" title={treatment.name} lede={treatment.intro}>
        <div className="mt-8 flex flex-wrap gap-3">
          {treatment.facts.map((f) => (
            <span
              key={f.label}
              className="rounded-full border border-line bg-background px-4 py-2 text-sm"
            >
              <span className="text-subtle">{f.label}: </span>
              <span className="font-medium text-foreground">{f.value}</span>
            </span>
          ))}
        </div>
      </PageHero>

      {/* Hero photo */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Photo
            src={treatment.image}
            alt={treatment.imageAlt}
            ratio="aspect-[21/9]"
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
          />
        </Reveal>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Benefits" title="What this treatment offers" />
          </Reveal>
          <div className="lg:col-span-7">
            <Stagger className="space-y-4">
              {treatment.benefits.map((b) => (
                <StaggerItem key={b}>
                  <div className="flex gap-4 rounded-2xl border border-line bg-surface px-6 py-4.5">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-[0.95rem] leading-relaxed text-muted">{b}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="What to expect"
              title="Your visit, step by step"
              lede="No surprises — you'll know what's happening and why, at every stage."
              align="center"
            />
          </Reveal>
          <Stagger className="mx-auto mt-14 max-w-3xl space-y-0">
            {treatment.process.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  {i < treatment.process.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-5.5 top-12 h-[calc(100%-2.5rem)] w-px bg-stone-200"
                    />
                  )}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-lg font-medium text-accent">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Common questions"
              title="Asked in this chair, answered honestly"
              lede="If your question isn't here, ask us on the phone or at your visit — no question is too small."
            />
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <FaqList faqs={treatment.faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
