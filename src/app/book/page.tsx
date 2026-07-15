import type { Metadata } from "next";
import { CalendarCheck, Clock, MessageCircle, Phone, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { BookingForm } from "@/components/booking-form";
import { CalEmbed } from "@/components/cal-embed";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a dental appointment at Excel Dental Clinic & Implant Centre, Sector 21C, Faridabad — request a slot in under a minute.",
};

const steps = [
  {
    icon: CalendarCheck,
    title: "Send your request",
    text: "Fill the short form — it opens WhatsApp with everything pre-filled for you to send.",
  },
  {
    icon: MessageCircle,
    title: "We confirm your slot",
    text: "The clinic replies on WhatsApp to confirm your time (or suggest the nearest available).",
  },
  {
    icon: Stethoscope,
    title: "Visit us",
    text: "Arrive a few minutes early. Your first visit starts with an examination and an honest conversation.",
  },
];

export default function BookPage() {
  const useCal = site.booking.calcom.enabled && site.booking.calcom.link;

  return (
    <>
      <PageHero
        eyebrow="Book an appointment"
        title={
          <>
            Reserve your visit in <em className="text-brand">under a minute</em>
          </>
        }
        lede="No login, no waiting on hold. Tell us what you need and when suits you — the clinic confirms directly."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {useCal ? <CalEmbed /> : <BookingForm />}
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <h2 className="font-display text-2xl font-medium text-ink">
                How it works
              </h2>
              <ol className="mt-6 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-medium text-ink">
                        {i + 1}. {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-2xl bg-ink p-7 text-stone-300">
                <h3 className="font-display text-lg font-medium text-white">
                  In pain right now?
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  Skip the form — call the clinic directly and we&rsquo;ll do
                  our best to see you the same day.
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-600">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <div>
                  {site.hours.map((h) => (
                    <p key={h.time}>
                      {h.days && <span className="font-medium text-ink">{h.days}: </span>}
                      {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
