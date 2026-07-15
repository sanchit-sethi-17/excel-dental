import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { MapEmbed } from "@/components/map-embed";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Excel Dental Clinic & Implant Centre — Shop No. 195, Basement, Huda Market, Sector 21C, Faridabad. Call +91 98103 09132.",
};

const cards = [
  {
    icon: Phone,
    title: "Call us",
    body: site.phone,
    href: site.phoneHref,
    action: "Call now",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    body: "Quickest way to reach the clinic",
    href: whatsappLink(`Hi ${site.name}, I have a question.`),
    action: "Start a chat",
    external: true,
  },
  {
    icon: MapPin,
    title: "Visit us",
    body: `${site.address.line1}, ${site.address.line2}`,
    href: site.maps.directionsUrl,
    action: "Get directions",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            We&rsquo;re easy to <em className="text-brand">reach</em>
          </>
        }
        lede="Questions about a treatment, a tooth that's troubling you, or just directions — pick whichever way suits you."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-7 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <c.icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl font-medium text-ink">
                  {c.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
                  {c.body}
                </p>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-deep"
                >
                  {c.action} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <MapEmbed className="min-h-[26rem]" />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="flex h-full flex-col justify-center rounded-3xl bg-ink p-9 text-stone-300">
              <h2 className="font-display text-2xl font-medium text-white">
                Opening hours
              </h2>
              <ul className="mt-6 space-y-4">
                {site.hours.map((h) => (
                  <li key={h.time} className="flex items-start gap-3 text-[0.95rem]">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {h.days && (
                        <span className="block font-medium text-white">{h.days}</span>
                      )}
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-stone-800 pt-6 text-sm leading-relaxed text-stone-400">
                Emergency toothache? Call — we keep same-day slots for urgent
                pain whenever possible.
              </p>
              <div className="mt-6">
                <ButtonLink href="/book" variant="inverted">
                  Book an appointment
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
