import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ClipboardList,
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
import { Photo } from "@/components/photo";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { focusTreatments } from "@/lib/treatments";
import { site } from "@/lib/site";

const whyUs = [
  {
    icon: Stethoscope,
    title: "Specialist-led care",
    text: "Treatment planned and carried out by a qualified specialist (BDS, MDS).",
  },
  {
    icon: ClipboardList,
    title: "Clear treatment plans",
    text: "A clear diagnosis and honest options before any treatment begins.",
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
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Core treatments */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Treatments"
              title="Our core treatments"
              lede="Implants, root canal, orthodontics and preventive care — with a full range of services available."
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
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Photo
                  src={t.image}
                  alt={t.imageAlt}
                  ratio="aspect-[3/2]"
                  className="rounded-none"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-medium text-foreground">
                    {t.shortName}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {t.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Why Excel Dental */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Why Excel Dental"
              title="Considered care, done well"
              lede="A clear diagnosis, honest options and treatment carried out properly the first time."
            />
            <div className="mt-10">
              <ButtonLink href="/about" variant="secondary">
                About the clinic
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          <Stagger className="grid gap-8 sm:grid-cols-2">
            {whyUs.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex h-full flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-accent">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-medium text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Dentist */}
      <section className="bg-panel">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Your dentist
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Dr. Walia
            </h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-stone-400">
              BDS, MDS
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-300">
              Dr. Walia leads Excel Dental, with previous experience as a
              consultant at Clove Dental and Axiss Dental.
            </p>
            <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-3 text-sm text-stone-300">
              <li className="rounded-full border border-stone-800 bg-stone-900/60 px-4 py-2">
                Ex-Consultant, Clove Dental
              </li>
              <li className="rounded-full border border-stone-800 bg-stone-900/60 px-4 py-2">
                Ex-Consultant, Axiss Dental
              </li>
            </ul>
            <div className="mt-9">
              <ButtonLink href="/consultants" variant="inverted">
                About the clinic
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Reviews />

      {/* Visit us */}
      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Visit us"
              title="In the heart of Sector 21C"
              lede="Easy to reach at Huda Market, with parking nearby."
            />
            <ul className="mt-8 space-y-5 text-[0.95rem] text-muted">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <a href={site.phoneHref} className="transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>
                  {site.hours.map((h) => (
                    <span key={h.time} className="block">
                      {h.days && <span className="font-medium text-foreground">{h.days}: </span>}
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
