import { Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui";
import { site } from "@/lib/site";

/** Closing call-to-action band, reused at the foot of most pages. */
export function CtaBand() {
  return (
    <section className="bg-brand">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white text-balance sm:text-4xl">
                Book your appointment
              </h2>
              <p className="mt-3 text-base leading-relaxed text-orange-100/90 sm:text-lg">
                Request a time online or call the clinic directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href="/book" variant="inverted" size="lg">
                Book an appointment
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-base font-medium text-white transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
