import type { Metadata } from "next";
import { CalendarCheck, Clock, PhoneCall, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { BookingForm } from "@/components/booking-form";
import { CallbackForm } from "@/components/callback-form";
import { CalEmbed } from "@/components/cal-embed";
import { Reveal } from "@/components/reveal";
import { UrgentCare } from "@/components/urgent-care";
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
    text: "Pick a treatment, a date and a time that suits you. It takes under a minute.",
  },
  {
    icon: PhoneCall,
    title: "We confirm your slot",
    text: "The clinic calls you to confirm the time, or suggests the nearest one available.",
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
            Request an appointment <em className="text-accent">online</em>
          </>
        }
        lede="Tell us what you need and when suits you. The clinic confirms your appointment directly."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {useCal ? <CalEmbed /> : <BookingForm />}
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <h2 className="font-display text-2xl font-medium text-foreground">
                How it works
              </h2>
              <ol className="mt-6 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-accent">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">
                        {i + 1}. {s.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <UrgentCare className="mt-10" />

              <div className="mt-6">
                <CallbackForm />
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 text-sm text-muted">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  {site.hours.map((h) => (
                    <p key={h.time}>
                      {h.days && <span className="font-medium text-foreground">{h.days}: </span>}
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
