import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Dental pain is the most urgent reason anyone visits a clinic website, and a
 * form is the wrong answer for it. Puts the phone number one tap away.
 * Used on the booking page and on the pain-driven treatment pages.
 */
export function UrgentCare({
  title = "In pain right now?",
  text = "Skip the form — call the clinic directly and we'll do our best to see you the same day.",
  className,
}: {
  title?: string;
  text?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-panel p-7 text-stone-300 ${className ?? ""}`}>
      <h3 className="font-display text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
      <a
        href={site.phoneHref}
        className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
      >
        <Phone className="h-4 w-4" />
        {site.phone}
      </a>
    </div>
  );
}
