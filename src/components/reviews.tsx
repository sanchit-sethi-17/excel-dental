import { ExternalLink, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { site } from "@/lib/site";

/**
 * PLACEHOLDER testimonials — replace with real Google reviews (text + first
 * names) supplied by the client before launch. googleReviewsUrl in site.ts
 * should point at the clinic's actual Google Business listing.
 */
const testimonials = [
  {
    name: "Priya S.",
    text: "I came in scared of a root canal and left wondering what I'd been worried about. Everything was explained before it was done.",
    treatment: "Root Canal Treatment",
  },
  {
    name: "Rajesh K.",
    text: "Got an implant done for a molar I'd lost years ago. The process was unhurried and precise, and the follow-up care was genuine.",
    treatment: "Dental Implant",
  },
  {
    name: "Meenakshi A.",
    text: "We take both our kids here. The doctor is patient, never pushes unnecessary treatment, and the clinic is spotless.",
    treatment: "Family Dentistry",
  },
];

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Reviews"
          title="Trusted by families in Faridabad"
          align="center"
        />
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs text-subtle">{t.treatment}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-10 text-center">
        <a
          href={site.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent"
        >
          Read our reviews on Google
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </Reveal>
    </section>
  );
}
